import React from 'react';
import _ from 'lodash';
import Pill, { Status } from '../components/pill.component';

type Book = {
  name: string;
  author: string;
  status: string;
  link: string;
  description: string;
}

type Game = {
  name: string;
  platform: string;
  status: string;
  link: string;
  description: string;
}

const books: Book[] = [
  { name: 'The Alloy of Law', author: 'Brandon Sanderson', status: Status.READING, link: '', description: ''},
  { name: 'Piranesi', author: 'Susan C. Clarke', status: Status.COMPLETED, link: '', description: ''},
  { name: 'The Blade Itself', author: 'Joe Abercrombie', status: Status.COMPLETED, link: '', description: ''},
  { name: 'Hyperion', author: 'Dan Simmons', status: Status.COMPLETED, link: '', description: ''},
  { name: 'The Fall of Hyperion', author: 'Dan Simmons', status: Status.COMPLETED, link: '', description: ''}
]

const games: Game[] = [
  // { name: 'God of War', platform: 'PS4', status: Status.PLAYING, link: '', description: ''},
  // { name: '', platform: 'PS4', status: Status.PLAYING, link: '', description: ''},
  { name: 'God of War', platform: 'PS4', status: Status.COMPLETED, link: '', description: ''},
  { name: 'Horizon Forbidden West', platform: 'PS5', status: Status.COMPLETED, link: '', description: ''},
  { name: 'Persona 5 Royal', platform: 'PS4', status: Status.ON_HOLD, link: '', description: ''},
]


const reducedBooks = _.reduce(books, (acc, book) => {
  // @ts-ignore
  const otherBooks = acc[book.status] || [];
  return {...acc, [book.status]: [book, ...otherBooks]};
}, {});

const reducedGames = _.reduce(games, (acc, game) => {
  // @ts-ignore
  const otherGames = acc[game.status] || [];
  return {...acc, [game.status]: [game, ...otherGames]};
}, {});

function Media() {
  console.log(reducedBooks)
  return (
    <>
      <h1>Media</h1>

      <h2>Books</h2>
      {_.map(reducedBooks, (bookSet, status) => (
        <>
          <Pill status={status}></Pill>
          {_.map(bookSet, (book: Book) => (<p key={book.name}><strong>{book.name}</strong> - {book.author}</p>))}
        </>
      ))}
      {_.map(reducedGames, (gameSet, status) => (
        <>
          <Pill status={status}></Pill>
          {_.map(gameSet, (game: Game) => (<p key={game.name}><strong>{game.name}</strong> - ({game.platform})</p>))}
        </>
      ))}
      {_.map(books, (book) => (
        <>
          <p>
            <br />
            <Pill status={book.status} />
          </p>
          <p>{book.description}</p>
        </>
      ))}
      <h2>Games</h2>
      {_.map(games, (game) => (
        <>
          <p>
            <strong>{game.name}</strong> ({game.platform})
            <br />
            <Pill status={game.status} /></p>
        </>
      ))}

    </>
  )
}

export default Media;
