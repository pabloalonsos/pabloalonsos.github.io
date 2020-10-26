import React, {useEffect, useState} from 'react';
import ReactMarkdown from "react-markdown";
import _ from 'lodash';
import {Prism as SyntaxHighlighter} from "react-syntax-highlighter"
import {coy} from "react-syntax-highlighter/dist/esm/styles/prism"
import { Link } from 'react-router-dom';
import styled from 'styled-components';
// @ts-ignore
import MathJax from "@matejmazur/react-mathjax";
import RemarkMathPlugin from "remark-math";
import ArticleModel from "../models/article.model";
import TagGroup from './tag-group.component';

const TitleGroupContainer = styled.div`
  margin-bottom: 16px;
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
`;

const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`

interface ArticleComponentProps {
  article: ArticleModel
}

interface CodeRenderer {
  language: string,
  value: React.FC
}

interface GenericRenderer {
  value: string
}

const plugins = [
  RemarkMathPlugin
];

const renderers = {
  code: ({language, value}: CodeRenderer ) =>
    <SyntaxHighlighter style={coy} language={language} children={value} />,
  math: ({ value }: GenericRenderer) => <MathJax.Node>{value}</MathJax.Node>,
  inlineMath: ({ value }: GenericRenderer) => <MathJax.Node inline>blah{value}</MathJax.Node>
};

const Article = ({ article }: ArticleComponentProps) => {
  let [ content, setContent ] = useState(null);

  useEffect(() => {
    if (article.url) {
      fetch(article.url)
      .then(data => data.text())
      .then(text => {setContent(text as any)});
    }
  }, [article.url]);

  return !_.isNil(content)
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
        <MathJax.Context input="tex">
          <ReactMarkdown
            plugins={plugins}
            renderers={renderers}
          >
            {content}
          </ReactMarkdown>
        </MathJax.Context>
      </ArticleContainer>
    ) : <p>Article not found</p>;
}


export default Article;
