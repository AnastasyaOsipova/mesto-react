import React from "react";


function Card(props){

    function handleClick(){
        props.onCardClick(props.src, props.title)
    }

    return(
        <div className="card">
            <img alt={props.alt} src={props.src} className="card__image" onClick={handleClick}/>
            <button type="button" className="card__delete-button button"></button>
            <div className="card__description">
                <h2 className="card__title">{props.title}</h2>
            <div className="card__like">
                <button type="button" className="card__like-button"></button>
                <p className="card__like-counter">{props.likes}</p>
            </div>
        </div>
    </div>
    )}

export default Card