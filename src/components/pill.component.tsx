import React from 'react';
import styled from 'styled-components';
import { Tag } from '@zendeskgarden/react-tags';

export const Status = {
  // NOT STARTED
  NEXT: 'Next',
  BACKLOG: 'Backlog',

  // STARTED
  PLAYING: "Playing",
  READING: 'Reading',

  // ON HOLD
  ON_HOLD: 'On Hold',

  // COMPLETED
  DONE: 'Done',
  COMPLETED: 'Completed'
}

function selectHue(status: string): string {
  switch(status) {
    case Status.PLAYING:
    case Status.READING:
      return 'yellow';
    case Status.DONE:
    case Status.COMPLETED:
      return 'green';
    case Status.ON_HOLD:
    default:
      return 'grey';

  }
}

const Pill = ({status, className} : any ) => {
  return <Tag className={className} hue={selectHue(status)}><span>{status}</span></Tag>
}

export default styled(Pill)`
  //border-radius: 8px;
`;
