import React, { useCallback } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import { Snippet, playlist } from './App';

const Content = () => {
  const { playlists } = useOutletContext<{
    playlists: playlist;
  }>();
  let navigate = useNavigate();

  const onClickHandler = useCallback((data: Snippet) => {
    console.log(data);
    navigate('/playList');
  }, []);

  return (
    <div className='flex flex-col items-center p-4'>
      {playlists.items?.map((el: Snippet, i: number) => {
        return (
          <div className='w-[320px]' key={i}>
            <div className='cursor-pointer' onClick={() => onClickHandler(el)}>
              <img
                className='min-w-full'
                src={`${el.snippet.thumbnails.medium.url}`}
                alt='이미지'
              />
              <p>{el.snippet.title}</p>
            </div>
            <p>{el.contentDetails.itemCount} 영상 개수</p>
          </div>
        );
      })}
    </div>
  );
};
export default React.memo(Content);
