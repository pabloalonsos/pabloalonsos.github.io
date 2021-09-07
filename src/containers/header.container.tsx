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
        title={<Link to="/"><span className="title" title="Site.org">Pablo Alonso</span></Link>}
        subTitle={<div>I'm <a href="https://twitter.com/pabloalonsos">Pablo Alonso</a>: programmer, geek, interested in space, physics and Brazilian Jiu Jitsu</div>}
        extra={[
          <Button key="2"><Link to="/archive">Archive</Link></Button>,
          <Button key="1"><Link to="/about">About</Link></Button>,
        ]}
      />
    </HeaderContainer>
  );
}
