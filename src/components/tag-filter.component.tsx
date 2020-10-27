import React, { useState } from 'react';
import _ from 'lodash';
import styled from 'styled-components';

import { Tag } from 'antd';
import {useHistory, useLocation} from "react-router";

interface TagFilterProps {
  tags: object;
}


const TagFilterList = styled.ul`
  min-width: 400px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`

const TagFilterListItem = styled.li`
  list-style-type: none;
  
  .ant-tag {
    cursor: pointer;
    margin: 0 0 4px 0;
  }
`;

const Clickable = styled.span`
  cursor: pointer;
  color: #1890ff;
`;

const TagFilter = ({ tags }: TagFilterProps) => {
  const { pathname, search: query }= useLocation();
  const history = useHistory();
  const [ selectedTags, setSelectedTags ] = useState(
    _(_.drop(query, 1).join(''))
      .split('=')
      .without('tag')
      .compact()
      .value()
  );

  function onSelectTag(tag: string) {
    const newSelectedTags = _.includes(selectedTags, tag)
      ? _.without(selectedTags, tag)
      : [...selectedTags, tag];
    setSelectedTags(newSelectedTags);
    history.replace(`${pathname}?${_.map(newSelectedTags, (sTag) => `tag=${sTag}`).join('&')}`);
  }

  function onClearAllTags() {
    setSelectedTags([])
    history.replace(pathname);
  }

  return (
    <>
      <TagFilterList>
        <span>All Tags:</span>
        { _.map(tags, (count, tag) => (
          <TagFilterListItem key={tag}>
            <span>({count}) </span><Tag color={_.includes(selectedTags, tag) ? 'blue':'default'} onClick={() => onSelectTag(tag)}>{tag}</Tag>
          </TagFilterListItem>
        ))}
        {!_.isEmpty(selectedTags) && <Clickable onClick={onClearAllTags}>clear selection</Clickable>}
      </TagFilterList>
    </>
  );
};

export default TagFilter;