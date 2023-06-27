function fetchPokemonData() {
    const url = 'https://pokeapi.co/api/v2/pokemon/?limit=12';
  
    fetch(url)
      .then(response => response.json())
      .then(data => {
        const results = data.results;
  
        results.forEach(pokemon => {
          fetch(pokemon.url)
            .then(response => response.json())
            .then(pokemonData => {
              console.log(`Pokemon Name: ${pokemonData.name}`);
              console.log(`Pokemon ID: ${pokemonData.id}`);
              console.log('--------------');
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
  