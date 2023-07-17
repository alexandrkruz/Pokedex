function fetchPokemonData() {
  const url = 'https://pokeapi.co/api/v2/pokemon/?limit=12';

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const results = data.results;

      const pokedexElement = document.getElementById('pokedex');
      let cardsHTML = '';

      results.forEach(pokemon => {
        fetch(pokemon.url)
          .then(response => response.json())
          .then(pokemonData => {
            const cardHTML = createPokemonCard(pokemonData);
            cardsHTML += cardHTML;
            pokedexElement.innerHTML = cardsHTML;
          })
          .catch(error => {
            console.log('Error fetching Pokemon data:', error);
          });
      });
    })
    .catch(error => {
      console.log('Error fetching data:', error);
    });
}

function createPokemonCard(pokemonData) {
  const cardHTML = `
    <div class="card">
      <img src="${pokemonData.sprites.front_default}" alt="${pokemonData.name}" />
      <h3>${pokemonData.name}</h3>
      <p>Types: ${pokemonData.types.map(type => type.type.name).join(', ')}</p>
    </div>`;
    
  return cardHTML;
}

fetchPokemonData();

const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('input', handleSearch);

function handleSearch(event) {
  const searchValue = event.target.value.toLowerCase();
  const cards = document.getElementsByClassName('card');

  Array.from(cards).forEach(card => {
    const pokemonName = card.getElementsByTagName('h3')[0].innerText.toLowerCase();
    if (pokemonName.includes(searchValue)) {
      card.style.display = 'inline-block';
    } else {
      card.style.display = 'none';
    }
  });
}
