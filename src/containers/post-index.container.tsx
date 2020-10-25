import React, { useState, useMemo, useEffect } from 'react';
import JSON5 from 'json5';
import _ from "lodash";
import { Link } from 'react-router-dom';

import ArticleModel from "../models/article.model";

function PostIndex () {
  const [articles, setArticles] = useState<ArticleModel[]>([]);

  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/posts/list.json5`)
      .then(data => data.text())
      .then(data => JSON5.parse(data))
      .then(data => _.map(data, (post) => new ArticleModel(post)))
      .then((posts: ArticleModel[]) => { setArticles(posts) })
  }, []);

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
            <h3>{year}</h3>
            {
              _(yearlyArticles).map((monthlyArticles, month) => (
                <div key={month} style={{ marginBottom: 14 }}>
                  <h4>{month}</h4>
                  {
                    _.map(monthlyArticles, article => {
                      return (
                        <div key={article.path}>
                          <Link to={article.path}>
                            {article.title}
                          </Link>
                          <span> -- {article.getPublishedDate()}</span>
                        </div>
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