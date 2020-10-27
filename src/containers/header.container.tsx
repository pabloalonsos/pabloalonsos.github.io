import React from 'react';
import styled from "styled-components";
import { Link } from 'react-router-dom';
import { Button, PageHeader } from "antd";

const HeaderContainer = styled.header`
  .title {
    font-size: 28px;
  }
  .ant-page-header-heading {
    align-items: baseline;
  }
  .ant-page-header-heading-left {
    flex-direction: column;
    align-items: initial;
  }
`

export default function Header() {
  return (
    <HeaderContainer>
      <PageHeader
        title={<Link to="/"><span className="title" title="Site.org">Site.org</span></Link>}
        subTitle={<div>Caminante no hay camino, se hace camino al andar.</div>}
        extra={[
          <Button key="4"><Link to="/index">Index</Link></Button>,
          <Button key="3"><Link to="/rss">RSS</Link></Button>,
          <Button key="2"><Link to="/about">About</Link></Button>,
          <Button key="1"><Link to="/contact">Contact</Link></Button>,
        ]}
      />
    </HeaderContainer>
  );
}
