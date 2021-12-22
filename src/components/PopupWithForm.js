import React from "react";


function PopupWithForm(props){
    return(
        <div>
        {props.isOpen ?
            (<div className={`popup popup_type_${props.name} popup_opened`}>
            <div className="popup__container">
                <button onClick={props.onClose} type="button" className="popup__close-button button"></button>
                <form noValidate id="2" className="popup__form" name="`${props.name}_form`">
                    <h2 className="popup__title">{props.title}</h2>
                    {props.children}
                </form>
            </div>
            </div>) :
            (<div className={`popup popup_type_${props.name}`}>
            <div className="popup__container">
                <button type="button" className="popup__close-button button"></button>
                <form noValidate id="2" className="popup__form" name="`${props.name}_form`">
                    <h2 className="popup__title">{props.title}</h2>
                    {props.children}
                </form>
            </div>
            </div>)}
    </div>
    )
}

export default PopupWithForm