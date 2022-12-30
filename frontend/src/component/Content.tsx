import React, { useEffect, useState, useRef } from "react";
import { useOutletContext } from "react-router-dom";
import { Snippet, playlist } from "./App";

const Content = () => {
    const [color, setColor] = useState<string>("decoration-black");
    const { playlists } = useOutletContext<{
        playlists: playlist;
    }>();

    console.log("렌더");
    return (
        <div className="flex flex-col items-center p-4">
            {playlists.items?.map((el: Snippet, i: number) => {
                return (
                    <div className="w-[320px]" key={i}>
                        <div
                            className="cursor-pointer"
                            onClick={() => {
                                setColor("text-amber-400");
                            }}
                        >
                            <img
                                className="min-w-full"
                                src={`${el.snippet.thumbnails.medium.url}`}
                                alt="이미지"
                            />
                            <p className={color}>{el.snippet.title}</p>
                        </div>
                        <p>{el.contentDetails.itemCount} 영상 개수</p>
                    </div>
                );
            })}
        </div>
    );
};
export default Content;
