import React from 'react';
import { Link } from 'react-router-dom';
import styled from "styled-components";

const StyledFooter = styled.footer`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

function Footer() {
  return (
    <StyledFooter>
      <p>Follow Site.org posts: <a href="https://twitter.com/site-org">Twitter</a>, <Link to="/rss">RSS feed</Link>.</p>
      <p>Follow <a href="https://twitter.com/pabloalonsos">@pabloalonsos</a> on Twitter if you’d like.</p>
      <p>© 2020 Pablo Alonso Subiñas</p>
    </StyledFooter>
  );
}

export default Footer;