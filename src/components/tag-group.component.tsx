import React from 'react';
import styled from 'styled-components';
import _ from "lodash";
import { Link } from 'react-router-dom';
import { Tag } from "antd";

interface TagGroupProps {
  tags: string[];
}

const ClickableTag = styled(Tag)`
  cursor: pointer;
`;

export default function TagGroup({ tags }: TagGroupProps) {
  return (
    <>
      {
        _.map(tags, (tag) => (
          <Link to={`/index?tag=${tag}`}>
            <ClickableTag key={tag}>{tag}</ClickableTag>
          </Link>
        ))
      }
    </>
  );
}
