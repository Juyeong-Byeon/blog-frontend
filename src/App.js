import React from 'react';
import { Route } from 'react-router-dom';
import PostListPage from './pages/PostListPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import WritePage from './pages/WritePage';
import PostPage from './pages/PostPage';
import {Helmet} from 'react-helmet-async';


function App() {
  return (
   <>
      <Helmet><title>Drone's play ground</title></Helmet>
      <Route component={PostListPage} path={['/@:username','/']} exact />
      <Route component={RegisterPage} path='/register'/>
      <Route component={LoginPage} path='/login'/>
      <Route component={WritePage} path='/write'/>
      <Route component={PostPage} path='/@:username/:postId'/>
   </>
  );
}

export default App;
