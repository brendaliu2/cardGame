import { useState, useEffect } from 'react';
import axios from 'axios';
import DisplayCard from './DisplayCard';
import {v4 as uuidv4} from 'uuid';

const CARD_BASE_URL =
  'https://deckofcardsapi.com/api/deck/';

/**
 * Cardgame for shuffling cards and choosing
 *
 * Props: none
 *
 * State:
 * - deck of cards
 * - array of cards
 *
 *  cardGame => DisplayCard
 */
function CardGame() {
  const [deck, setDeck] = useState([]);
  const [cards, setCard] = useState([]);

  //shuffle deck on mount render
  useEffect(function shuffleDeck() {
    async function shuffle() {
      try {
        const shuffledDeck = await axios.get(
          `${CARD_BASE_URL}new/shuffle/?deck_count=1`);
        setDeck(shuffledDeck.data);
        console.log(shuffledDeck.data);
      } catch (err) {
        console.log("error ", err);
      }
    }
    shuffle();
  }, []);

  //pick new random card
  async function getNewCard() {
    try {
      let newCard = await axios.get(
        `${CARD_BASE_URL}${deck.deck_id}/draw/?count=1`
      );
      const card = newCard.data.cards[0];
      newCard = {...card, id: uuidv4()};

      setCard(cards => [...cards, newCard]);
    } catch (err) {
      console.log("error ", err);
    }
  }

  return (
    <div>
      <button onClick={getNewCard}>Get New Card</button>
      {cards && cards.length <= 52 ?
        <div>
          {cards.map(card => <DisplayCard key={card.id} card={card} />)}
        </div>
        :
        <p> No more cards! </p>}
    </div>
  );
}

export default CardGame;