import React from 'react';
import styled from "styled-components";
import {
  BrowserRouter as Router,
  Switch,
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
          <Switch>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/posts/:slug">
              <Post />
            </Route>
            <Route path="/drafts/:slug">
              <Post />
            </Route>
            <Route path="/archive">
              <PostIndex />
            </Route>
            <Route path="/" exact>
              <HomeFeed />
            </Route>
          </Switch>
        </main>
        <Footer />
      </AppWrapper>
    </Router>
  );
}

export default App;
