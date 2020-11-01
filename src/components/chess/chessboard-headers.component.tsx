import React from 'react';

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
    <>
      <h2>{white} { whiteElo ? <>({whiteElo})</> : null } - {black} { blackElo ? <>({blackElo})</> : null }</h2>
      {event ? <h3>Event: {event}: {site ? <> - {site}</> : null}</h3> : null}
    </>
  ) : null;
}

export default ChessboardHeaders;
