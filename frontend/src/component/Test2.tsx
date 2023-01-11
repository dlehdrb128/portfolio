import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
const Test2 = () => {
  let [searchParams] = useSearchParams();
  const [item, setItem] = useState([]);
  useEffect(() => {
    const getData = async () => {
      try {
        const value = await axios.get(
          `playlistItems?${searchParams.toString()}`
        );

        setItem(value.data.items);
      } catch (error) {
        if (error) {
          console.error(error);
        }
      }
    };
    getData();
  }, []);

  return (
    <>
      {item?.map((el: any, index: number) => {
        console.log(el.snippet);
        return (
          <div
            className="flex items-center flex-col justify-center"
            key={el.id}>
            <iframe
              id="ytplayer"
              width="480"
              height="360"
              allowFullScreen
              frameBorder="0"
              className="min-w-320"
              src={`https://www.youtube.com/embed/${el.snippet.resourceId.videoId}`}
            />
            {/* <p>{el.snippet.title}</p> */}
          </div>
        );
      })}
    </>
  );
};

export default Test2;
