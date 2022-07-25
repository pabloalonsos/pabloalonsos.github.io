import React from 'react';
import styled from "styled-components";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

import Header from './containers/header.container';
import Footer from './containers/footer.container';
import About from "./containers/about.container";
import Post from "./containers/post.container";
import HomeFeed from "./containers/home-feed.container";
import PostIndex from "./containers/post-archive.container";

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;

  main {
    flex: 1;
    margin: 0 25px;
  }
`;

function App() {
  return (
    <Router>
      <AppWrapper>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomeFeed />}/>
            <Route path="/about" element={<About />}/>
            <Route path="/posts/:slug" element={<Post /> }/>
            <Route path="/drafts/:slug" element={<Post />}/>
            <Route path="/archive" element={<PostIndex />}/>
          </Routes>
        </main>
        <Footer />
      </AppWrapper>
    </Router>
  );
}

export default App;
