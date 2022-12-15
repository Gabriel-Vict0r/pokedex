// variable declaration
const pokemonList = document.getElementById("pokemonList");
const loadMoreButton = document.getElementById("loadMore");
const limit = 10;
const maxRecords = 151;
let offset = 0;

//Retorna uma promessa de uma resposta

function loadPokemonItens(offset, limit) {
  pokeAPI.getPokemons(offset, limit).then((pokemons = []) => {
    pokemonList.innerHTML += pokemons
      .map(
        (pokemon) => `
    <li class="pokemon ${pokemon.type}">
    <span class="number">#${pokemon.number}</span>
    <span class="name ${pokemon.type}">${pokemon.name}</span>
    <div class="detail">
      <ol class="types">
        ${pokemon.types
          .map((type) => `<li class="type ${type}">${type}</li>`)
          .join("")}
          <li class="type" ><button type="button" class="button-more ${pokemon.type}">more</>
          </li>
      </ol>
      <img
        src="${pokemon.photo}"
        alt="${pokemon.name}"
      />
    </div>
  </li>`
      )
      .join("");
  });
}

loadPokemonItens(offset, limit);

loadMoreButton.addEventListener("click", () => {
  offset += limit;
  debugger
  const qtdRecordNextPage = offset + limit;
  if (qtdRecordNextPage >= maxRecords) {
    const newLimit = maxRecords - offset;
    loadPokemonItens(offset, newLimit);

    loadMoreButton.parentElement.removeChild(loadMoreButton);
  } else {
    loadPokemonItens(offset, limit);
  }
});
