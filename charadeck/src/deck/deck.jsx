import React from 'react';
import {Card} from './card';
import Button from 'react-bootstrap/Button';
import './deck.css'
import {v4 as uuid} from 'uuid';

export function Deck(props) {
  const [cards, setCards] = React.useState([]);

  const username = props.userName; // 
  let socket;

  const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
  socket = new WebSocket(`${protocol}://${window.location.host}/ws`);

  React.useEffect(() => {
    configureWebSocket();
    loadCards();
  },[]);
  
  async function addCard () {
    try {
        const card = {
            charName: prompt("Give a name to your character", "Enter name"),
            birthday: prompt(`What is your character's Birthday?`, `Enter birthday`),
            likeOne: prompt("What does your character like? (1/3)", "Enter name"),
            likeTwo: prompt("What does your character like? (2/3)", "Enter name"),
            likeThree: prompt("What does your character like? (3/3)", "Enter name"),
            dislikeOne: prompt("What does your character hate? (1/2)"),
            dislikeTwo: prompt("What does your character hate? (2/2)")
        };
 
        
        const resp = await fetch('/api/decks/cards/addCard', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, card }),
        });

        console.log(await resp);
        if (!resp.ok) {
            throw new Error("Network Response was not succesful");
        }
        const id = uuid();
        saveDecksLocal(username,card );
        setCards([...cards, <Card charName={card.charName} 
          birthday={card.birthday} 
          likeOne={card.likeOne} 
          likeTwo={card.likeTwo}
          likeThree={card.likeThree}
          dislikeOne={card.dislikeOne}
          dislikeTwo={card.dislikeTwo}
          key={id}/>
          ]);

        const message = {
            type: 'new_card',
            username: username,
        };
        socket.send(JSON.stringify(message));

    } catch(error) {
        console.error("POST request not succesfull", error.message);
    }
}


async function loadCards() {
  try {
    const res = await fetch(`/api/decks/cards/getCards?username=${username}`, {
      method: 'GET',
      credentials: 'include',
  });

    const deck = await res.json();
    let prevCards = []; 

    if (deck.cards != null) {
      prevCards = deck.cards.cards;
    }
    const id = uuid();

    const savedCards = prevCards.map((card, index) => (
      <Card
        key={index} // Use a unique key for each Card component
        charName={card.charName}
        birthday={card.birthday}
        likeOne={card.likeOne}
        likeTwo={card.likeTwo}
        likeThree={card.likeThree}
        dislikeOne={card.dislikeOne}
        dislikeTwo={card.dislikeTwo}
      />
    ));

    setCards([...cards, ...savedCards]); 
    
  } catch (error) {
    console.error('GET request not succesful', error.message)
  }
}

function saveDecksLocal(username, card) {
    let decks = JSON.parse(localStorage.getItem('decks')) || {};

    if (!decks[username]) {
        decks[username] = [];
    }

    decks[username].push(card);

    localStorage.setItem('decks', JSON.stringify(decks));
}

function configureWebSocket() {

  socket.onopen = (event) => {
      console.log('WebSocket connected');
  };

  socket.onclose = (event) => {
      console.log('WebSocket disconnected');
  };

  socket.onerror = (error) => {
      console.error('Error in WebSocket: ', error);
  };


}

  return (
    <main className="container-fluid">
    
      <h1>My Deck</h1>
      <Button className="btn btn-light" type="button" onClick={addCard}>New Card</Button>
      <div className="card-deck">
        {cards}
      </div>


    </main>
  );
}