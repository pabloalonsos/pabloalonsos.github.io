import React from 'react';
import _ from "lodash";
import {Tag} from "antd";

interface TagGroupProps {
  tags: string[];
}

export default function TagGroup({ tags }: TagGroupProps) {
  return (
    <>
      {
        _.map(tags, (tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))
      }
    </>
  );
}
