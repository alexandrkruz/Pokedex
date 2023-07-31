let allpokemonsData = [];
let offset = 0;

function fetchPokemonData() {
  const url = 'https://pokeapi.co/api/v2/pokemon/?limit=12';

  return fetch(url)
    .then(response => response.json())
    .then(data => {
      const results = data.results;
      const promises = results.map(pokemon => fetch(pokemon.url).then(response => response.json()));

      return Promise.all(promises);
    })
    .catch(error => {
      console.log('Ошибка при получении данных:', error);
      return []; // Возвращаем пустой массив в случае ошибки
    });
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

function loadMorePokemon() {
  offset += 12;
  fetchPokemonData()
    .then(newPokemonsData => {
      allpokemonsData = allpokemonsData.concat(newPokemonsData);
      createPokemonCards(allpokemonsData);
    });
}

const loadMoreButton = document.getElementById('loadMore');
loadMoreButton.addEventListener('click', loadMorePokemon);

fetchPokemonData()
.then(allpokemonsData => {
  createPokemonCards(allpokemonsData);
});

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

