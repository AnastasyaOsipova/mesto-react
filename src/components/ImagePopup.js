import React from "react";

function ImagePopup(props){
    return(
        <div>
        {props.card.src ?
        (<div className="popup popup_type_image popup_opened">
            <div className="popup__container popup__container_type_image">
                <button onClick={props.onClose} type="button" className="popup__close-button button"></button>
                <img src={props.card.src} alt={props.card.title} className="popup__image"/>
                <p className="popup__subtitle">{props.card.title}</p>
            </div>
        </div>):
        (<div className="popup popup_type_image">
        <div className="popup__container popup__container_type_image">
            <button onClick={props.onClose} type="button" className="popup__close-button button"></button>
            <img src="#" alt="#" className="popup__image"/>
            <p className="popup__subtitle"></p>
        </div>
        </div>)
        }
        </div>
    )
}

export default ImagePopup