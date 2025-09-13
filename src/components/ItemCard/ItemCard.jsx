import { useContext } from "react";
import "./ItemCard.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemCard({ item, onCardClick, onCardLike, isLoggedIn }) {
  const { currentUser } = useContext(CurrentUserContext);
  
  const handleCardClick = () => {
    onCardClick(item);
  };

  const handleLike = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onCardLike({ id: item._id, isLiked });
  };

  const isLiked = item.likes?.some((id) => id === currentUser?._id);

  return (
    <li className="card">
      <div className="card__header">
        <h2 className="card__name">{item.name}</h2>
        {isLoggedIn && (
          <button
            onClick={handleLike}
            className={`card__like-btn ${isLiked ? "card__like-btn_liked" : ""}`}
            type="button"
          >
            ♡
          </button>
        )}
      </div>
      <img
        onClick={handleCardClick}
        className="card__image"
        src={item.imageUrl || item.link}
        alt={item.name}
      />
    </li>
  );
}

export default ItemCard;
