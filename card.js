async function fetchCards() {
  try {
      
      const response = await fetch('https://db.ygoprodeck.com/api/v7/cardinfo.php');
      const data = await response.json();

      
      let cards = data.data;

      
      const minimumAtk = 0;
      cards = cards.filter(card => card.atk >= minimumAtk);

      
      const cardListElement = document.getElementById('card-list');

      
      cardListElement.innerHTML = '';

      cards.forEach(card => {
          
          const cardDiv = document.createElement('div');
          cardDiv.classList.add('card-container');
          
         
          const cardName = document.createElement('h2');
          cardName.textContent = card.name;
          cardDiv.appendChild(cardName);

          
          if (card.card_images) {
              card.card_images.forEach(image => {
                  const img = document.createElement('img');
                  img.src = image.image_url;
                  img.alt = card.name;
                  cardDiv.appendChild(img);
              });
          }

         
          cardListElement.appendChild(cardDiv);
      });
  } catch (error) {
      console.error('Error fetching the cards:', error);
  }
}


document.getElementById('load-cards-button').addEventListener('click', fetchCards);
