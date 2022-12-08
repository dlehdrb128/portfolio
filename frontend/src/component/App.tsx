import React, { useEffect, useState, useRef, useCallback } from "react";
import axios, { AxiosResponse } from "axios";
import "../../styles/global.pcss";
import { AiOutlineBell } from "react-icons/ai";

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
    const loging = useRef(null);
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
                    `http://localhost:8080/playlists?maxResults=${maxResults}&nextPageToken=${playlists.nextPageToken}`
                );

                setPlaylists((prev) => {
                    let data: any = [];

                    // console.log(prev);
                    // console.log(value.data);
                    value.data.items.forEach((el) => {
                        data.push(el.snippet);
                    });

                    const newObject = {
                        ...value.data,
                        items: [...prev.items, ...value.data.items],
                    };

                    // value.data.item: total

                    return newObject;
                });
            } catch (error) {
                if (error) {
                    console.error(error);
                }
            }
        };
        getData();
    }, [page]);

    // useEffect(() => {
    //     const observer = new IntersectionObserver(intersectHandler, {
    //         threshold: 0,
    //     });

    //     observer.observe(loging.current);

    //     return () => observer.disconnect();
    // }, [intersectHandler]);

    return (
        <>
            <div className="bg-gray-100 flex flex-col items-center justify-center">
                <div className="w-[420px] flex flex-col bg-white">
                    <div className="flex justify-between items-center bg-black text-white h-16 px-4">
                        <p className="cursor-pointer">질러 노래방</p>
                        <AiOutlineBell className="cursor-pointer" size="24" />
                    </div>

                    {/* <iframe
                        id="ytplayer"
                        width="500"
                        height="250"
                        src="https://www.youtube.com/embed/M7lc1UVf-VE?autoplay=1&origin=http://example.com"
                    ></iframe> */}

                    <div className="flex flex-col items-center justify-center">
                        {playlists.items.map((el: Snippet, i) => {
                            return (
                                <div key={i}>
                                    <img
                                        src={`${el.snippet.thumbnails.medium.url}`}
                                        alt="이미지"
                                    />
                                    <p>{el.snippet.title}</p>
                                </div>
                            );
                        })}
                    </div>

                    <div
                        style={{
                            display: playlists.items.length === 0 && "none",
                        }}
                        ref={loging}
                    >
                        로딩 중 입니다.
                    </div>
                </div>

                <div className="fixed bottom-0 w-[420px] flex items-center justify-between bg-black h-16 px-4">
                    <div className="text-white">홈</div>
                    <div className="text-white">간지</div>
                    <div className="text-white">전체</div>
                </div>
            </div>
        </>
    );
};

export default App;
