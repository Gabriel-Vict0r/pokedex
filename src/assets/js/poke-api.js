const pokeAPI = {};

pokeAPI.getPokemonDetail = (pokemon) => { 
  return fetch(pokemon.url).then((response) => response.json())
}
pokeAPI.getPokemons = (offset = 0, limit = 10) => {
  // Requisição HTTP
  const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
  return fetch(url)
    //Retorna a promessa de uma resposta convertida em JSON
    .then((response) => response.json())

    //Recebe o body convertido
    .then((jsonBody) => jsonBody.results)

    .then((pokemons) => pokemons.map(pokeAPI.getPokemonDetail))
    .then((detailRequest) => Promise.all(detailRequest))
    .then((pokemonsDetail) => pokemonsDetail)
    //Captura os erros de requisição
    .catch((error) => console.error(error));
};
