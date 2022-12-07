import React, { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import "../../styles/global.pcss";

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

    useEffect(() => {
        try {
            axios
                .get<playlist>("http://localhost:8080/playlists")
                .then((value) => {
                    console.log(value);
                    setPlaylists(value.data);
                });
        } catch (error) {
            if (error) {
                console.error(error);
            }
        }
    }, []);

    {
        console.log(playlists.items);
    }

    return (
        <>
            <div className="w-screen h-screen overflow-hidden bg-gray-100 flex flex-col items-center">
                <div>gaaaaaaa</div>
                <div className="max-w-md overflow-y-scroll flex flex-col scrollbar">
                    {/* <iframe
                        id="ytplayer"
                        width="500"
                        height="250"
                        src="https://www.youtube.com/embed/M7lc1UVf-VE?autoplay=1&origin=http://example.com"
                    ></iframe> */}

                    {playlists.items.map((el: Snippet) => {
                        console.log(el.snippet);
                        return (
                            <div key={el.id}>
                                <img
                                    src={`${el.snippet.thumbnails.medium.url}`}
                                    alt="이미지"
                                />
                                <p>{el.snippet.title}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
};

export default App;
