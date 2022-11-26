import React from 'react';
import { createRoot } from 'react-dom/client';
import { createGlobalStyle } from "styled-components";
import { ThemeProvider } from '@zendeskgarden/react-theming';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const GlobalStyles = createGlobalStyle`
  body {
    height: 100%;
    width: 100%;
  }

  #root {
    height: 100%;
    width: 100%;
  }
`

const root = createRoot(document.getElementById('root')!);
root.render(
  <ThemeProvider>
    <GlobalStyles />
    <App />
  </ThemeProvider>,
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
