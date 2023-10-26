
async function fetchAtkCards() {
  try {
      const response = await fetch('https://db.ygoprodeck.com/api/v7/cardinfo.php');
      const data = await response.json();
      const cards = data.data.filter(card => card.atk >= 1500); 
      displayCards(cards);
  } catch (error) {
      console.error('Error fetching the attack cards:', error);
  }
}


async function fetchSpellCards() {
  try {
      const response = await fetch('https://db.ygoprodeck.com/api/v7/cardinfo.php?type=Spell Card');
      const data = await response.json();
      displayCards(data.data);
  } catch (error) {
      console.error('Error fetching the spell cards:', error);
  }
}


function displayCards(cards) {
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
}


document.getElementById('load-attack-cards-button').addEventListener('click', fetchAtkCards);
document.getElementById('load-spell-cards-button').addEventListener('click', fetchSpellCards);
