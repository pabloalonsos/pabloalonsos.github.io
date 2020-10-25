import React, {useState, useEffect } from 'react';
import JSON5 from 'json5';
import _ from "lodash";

import Article from "../components/article.component";
import ArticleModel from "../models/article.model";
import { Divider } from "antd";
import 'antd/dist/antd.css';

function HomeFeed () {
  const [articles, setArticles] = useState<ArticleModel[]>([]);

  useEffect(() => {
      fetch(`${process.env.PUBLIC_URL}/posts/list.json5`)
        .then(data => data.text())
        .then(data => JSON5.parse(data))
        .then(data => _.map(data, (post) => new ArticleModel(post)))
        .then((posts: ArticleModel[]) => { setArticles(posts) })
  }, []);

  console.log(articles)
  return (
    <>
      {
        _(articles).sortBy('publishedDate').take(10).map((article, idx) => {
          return (
            <section key={article.slug}>
              <Article article={article} />
              {(idx + 1) !== articles.length && <Divider />}
            </section>
          )
        }).value()
      }
    </>
  );
}

export default HomeFeed;