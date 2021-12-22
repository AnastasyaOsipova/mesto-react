import React from 'react';
import api from '../utils.js/Api';
import Card from './Card';

function Main(props) {

const [userName, setUserName] = React.useState(null);
const [userDescription, setUserDescription] = React.useState(null);
const [userAvatar, setUserAvatar] = React.useState(null);

const [cards, setCards] = React.useState([]);

    
React.useEffect(()=>{
    api.getUserInfoApi()
    .then(data => {
        setUserName(data.name);
        setUserDescription(data.about);
        setUserAvatar(data.avatar)
    })
});

React.useEffect(()=>{
    api.getInitialCards()
    .then(data =>{
     const cards = data.map(item =>{
            return{
                id: item._id,
                image: item.link,
                title: item.name,
                alt: item.name,
                likes: item.likes.length
                
     }
    })
    setCards(cards)
    })
})

    
    
return (
    <main className="main">
        <section className="profile">
            <div className="profile__info">
                <div onClick={props.onEditAvatar} className="profile__avatar-edit-icon">
                    <img src={userAvatar} alt="Фото" className="profile__avatar"/>
                </div>
                <div className="profile__text">
                    <h1 className="profile__name">{userName}</h1>
                    <p className="profile__description">{userDescription}</p>
                </div>
                <button onClick={props.onEditProfile} type="button" className="profile__edit-button button"></button>              
            </div>
            <button onClick={props.onAddPlace} type="button" className="profile__add-button button"></button>
        </section>
        <section className="photo-grid">
        {
              cards.map(item =>
                <Card
                    key={item.id}
                    src={item.image}
                    title={item.title}
                    alt={item.alt}
                    likes={item.likes}
                    onCardClick={props.handleClick}
                />
                ) 
           }
        </section>
    </main>
  );
}



export default Main