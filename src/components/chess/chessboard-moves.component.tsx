import React, { useMemo } from 'react';
import _ from 'lodash';
import styled from "styled-components";
import Move from './move.component';
import { Row, Col } from 'antd';

interface ChessboardMovesProps {
  moves: string[]
  selectedMove?: number
  onSelectMove: (idx: number) => any
  layout?: 'vertical'|'horizontal'
}

const MovesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 8px;
  margin-bottom: 16px;
  line-height: 2;
  font-size: 18px;
  background-color: #fafafa;
  padding: 1.25em 1em;
`;

const movesBlock = (
  moves: string[],
  selectedMove: number|undefined,
  onSelectMove: (idx: number) => any,
  onKeyDown: (arg0: React.KeyboardEvent<HTMLSpanElement>, arg1: number) => void
): JSX.Element => {
  return (
    <>
      {
        _(moves)
          .chunk(2)
          .chunk(4)
          .map((chunk, idx) => (
            <Row key={idx} style={{ width: '100%'}}>
              {
                _.map(chunk, (moves, idx2) => {
                  const turn = (idx * 4) + (idx2 + 1);
                  const firstMoveIdx = turn*2 - 2;
                  const secondMoveIdx = turn*2 - 1;
                  return (
                    <Col key={turn} span={6}>
                      <div style={{ display: 'flex' }}>
                        {turn}.
                        <Move
                          isSelected={selectedMove === firstMoveIdx}
                          onClick={() => onSelectMove(firstMoveIdx)}
                          onKeyDown={(e) => onKeyDown(e, firstMoveIdx)}
                        >
                          {moves[0]}
                        </Move>
                        <Move
                          isSelected={selectedMove === secondMoveIdx}
                          onClick={() => onSelectMove(secondMoveIdx)}
                          onKeyDown={(e) => onKeyDown(e, secondMoveIdx)}
                        >
                          {moves[1]}
                        </Move>
                      </div>
                    </Col>
                  );
                })
              }
            </Row>
          ))
          .value()
      }
    </>
  );
};

const movesVertical = (
  moves: string[],
  selectedMove: number|undefined,
  onSelectMove: (idx: number) => any,
  onKeyDown: (arg0: React.KeyboardEvent<HTMLSpanElement>, arg1: number) => void
) => {
  return (
    <table style={{ maxHeight: 500, overflowY: 'auto', display: 'block'}}>
      <thead>
      <tr>
        <th style={{ width: 100 }}>Move</th>
        <th style={{ width: 152 }}>White</th>
        <th style={{ width: 152 }}>Black</th>
      </tr>
      </thead>
      <tbody>
      {
        _(moves)
          .chunk(2)
          .map((chunk, idx) => {
            return (
              <tr>
                <td>{idx}.</td>
                <td>
                  <Move
                    isSelected={selectedMove === (idx * 2)}
                    onClick={() => onSelectMove(idx * 2)}
                    onKeyDown={(e) => onKeyDown(e, idx * 2)}
                  >{chunk[0]}</Move>
                </td>
                <td>
                  <Move
                    isSelected={selectedMove === (idx * 2) + 1}
                    onClick={() => onSelectMove((idx * 2) + 1)}
                    onKeyDown={(e) => onKeyDown(e, (idx * 2) + 1)}
                  >{chunk[1]}</Move>
                </td>
              </tr>
            )
          }).value()
      }
      </tbody>
    </table>
  );
}

const ChessboardMoves = ({ moves, selectedMove, onSelectMove, layout='vertical' }: ChessboardMovesProps) => {
  const onKeyDown = (e: React.KeyboardEvent<HTMLSpanElement>, idx: number) => {
    switch(e.key) {
      case 'Enter':
        onSelectMove(idx);
        break;
      case 'ArrowRight':
        if (idx < (moves.length - 1)) {
          onSelectMove(idx+1);
        }
        break;
      case 'ArrowLeft':
        if (idx > 0) {
          onSelectMove(idx-1);
        }
        break;
    }
  };

  const movesArr = useMemo(() => {
    if (layout === 'horizontal') {
      return movesVertical(moves, selectedMove, onSelectMove, onKeyDown);
    }
    return movesBlock(moves, selectedMove, onSelectMove, onKeyDown);
  }, [moves, selectedMove]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <MovesContainer>
      {movesArr}
    </MovesContainer>
  )
}

export default ChessboardMoves;
