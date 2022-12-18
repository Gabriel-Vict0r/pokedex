const pokeAPI = {};


/*----------Function to convert object models----------*/
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

//return a model of pokemon more simple
pokeAPI.getPokemonDetail = (pokemon) => {
  return fetch(pokemon.url).then((response) => response.json())
  .then(convertPokeApiDetailToPokemon)
}

pokeAPI.getPokemons = (offset = 0, limit = 8) => {
  //HTTP Request
  const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
  return fetch(url)
    //Return the Promisse converted in JSON
    .then((response) => response.json())

    //Receive the converted Body
    .then((jsonBody) => jsonBody.results)

    .then((pokemons) => pokemons.map(pokeAPI.getPokemonDetail))
    .then((detailRequest) => Promise.all(detailRequest))
    .then((pokemonsDetail) => pokemonsDetail)

    //Catch the request errors
    .catch((error) => console.error(error));
};

//Request for a more details about Pokemon(used in Popups)
pokeAPI.getPokemon = (number_pokemon) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${number_pokemon}/`; 
  return fetch(url)
  .then((response) => response.json())

  .catch((error) => console.error(error))
}