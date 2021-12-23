import React from "react";
import "../index.css";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);

  const [selectedCard, setSelectedCard] = React.useState({
    title: "",
    src: "",
  });

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleEditPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setSelectedCard({ title: "", src: "" });
  }

  React.useEffect(() => {
    function closePopupByEsc(e) {
      if (e.keyCode === 27) {
        closeAllPopups();
      }
    }
    window.addEventListener("keydown", closePopupByEsc);
    return () => window.removeEventListener("keydown", closePopupByEsc);
  });

  function handleCardClick(src, title) {
    setSelectedCard({ title: title, src: src });
  }

  return (
    <div className="page">
      <PopupWithForm
        name="profile_edit"
        title="Редактировать профиль"
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
      >
        <div className="popup__input-container">
          <input
            required
            type="text"
            name="name"
            id="name-input"
            className="popup__input popup__input_type_name"
            minLength="2"
            maxLength="40"
          />
          <span className="popup__input-error name-input-error"></span>
        </div>
        <div className="popup__input-container">
          <input
            required
            type="text"
            name="about"
            id="description-input"
            className="popup__input popup__input_type_description"
            minLength="2"
            maxLength="200"
          />
          <span className="popup__input-error description-input-error"></span>
        </div>
        <button type="submit" className="popup__add-button button">
          Сохранить
        </button>
      </PopupWithForm>

      <PopupWithForm
        name="edit-avatar"
        title="Обновить аватар"
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
      >
        <div className="popup__input-container">
          <input
            required
            type="url"
            name="avatar"
            id="avatar-input"
            className="popup__input popup__input_type_avatar"
            placeholder="Ссылка на картинку"
          />
          <span className="popup__input-error avatar-input-error"></span>
        </div>
        <button type="submit" className="popup__add-button button">
          Сохранить
        </button>
      </PopupWithForm>

      <PopupWithForm
        name="delete-card"
        title="Вы уверены?"
        onClose={closeAllPopups}
      >
        <button
          type="submit"
          className="popup__add-button popup__add-button_type_delete button"
        >
          Да
        </button>
      </PopupWithForm>

      <PopupWithForm
        name="add-card"
        title="Новое место"
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
      >
        <div className="popup__input-container">
          <input
            required
            type="text"
            name="name"
            placeholder="Название"
            id="place-input"
            className="popup__input popup__input_type_place"
            minLength="2"
            maxLength="30"
          />
          <span className="popup__input-error place-input-error"></span>
        </div>
        <div className="popup__input-container">
          <input
            required
            type="url"
            name="link"
            placeholder="Ссылка на картинку"
            id="image-input"
            className="popup__input popup__input_type_image"
          />
          <span className="popup__input-error image-input-error"></span>
        </div>
        <button type="submit" className="popup__add-button button">
          Создать
        </button>
      </PopupWithForm>

      <ImagePopup card={selectedCard} onClose={closeAllPopups}></ImagePopup>
      <Header />
      <Main
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleEditPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        handleClick={handleCardClick}
      />
      <Footer />
    </div>
  );
}

export default App;
