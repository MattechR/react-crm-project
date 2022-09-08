import { useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import cardsService from "../services/cardsService";

const DeleteCard = () => {
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const deleteCard = async () => {
      await cardsService.deleteCard(params.id);
      navigate("/my-cards");
    };
    deleteCard();
  }, []);
  return null;
};

export default DeleteCard;
