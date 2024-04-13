import React from 'react';
import './about.css'

export function About(props) {
  const [imageUrl, setImageUrl] = React.useState('');


  React.useEffect(() => {
    const fetchData = async () => {
      const config = await fetch('/api/config');
      const authorization = await config.json();

      try {
      const res = await fetch("https://api.pexels.com/v1/curated", {
          headers: {
              Authorization: authorization.authorization
          }
      });

      const data = await res.json();

      console.log(data);

      const random = Math.floor(Math.random() * 15);
      const randImgUrl = data.photos[random].src.large;
      setImageUrl(randImgUrl);
      
      } catch (error) {
          console.error("Error when getting picture:", error);
      }

    }
    fetchData();
    
  },[]);

  let img = '';

  if (imageUrl) {
    img = <img src={imageUrl} alt='stock background'/>;
  }
  return (
    <main  className='about-page'>
      <div className="heading-image">
          {img}
      </div>
      <div className="wrapper">
          <h1>About</h1>

          <h2>What is CharaDeck?</h2>
          <p>CharaDeck is a place where you can store your characters in an easy and convinient way.</p>

          <h2>What is a deck/cards</h2>

          <p>A deck is the place in your profile where all your cards are located. Cards, in the other hand, is what is used to store basic data of your characters!</p>
        </div>
    </main>
  );
}