import React, { useRef } from "react";
import styled, { css } from "styled-components";
import _ from 'lodash';
// @ts-ignore
import Piece from 'react-chess-pieces';

interface MoveProps {
  className?: string
  children: string
  isSelected: boolean
  onClick: (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void
  onKeyDown: (e: React.KeyboardEvent<HTMLSpanElement>) => void
}

const EMOJIZABLE = ["N", "R", "B", "K", "Q"];

const constructEmojizedMove = (move: string) => {
  const piece = _.find(EMOJIZABLE, (emoji) => _.includes(move, emoji));
  // @ts-ignore
  const brokenDownMove = move.split(piece);
  return [
    <span key="1">{brokenDownMove[0]}</span>,
    <div key="2" style={{ width: 22 }}><Piece piece={piece} /></div>,
    <span key="3">{brokenDownMove[1]}</span>
  ];
}

const Move = ({ className, isSelected, onClick, onKeyDown, children }: MoveProps) => {
  const ref = useRef(null);
  const emojizedMove = _.some(EMOJIZABLE, (emoji) => _.includes(children, emoji))
    ? constructEmojizedMove(children)
    : _.castArray(<div key="0">{children}</div>);

  // NOTE: Not sure why i was forcing focus in the past
  //useLayoutEffect(() => {
  //  if (isSelected) {
  //    // @ts-ignore
  //    ref.current?.focus();
  //  }
  //}, [isSelected]);

  return (
    <div
      ref={ref}
      className={className}
      // @ts-ignore
      tabIndex="0"
      onClick={onClick}
      onKeyDown={onKeyDown}
    >{emojizedMove}</div>
  )

}

export default styled(Move)`
  margin-right: 4px;
  display: flex;
  cursor: pointer;
  
  &:focus {
    outline: none;
  }
  
  ${({ isSelected }: { isSelected: boolean }) => isSelected && css`
    font-weight: 600;
  `}
  
  svg {
    margin-top: 4px;
  }
`;
