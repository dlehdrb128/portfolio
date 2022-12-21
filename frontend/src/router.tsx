import React from 'react';
import { Route, Routes } from 'react-router-dom';
import App from './component/App';
import Test from './component/Test';

const Router = () => {
  return (
    <Routes>
      <Route path='/' element={<App />}>
        <Route path='/test' element={<Test />} />
      </Route>
    </Routes>
  );
};

export default Router;
