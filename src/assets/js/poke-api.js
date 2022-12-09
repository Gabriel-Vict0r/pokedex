const pokeAPI = {};

pokeAPI.getPokemons = (offset = 0, limit = 10) => {
  // Requisição HTTP
  const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
  return fetch(url)
    //Retorna a promessa de uma resposta convertida em JSON
    .then((response) => response.json())

    .then((jsonBody) => jsonBody.results)
    //Recebe o body convertido

    //Captura os erros de requisição
    .catch((error) => console.error(error));
};
