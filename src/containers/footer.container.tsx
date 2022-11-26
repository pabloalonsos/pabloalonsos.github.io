import React from 'react';
import { Link } from 'react-router-dom';
import styled from "styled-components";
import { Divider } from "antd";

const StyledFooter = styled.footer`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

function Footer() {
  return (
    <div>
      <Divider/>
      <StyledFooter>
        <p>Follow {window.location.host} posts: <a href="https://twitter.com/pabloalonsos" target="_blank" rel="noopener noreferrer">Twitter</a>, <Link to="/rss">RSS feed</Link>.</p>
        <p>Follow <a href="https://twitter.com/pabloalonsos" target="_blank" rel="noopener noreferrer">@pabloalonsos</a> on Twitter if you’d like.</p>
        <p>© 2020 Pablo Alonso Subiñas</p>
      </StyledFooter>
    </div>
  );
}

export default Footer;
