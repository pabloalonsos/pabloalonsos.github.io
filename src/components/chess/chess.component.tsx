import React, {useState, useEffect, useMemo, useRef, ReactElement} from "react";
import _ from 'lodash';

import Chessboard from 'chessboardjsx';
import {Chess as ChessJS} from 'chess.js';
import styled from "styled-components";
import { Button } from 'antd';

import { VerticalLeftOutlined, VerticalRightOutlined, LeftOutlined, RightOutlined } from "@ant-design/icons";

import ChessboardHeaders, { ChessboardHeadersType } from './chessboard-headers.component';
import ChessboardMoves from './chessboard-moves.component';

const genRandStr = () => Math.random().toString(36).substring(7);

const ChessboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HiddenBoardData = styled.span`
  display: none;
`;

const ControlBtn = styled(Button)`
  padding-top: 6px;
`;

interface ChessProps {
  children: React.ComponentElement<any, any>,
  draggable: 'true'|'false',
  hideControls?: 'true'|'false'
  hideMoves?: 'true'|'false'
}

function fromArrayToPGN(moves: string[]): string {
  return _.reduce(moves, (acc: string, move, idx) => {
    if ((idx + 1) % 2) {
      acc = `${acc} ${idx}. `;
    }
    acc = `${acc} ${move} `;
    return acc;
  }, '');
}

export default function Chess ({ children, draggable, hideControls, hideMoves }: ChessProps): ReactElement {
  const id = useMemo(() => genRandStr(), []);

  const [isInitialized, setInitialize] = useState(false);

  // @ts-ignore
  const [board, setBoard] = useState(new ChessJS(id));

  const movesRef = useRef(null);

  const [headers, setHeaders] = useState<ChessboardHeadersType>({});
  const [moves, setMoves] = useState<string[]>([]);
  const [selectedMove, setSelectedMove] = useState<number|undefined>();

  useEffect(() => {
    if (!_.isUndefined(selectedMove) && isInitialized) {
      // @ts-ignore
      const newBoard = new ChessJS(id);
      const newMoves: string[] = _.take(moves, selectedMove + 1);
      newBoard.load_pgn(fromArrayToPGN(newMoves));
      setBoard(newBoard);
    } else if (!_.isUndefined(selectedMove)) {
      setInitialize(true);
    }
  }, [selectedMove]); // eslint-disable-line react-hooks/exhaustive-deps

  // Initializer
  useEffect(() => {
    // @ts-ignore
    const parsedText = movesRef.current.innerText;
    const { parsedHeaders, parsedMoves } = _.reduce(parsedText.split('\n'), (acc, line) => {
      if (line[0] === '[') {
        const parsed = line.replace("[", "").replace("]", "").split("\"");
        // @ts-ignore
        acc.parsedHeaders[_.lowerCase(parsed[0].trim())] = parsed[1].trim();
      } else if (line !== "") {
        acc.parsedMoves = acc.parsedMoves.concat(line)
      }
      return acc;
    }, { parsedHeaders: {}, parsedMoves: []});

    _.forEach(parsedHeaders, (val, key) => {
      board.header(key, val);
    });

    board.load_pgn(parsedMoves.join(' '));

    setHeaders(parsedHeaders)
    setMoves(board.history());
    setSelectedMove(board.history().length - 1);
  }, [movesRef]); // eslint-disable-line react-hooks/exhaustive-deps

  const shouldHideControls: boolean = hideControls === 'true';
  const shouldHideMoves: boolean = hideMoves === 'true';

  // @ts-ignore
  return (
    <ChessboardContainer>
      <HiddenBoardData ref={movesRef}>{children}</HiddenBoardData>
      <ChessboardHeaders
        white={headers.white}
        black={headers.black}
        whiteElo={headers.whiteElo}
        blackElo={headers.blackElo}
        event={headers.event}
        site={headers.site}
        date={headers.date}
      />
      <Chessboard
        id={id}
        position={board.fen()}
        draggable={draggable === 'true'}
        calcWidth={({ screenWidth }) => {
          return (screenWidth < 620)
            ? screenWidth - 50
            : 420;
        }}
      />
      {
        !shouldHideControls && !_.isUndefined(selectedMove) ? (
          <div style={{ display: 'flex', marginTop: 8 }}>
            <ControlBtn onClick={() => { setSelectedMove(0)}} disabled={selectedMove-1 < 0}>
              <VerticalRightOutlined />
            </ControlBtn>
            <ControlBtn onClick={() => { setSelectedMove(selectedMove-1)}} disabled={selectedMove-1 < 0}>
              <LeftOutlined />
            </ControlBtn>
            <ControlBtn onClick={() => { setSelectedMove(selectedMove+1)}} disabled={selectedMove === moves.length-1}>
              <RightOutlined />
            </ControlBtn>
            <ControlBtn onClick={() => { setSelectedMove(moves.length-1)}} disabled={selectedMove === moves.length-1}>
              <VerticalLeftOutlined/>
            </ControlBtn>
          </div>
        ) : null
      }
      {
        !shouldHideMoves ? (
          <ChessboardMoves
            moves={moves}
            selectedMove={selectedMove}
            onSelectMove={setSelectedMove}
          />
        ) : null
      }
    </ChessboardContainer>
  );
}
