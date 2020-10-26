import React from 'react';
import styled from 'styled-components';
import {Spin} from "antd";

const CenteredSpin = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

interface SpinnerProps {
  size: 'small'|'large'|undefined
}

export default function Spinner({ size }: SpinnerProps) {
  return (
    <CenteredSpin>
      <Spin size={size} />
    </CenteredSpin>
  );
};