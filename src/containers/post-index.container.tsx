import React, { useState, useMemo, useEffect } from 'react';
import styled from 'styled-components';
import JSON5 from 'json5';
import _ from "lodash";
import { Link, useLocation } from 'react-router-dom';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

import ArticleModel from "../models/article.model";
import TagFilter from '../components/tag-filter.component';
import TagGroup from "../components/tag-group.component";

const StyledLink = styled(Link)`
  font-size: 16px;
`;

const ArticleLink = styled.div`
  margin-bottom: 8px;
`;

const ArticlesContainer = styled.div`
  flex: 1;
`;

const ArchivesHeader = styled.div`
  display: flex;
  margin-bottom: 16px;
  
  h1 {
    margin: 0;
  }
  
  .ant-input-affix-wrapper {
    margin-left: 16px;
    flex: 1;
    
    .ant-input-prefix {
      font-size: 20px;
      color: grey;
    }
  }
`;

const YearGroup = styled.div`
  margin-bottom: 25px;
`;

const MonthGroup = styled.div`
  margin-bottom: 14px;
`;

const IndexContent = styled.div`
  display: flex;
`;

function PostIndex () {
  const [articles, setArticles] = useState<ArticleModel[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const query = useLocation().search;
  const articleType = process.env.REACT_APP_ARTICLE_TYPE === 'post' ? 'posts' : 'drafts';
  const selectedTags = _(_.drop(query, 1).join(''))
    .split('=')
    .without('tag')
    .compact()
    .value();

  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/${articleType}/list.json5`)
      .then(data => data.text())
      .then(data => JSON5.parse(data))
      .then(data => _.map(data, (post) => new ArticleModel(post)))
      .then((posts: ArticleModel[]) => { setArticles(posts) })
  }, [articleType]);

  const organizedArticles = useMemo(() => _(articles)
      .filter((article) => _.includes(_.lowerCase(article.title), _.lowerCase(searchQuery)))
      .filter((article) => _.isEmpty(selectedTags) || _.some(article.tags, (tag) => _.includes(selectedTags, tag)))
      .groupBy('year')
      .mapValues((articlesYear) => _.groupBy(articlesYear, (a) => a.getFormattedPublishedMonth()))
      .value()
    , [articles, searchQuery, selectedTags]);

  const tags = useMemo(() => {
    return _(articles)
      .map('tags')
      .flatten()
      .countBy()
      .value();
  },[articles]);

  return (
    <>
      <ArchivesHeader>
        <h1>Archives</h1>
        <Input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for an Article"
          prefix={<SearchOutlined />}
          size="large"
          allowClear={true}
          bordered={false}
        />
      </ArchivesHeader>
      <IndexContent>
        <ArticlesContainer>
          {
            _(organizedArticles).map((yearlyArticles, year) => (
              <YearGroup key={year}>
                <h2>{year}</h2>
                {
                  _(yearlyArticles).map((monthlyArticles, month) => (
                    <MonthGroup key={month}>
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
                    </MonthGroup>
                  )).reverse().value()
                }
              </YearGroup>
            )).reverse().value()
          }
        </ArticlesContainer>
        <TagFilter tags={tags} />
      </IndexContent>
    </>
  );
}

export default PostIndex;