//shuffle a deck state
//current card state

//draw card =-> display card


import { useState, useEffect } from 'react';
import axios from 'axios';

const CARD_BASE_URL =
  'https://deckofcardsapi.com/api/deck/';

function CardGame() {
  const [deck, setDeck] = useState([]);
  const [card, setCard] = useState(null);

  //shuffle deck on mount render
  useEffect(function shuffleDeck() {
    async function shuffle() {
      const shuffledDeck = await axios.get(
        `${CARD_BASE_URL}new/shuffle/?deck_count=1`);
      setDeck(shuffledDeck);
    }

    shuffle();
  }, []);

  //pick new random card
  async function getNewCard() {
    const newCard = await axios.get(
      `${CARD_BASE_URL}${deck.deck_id}/draw/?count=1`
    )
    
    setCard(newCard);
  }
  
  return (
    <div>
      <button onclick={getNewCard}>Get New Card</button>
      <div>
        <DisplayCard img={card.cards[0].image} />
      </div>
    </div>
  )
}