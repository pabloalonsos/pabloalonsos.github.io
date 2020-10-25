import React, {useEffect, useState} from 'react';
import { useParams } from "react-router";
import _ from "lodash";
import JSON5 from "json5";

import Article from "../components/article.component";
import ArticleModel from "../models/article.model";
import {Spin} from "antd";


function Post() {
  const { slug } = useParams();
  const [articleSummary, setArticleSummary] = useState<ArticleModel>();

  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/posts/list.json5`)
      .then(data => data.text())
      .then(data => JSON5.parse(data))
      .then(data => _.find(data.posts, { slug }))
      .then(data => new ArticleModel(data))
      .then(post => { setArticleSummary(post) })
  }, []);

  return articleSummary ? (
    <Article article={articleSummary} />
  ): <Spin size="large" />;
}

export default Post;