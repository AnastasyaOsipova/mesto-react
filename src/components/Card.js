import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card(props) {
  
  function handleClick() {
    props.onCardClick(props.src, props.title);
  }

  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = props.owner === currentUser._id;

  const cardDeleteButtonClassName = (
  `button card__delete-button ${isOwn ? ' ' : 'card__delete-button_inactive'}`
); 

const isLiked = props.like.some(i => i._id === currentUser._id);

const cardLikeButtonClassName = (
  `card__like-button ${isLiked ? 'card__like-button_active' : ' '}`
); 

function handleLikeClick(){
  props.onCardLike(props.like, props.id)
}


  return (
    <div className="card">
      <img
        alt={props.alt}
        src={props.src}
        className="card__image"
        onClick={handleClick}
      />
      <button type="button" className={cardDeleteButtonClassName}></button>
      <div className="card__description">
        <h2 className="card__title">{props.title}</h2>
        <div className="card__like">
          <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
          <p className="card__like-counter">{props.likes}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;
