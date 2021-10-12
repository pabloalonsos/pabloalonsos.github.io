import React, {useState, useEffect } from 'react';
import JSON5 from 'json5';
import _ from "lodash";
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import Article from "../components/article.component";
import ArticleModel, { ArticleModelCreator } from "../models/article.model";
import { Divider } from "antd";

const ArchiveLink = styled.div`
  display: flex;
  justify-content: center;
  font-size: 16px;
  margin: 32px 0 16px 0;
  font-weight: 600;
`

function HomeFeed () {
  const [articles, setArticles] = useState<ArticleModel[]>([]);
  const articleType = process.env.REACT_APP_ARTICLE_TYPE === 'post' ? 'posts' : 'drafts';

  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/${articleType}/list.json5`)
      .then(data => data.text())
      .then(data => JSON5.parse(data) as [ArticleModelCreator])
      .then(data => _.map(data, (post) => new ArticleModel(post)))
      .then((posts: ArticleModel[]) => { setArticles(posts) })
  }, [articleType]);

  return (
    <>
      {
        _(articles).sortBy('publishedDate').takeRight(10).reverse().map((article, idx) => {
          return (
            <section key={article.slug}>
              <Article article={article} />
              {(idx + 1) !== articles.length && <Divider />}
            </section>
          )
        }).value()
      }
      <ArchiveLink>
        <span>For more articles <Link to="/archive">check out The Archive<span role="img" aria-label="tm">™</span>️</Link></span>
      </ArchiveLink>
    </>
  );
}

export default HomeFeed;
