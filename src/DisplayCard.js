/**
 * Display a card
 *
 * Props: card object {image, value, suit}
 *
 * State:
 * - None
 *
 *  cardGame => DisplayCard
 */
function DisplayCard({ card }) {

  const {image, value, suit} = card;
  return (
    <div>
      <img src={image} alt={`${value} of ${suit}`} />
    </div>
  );
}

export default DisplayCard;