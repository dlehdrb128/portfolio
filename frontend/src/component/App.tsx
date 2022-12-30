import React, { useEffect, useState, useRef, useCallback } from "react";
import axios, { AxiosResponse } from "axios";
import "../../styles/global.pcss";
import { AiOutlineBell, AiOutlineHome } from "react-icons/ai";
import { MdOutlineMessage } from "react-icons/md";
import { Outlet } from "react-router-dom";

interface playlist {
    etag?: string;
    items?: Snippet[];
    kind?: string;
    nextPageToken?: string;
    pageInfo?: {
        resultsPerPage: string;
        totalResults: string;
    };
}

interface Snippet {
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
    const [color, setColor] = useState<string>("decoration-black");
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
                    `http://localhost:8080/playlists?maxResults=${maxResults}&nextPageToken=${playlists.nextPageToken}`
                );

                setPlaylists((prev: any) => {
                    let data: any = [];

                    // console.log(prev);
                    // console.log(value.data);
                    if (value.data.items) {
                        value.data.items.forEach((el: Snippet) => {
                            data.push(el.snippet);
                            console.log(el);
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

    return (
        <>
            <div className="bg-gray-100 flex flex-col items-center justify-center">
                <div className="flex flex-col bg-white">
                    <div className="flex justify-between items-center bg-black text-white h-16 px-4">
                        <p className="cursor-pointer">질러 노래방</p>
                        <AiOutlineBell className="cursor-pointer" size="24" />
                    </div>

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
                                        <p className={color}>
                                            {el.snippet.title}
                                        </p>
                                    </div>

                                    <p>
                                        {el.contentDetails.itemCount} 영상 개수
                                    </p>
                                </div>
                            );
                        })}

                        <div
                            className={
                                playlists.items?.length === 0
                                    ? "hidden"
                                    : "block"
                            }
                            ref={loging}
                        >
                            로딩 중 입니다.
                        </div>
                    </div>
                    <Outlet />
                </div>

                <div className="flex items-center justify-around fixed bottom-0 w-[352px] bg-black h-16 px-4">
                    <button className="text-white flex items-center justify-center">
                        <div className="text-white flex items-center justify-center flex-col">
                            <AiOutlineHome size={"28"} />
                            <p>홈</p>
                        </div>
                    </button>

                    <button className="text-white flex items-center justify-center">
                        <div className="text-white flex items-center justify-center flex-col">
                            <MdOutlineMessage size={"28"} />
                            <p>연락처</p>
                        </div>
                    </button>
                </div>
            </div>
        </>
    );
};

export default App;
