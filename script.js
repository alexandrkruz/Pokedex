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
