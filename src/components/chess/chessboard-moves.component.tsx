import React from 'react';
import _ from 'lodash';
import styled from "styled-components";
import Move from './move.component';

interface ChessboardMovesProps {
  moves: string[]
  selectedMove?: number
  onSelectMove: (idx: number) => any
}

const MovesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 8px;
  margin-top: 8px;
  margin-bottom: 16px;
  line-height: 2;
  font-size: 18px;
  
  border-bottom: 1px solid lightgrey;
`;

const ChessboardMoves = ({ moves, selectedMove, onSelectMove }: ChessboardMovesProps) => {
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

  const movesArr = _.reduce(moves, (acc: JSX.Element[], move, idx) => {
    return [...acc, (
      <div key={idx} style={{ display: 'flex' }}>
        { ((idx+1) % 2 ) ? <span>{(idx+2)/2}. </span> : null }
        <Move
          key={idx}
          isSelected={selectedMove === idx}
          onClick={() => onSelectMove(idx)}
          onKeyDown={(e) => onKeyDown(e, idx)}
        >
          {move}
        </Move>
        {
          !((idx+1) % 2 )  && (idx+1) !== moves.length
            ? <span style={{ margin: '0 10px 0 8px'}}> - </span>
            : null
        }
      </div>
    )];
  }, []);
  
  return (
    <MovesContainer>
      {movesArr}
    </MovesContainer>
  )
}

export default ChessboardMoves;
