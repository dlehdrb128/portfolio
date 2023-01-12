import React, { useEffect, useState, useCallback } from "react";
import { useSearchParams, useOutletContext } from "react-router-dom";
import axios from "axios";
import { playlist, Snippet } from "./App";
const PlaylistItems = () => {
  let [searchParams] = useSearchParams();
  const [playlists, setPlaylists] = useState<playlist>({
    etag: "",
    items: [],
    kind: "",
    nextPageToken: "",
    pageInfo: {
      resultsPerPage: "",
      totalResults: "",
    },
  });
  const [page, setPage] = useState(1);
  const { loging } = useOutletContext<any>();
  const [maxResults, setMaxResults] = useState(10);

  useEffect(() => {
    const getData = async () => {
      try {
        const value = await axios.get(
          `playlistItems?maxResults=${maxResults}&nextPageToken=${
            playlists.nextPageToken
          }&${searchParams.toString()}`
        );

        setPlaylists((prev: any) => {
          let data: any = [];

          // console.log(prev);
          // console.log(value.data);
          if (value.data.items) {
            value.data.items.forEach((el: Snippet) => {
              data.push(el.snippet);
            });
            const newObject = {
              ...value.data,
              items: [...prev.items, ...value.data.items],
            };

            return newObject;
          } else {
            return prev;
          }

          // value.data.item: total
        });
      } catch (error) {
        if (error) {
          console.error(error);
        }
      }
    };
    getData();
  }, [page]);

  const intersectHandler = useCallback(([entry]: any) => {
    if (entry.isIntersecting) {
      setPage((page) => page + 1);
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(intersectHandler, {
      threshold: 0,
    });

    observer.observe(loging.current);
    return () => observer.disconnect();
  }, [intersectHandler]);

  return (
    <>
      {playlists.items?.map((el: any, index: number) => {
        return (
          <div
            className="flex items-center flex-col justify-center h-0 mb-[20px] pb-[56.25%] relative overflow-hidden"
            key={el.id + index}>
            <iframe
              id="ytplayer"
              width="480"
              height="360"
              allowFullScreen
              frameBorder="0"
              className="absolute top-0 left-0 w-full h-full"
              src={`https://www.youtube.com/embed/${el.snippet.resourceId.videoId}`}
            />
          </div>
        );
      })}
    </>
  );
};

export default PlaylistItems;
