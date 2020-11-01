import React, {useEffect, useState} from 'react';
import { useParams } from "react-router";
import JSON5 from "json5";

import Article from "../components/article.component";
import ArticleModel from "../models/article.model";
import Spinner from "../components/spinner.component";

function Post() {
  const { slug } = useParams<{slug: string}>();
  const [articleSummary, setArticleSummary] = useState<ArticleModel>();
  const articleType = process.env.REACT_APP_ARTICLE_TYPE === 'post' ? 'posts' : 'drafts';

  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/${articleType}/list.json5`)
      .then(data => data.text())
      .then(data => JSON5.parse(data))
      .then(data => data[slug])
      .then(data => new ArticleModel(data))
      .then(post => { setArticleSummary(post) })
  }, [slug, articleType]);

  return articleSummary ? (
    <Article article={articleSummary} />
  ): <Spinner size="large" />;
}

export default Post;