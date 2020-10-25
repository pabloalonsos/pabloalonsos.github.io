import React, {useEffect, useState} from 'react';
import ReactMarkdown from "react-markdown";
import {Prism as SyntaxHighlighter} from "react-syntax-highlighter"
import {coy} from "react-syntax-highlighter/dist/esm/styles/prism"
import { Link } from 'react-router-dom';
import styled from 'styled-components';
// @ts-ignore
import MathJax from "@matejmazur/react-mathjax";
import RemarkMathPlugin from "remark-math";
import ArticleModel from "../models/article.model";


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
  inlineMath: ({ value }: GenericRenderer) => <MathJax.Node inline>{value}</MathJax.Node>
};

const TitleContainer = styled.div`
  display: flex;
  align-items: baseline;
`;

const Title = styled.h1`
  font-size: 28px;
`;

const PublishedDate = styled.div`
  margin-left: 8px;
  color: grey;
`;

const Article = ({ article }: ArticleComponentProps) => {
  let [ content, setContent ] = useState(null);

  useEffect(() => {
    if (article.url) {
      fetch(article.url)
      .then(data => data.text())
      .then(text => {setContent(text as any)});
    }
  }, [article.url]);

  return content
    ? (
      <>
        <Link to={article.path}>
          <TitleContainer>
            <Title>{article.title}</Title>
            <PublishedDate>{article.getPublishedDate()}</PublishedDate>
          </TitleContainer>
        </Link>
        <MathJax.Context input="tex">
            <ReactMarkdown
              plugins={plugins}
              renderers={renderers}
            >
              {content}
            </ReactMarkdown>
        </MathJax.Context>
      </>
    ) : <p>Article not found</p>;
}


export default Article;
