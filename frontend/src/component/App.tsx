import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  useMemo,
} from "react";
import axios, { AxiosResponse } from "axios";
import { Outlet } from "react-router-dom";
import Footer from "../page/Footer";
import Header from "../page/Header";

// import Content from "../component/Content";

export interface playlist {
  etag?: string;
  items?: Snippet[];
  kind?: string;
  nextPageToken?: string;
  pageInfo?: {
    resultsPerPage: string;
    totalResults: string;
  };
}

export interface Snippet {
  kind: string;
  etag: string;
  id: string;
  contentDetails: {
    itemCount: string;
  };

  snippet: {
    channelId: string;
    channelTitle: string;
    title: string;
    description: string;
    localized: {
      title: string;
      description: string;
    };
    thumbnails: {
      [key: string]: {
        [key: string]: string;
      };
    };
  };

  [key: string]: String | Object;
}

const App = () => {
  const loging = useRef<any>(null);
  const [maxResults, setMaxResults] = useState(10);
  const [page, setPage] = useState(1);
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
  const intersectHandler = useCallback(([entry]: any) => {
    if (entry.isIntersecting) {
      setPage((page) => page + 1);
    }
  }, []);

  useEffect(() => {
    const getData = async () => {
      try {
        const value = await axios.get<playlist>(
          `playlists?maxResults=${maxResults}&nextPageToken=${playlists.nextPageToken}`
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

  useEffect(() => {
    const observer = new IntersectionObserver(intersectHandler, {
      threshold: 0,
    });

    observer.observe(loging.current);
    return () => observer.disconnect();
  }, [intersectHandler]);

  const outlet = useMemo(
    () => <Outlet context={{ playlists, loging }} />,
    [playlists]
  );

  return (
    <>
      <div className="bg-gray-100 flex flex-col items-center justify-center">
        <div className="flex flex-col bg-white w-full">
          {playlists.items?.length !== 0 && (
            <>
              <Header />
              {outlet}
              <Footer />
            </>
          )}

          <div
            className={playlists.items?.length === 0 ? "hidden" : "block"}
            ref={loging}>
            로딩 중 입니다.
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
