import React from 'react';
import Button from 'react-bootstrap/Button';
import './deck.css'

export function Deck() {
  return (
    <main className="container-fluid">

      <h1>My Deck</h1>

      <Button className="btn btn-light" type="button">New Card</Button>

      <div className="card-deck">

      </div>

        



    </main>
  );
}