let allpokemonsData = [];

async function fetchPokemonData() {
  const url = 'https://pokeapi.co/api/v2/pokemon/?limit=12';

  try {
    const response = await fetch(url);
    const data = await response.json();
    const results = data.results;

    for (const pokemon of results) {
      const response = await fetch(pokemon.url);
      const pokemonData = await response.json();
      allpokemonsData.push(pokemonData);
    }

    createPokemonCards(allpokemonsData);
  } catch (error) {
    console.log('Ошибка при получении данных:', error);
  }
}


let count = 0;

function createPokemonCards(pokemonsData) {

  let cardsPokemons = "";
  const pokedexElement = document.getElementById('pokedex');
  count++
  pokemonsData.forEach(pokemon => {

    cardsPokemons += `
    <div class="card">
      <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}" />
      <h3>${pokemon.name}</h3>
      <p>Types: ${pokemon.types.map(type => type.type.name).join(', ')}</p>
    </div>`;
  })
  console.log('Render', count)
  pokedexElement.innerHTML = cardsPokemons;  

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

