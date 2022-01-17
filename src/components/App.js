import React from "react";
import "../index.css";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import api from "../utils.js/Api";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);

  const [selectedCard, setSelectedCard] = React.useState({
    name: "",
    link: "",
  });

  const [currentUser, setCurrentUser] = React.useState([]);

  React.useEffect(() => {
    api
      .getUserInfoApi()
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api
      .getInitialCards()
      .then((data) => {
        const cards = data.map((item) => {
          return {
            _id: item._id,
            link: item.link,
            name: item.name,
            likes: item.likes,
            card: item,
            owner: item.owner,
          };
        });

        setCards(cards);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleCardLike(likes, _id) {
    const isLiked = likes.some((i) => i._id === currentUser._id);

    api.changeLikeCardStatus(_id, isLiked).then((newCard) => {
      setCards((state) => state.map((c) => (c._id === _id ? newCard : c)));
    });
  }

  function handleCardDelete(_id) {
    api.deleteCard(_id).then(() => {
      setCards((state) => state.filter((c) => c._id !== _id));
    });
  }

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
    setSelectedCard({ name: "", link: "" });
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

  function handleCardClick(name, link) {
    setSelectedCard({ name: name, link: link });
  }

  function handleUpdateUser(name, about) {
    api
      .updateUserInfo(name, about)
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => {
        console.log(err);
      })
      .then(() => {
        closeAllPopups();
      });
  }

  function handleUpdateAvatar(avatar) {
    api
      .updateAvatar(avatar)
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => {
        console.log(err);
      })
      .then(() => {
        closeAllPopups();
      });
  }

  function handleAddPlace(name, link) {
    api
      .addCard(name, link)
      .then((data) => {
        setCards([data, ...cards]);
      })
      .catch((err) => {
        console.log(err);
      })
      .then(() => {
        closeAllPopups();
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlace}
        />

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

        <ImagePopup card={selectedCard} onClose={closeAllPopups}></ImagePopup>
        <Header />
        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleEditPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          handleClick={handleCardClick}
          handleCardLike={handleCardLike}
          handleCardDelete={handleCardDelete}
          cards={cards}
        />
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
