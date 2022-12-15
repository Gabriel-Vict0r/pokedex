const pokeAPI = {};

function convertPokeApiDetailToPokemon(pokeDetail) {
  const pokemon = new Pokemon();
  pokemon.number = pokeDetail.id;
  pokemon.name = pokeDetail.name;

  const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
  
  const [type] = types;
  pokemon.types = types;
  pokemon.type = type;

  pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;
  return pokemon;
}

pokeAPI.getPokemonDetail = (pokemon) => { 
  return fetch(pokemon.url).then((response) => response.json())
  .then(convertPokeApiDetailToPokemon)
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
