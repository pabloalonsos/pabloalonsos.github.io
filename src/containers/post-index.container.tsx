import React, { useState, useMemo, useEffect } from 'react';
import styled from 'styled-components';
import JSON5 from 'json5';
import _ from "lodash";
import { Link } from 'react-router-dom';

import ArticleModel from "../models/article.model";
import TagGroup from "../components/tag-group.component";

const StyledLink = styled(Link)`
  font-size: 16px;
`;

const ArticleLink = styled.div`
  margin-bottom: 8px;
`;

function PostIndex () {
  const [articles, setArticles] = useState<ArticleModel[]>([]);
  const articleType = process.env.REACT_APP_ARTICLE_TYPE === 'post' ? 'posts' : 'drafts';

  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/${articleType}/list.json5`)
      .then(data => data.text())
      .then(data => JSON5.parse(data))
      .then(data => _.map(data, (post) => new ArticleModel(post)))
      .then((posts: ArticleModel[]) => { setArticles(posts) })
  }, [articleType]);

  const organizedArticles = useMemo(() => _(articles)
    .groupBy('year')
    .mapValues((articlesYear) => _.groupBy(articlesYear, (a) => a.getFormattedPublishedMonth()))
    .value()
    , [articles])

  return (
    <>
      <h1>Archives</h1>
      {
        _(organizedArticles).map((yearlyArticles, year) => (
          <div key={year} style={{ marginBottom: 25 }}>
            <h2>{year}</h2>
            {
              _(yearlyArticles).map((monthlyArticles, month) => (
                <div key={month} style={{ marginBottom: 14 }}>
                  <h3>{month}</h3>
                  {
                    _.map(monthlyArticles, article => {
                      return (
                        <ArticleLink key={article.path}>
                          <StyledLink to={article.path}>
                            {article.title}
                          </StyledLink>
                          <div>
                            <span>{article.getPublishedDate()}</span>
                            {article.tags && <span> -- <TagGroup tags={article.tags} /></span>}
                          </div>
                        </ArticleLink>
                      )
                    })
                  }
                </div>
              )).reverse().value()
            }
          </div>
        )).reverse().value()
      }
    </>
  );
}

export default PostIndex;