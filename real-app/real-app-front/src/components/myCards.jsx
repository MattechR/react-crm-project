import Logo from "../img/logo.jpg";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import PageHeader from "./common/pageHeader";
import Card from "./card";
import cardService from "../services/cardsService";

const MyCards = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    async function getCards() {
      const { data } = await cardService.getAll();
      setCards(data);
    }

    getCards();
  }, []);

  return (
    <>
      <PageHeader
        title={
          <>
            My
            <img className="logo" src={Logo} alt="Logo" />
            Cards
          </>
        }
        description="Cards:"
      />
      <div className="row">
        <Link to="create-card">Create a New Card</Link>
      </div>

      <div className="row">
        {!cards.length ? (
          <p>No Cards..</p>
        ) : (
          cards.map((card) => <Card key={card._id} card={card} />)
        )}
      </div>
    </>
  );
};
export default MyCards;
