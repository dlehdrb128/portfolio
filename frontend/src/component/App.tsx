import React, { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import '../../styles/global.pcss';

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
    etag: '',
    items: [],
    kind: '',
    nextPageToken: '',
    pageInfo: {
      resultsPerPage: '',
      totalResults: '',
    },
  });

  useEffect(() => {
    try {
      axios.get<playlist>('http://localhost:8080/playlists').then((value) => {
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
      <div className='bg-gray-100 flex flex-col items-center'>
        <div className='max-w-[420px] h-[100%] overflow-y-scroll flex flex-col scrollbar'>
          <div className='min-h-[80px] bg-slate-200'>
            gaaaaaaagaaaaaaagaaaaa
          </div>
          {/* <iframe
                        id="ytplayer"
                        width="500"
                        height="250"
                        src="https://www.youtube.com/embed/M7lc1UVf-VE?autoplay=1&origin=http://example.com"
                    ></iframe> */}

          {playlists.items.map((el: Snippet) => {
            console.log(el.snippet);
            return (
              <div className='w-full' key={el.id}>
                <img
                  className='w-full'
                  src={`${el.snippet.thumbnails.medium.url}`}
                  alt='이미지'
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
