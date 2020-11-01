import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.div`
  margin-bottom: 14px;
  display: flex;
  flex-direction: column;
  align-items: center;
  
  h2 {
    margin: 0;
  }
`;

const Subtitle = styled.div`
  display: flex;
  color: grey;
  font-size: 18px;
`;

export interface ChessboardHeadersType {
  event?: string
  date?: string
  site?: string
  white?: string
  whiteElo?: number
  black?: string
  blackElo?: number
}

const ChessboardHeaders = ({ event, date, site, white, whiteElo, black, blackElo }: ChessboardHeadersType) => {
  return white && black ? (
    <HeaderContainer>
      <h2>{white} { whiteElo ? <>({whiteElo})</> : null } - {black} { blackElo ? <>({blackElo})</> : null }</h2>
      <Subtitle>
        { event ? `Event: ${event}` : null }
        { site ? ` - ${site}` : null }
      </Subtitle>
      <Subtitle>
        { date ? (new Date(date)).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : null }
      </Subtitle>
    </HeaderContainer>
  ) : null;
}

export default ChessboardHeaders;
