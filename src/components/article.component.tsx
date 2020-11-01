import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import ArticleModel from "../models/article.model";
import TagGroup from './tag-group.component';
import Spinner from "./spinner.component";
import Chess from './chess/chess.component';

import 'katex/dist/katex.min.css';

import unified from "unified";
import markdown from "remark-parse";
import katex from 'rehype-katex';
import remark2rehype from "remark-rehype";
import rehype2react from 'rehype-react';
import math from 'remark-math';
import raw from 'rehype-raw';
// @ts-ignore
import prism from '@mapbox/rehype-prism';

import 'prism-themes/themes/prism-material-light.css';

const TitleGroupContainer = styled.div`
  margin: 16px 0 32px 0;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: baseline;
  margin-bottom: 8px;
`;

const Title = styled.h1`
  font-size: 30px;
  margin-bottom: 0;
`;

const PublishedDate = styled.div`
  margin-left: 8px;
  color: grey;
`;

const ArticleContainer = styled.div`
  max-width: 620px;
  margin: 0 auto;

  p {
    font-size: 18px;
    line-height: 1.6;
  }

  p a {
    text-decoration: underline;
  }
  
  code[class*="language-"],
  pre[class*="language-"] {
    font-size: 16px;
    margin-bottom: 20px;
  }
`;

const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`

interface ArticleComponentProps {
  article: ArticleModel
}

const processor = unified()
  .use(markdown)
  .use(remark2rehype, { allowDangerousHtml: true })
  .use(raw)
  .use(prism)
  .use(math)
  .use(katex)
  .use(rehype2react, {
    createElement: React.createElement,
    components: {
      // @ts-ignore
      chess: Chess
    }
  });

const Article = ({ article }: ArticleComponentProps) => {
  let [ content, setContent ] = useState('');

  useEffect(() => {
    if (article.url) {
      fetch(article.url)
      .then(data => data.text())
      .then(text => {setContent(text as any)});
    }
  }, [article.url]);

  return !_.isEmpty(content)
    ? (
      <ArticleContainer>
        <TitleGroupContainer>
          <TitleContainer>
            <Link to={article.path}>
              <Title>{article.title}</Title>
            </Link>
            <PublishedDate>{article.getPublishedDate()}</PublishedDate>
          </TitleContainer>
          <TagContainer>
            <TagGroup tags={article.tags} />
          </TagContainer>
        </TitleGroupContainer>
        {processor.processSync(content).result}
      </ArticleContainer>
    ) : <Spinner size="large" />
}


export default Article;
