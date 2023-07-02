function fetchPokemonData() {
    const url = 'https://pokeapi.co/api/v2/pokemon/?limit=12';
  
    fetch(url)
      .then(response => response.json())
      .then(data => {
        const results = data.results;
  
        
        const pokedexElement = document.getElementById('pokedex');
        results.forEach(pokemon => {
          fetch(pokemon.url)
            .then(response => response.json())
            .then(pokemonData => {
              const card = document.createElement('div');
                card.className = 'card';

                const image = document.createElement('img');
                image.src = pokemonData.sprites.front_default;

                const name = document.createElement('h3');
                name.textContent = pokemonData.name;

                const types = document.createElement('p');
                types.textContent = 'Types: ' + pokemonData.types.map(type => type.type.name).join(', ');

                card.appendChild(image);
                card.appendChild(name);
                card.appendChild(types);

                pokedexElement.appendChild(card);
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
  
  fetchPokemonData();
  