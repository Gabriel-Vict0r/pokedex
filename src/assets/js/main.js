// variable declaration
const pokemonList = document.getElementById("pokemonList");
const loadMoreButton = document.getElementById("loadMore");
const limit = 12;
const maxRecords = 151;
let offset = 0;

/*------Function that load the pokemon list------*/
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
          <li class="type" ><button type="button" class="button-more ${
            pokemon.type
          }" onclick="loadPokemonPopup(${pokemon.number}, '${
          pokemon.type
        }')">more about</button>
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

/**------Button to load more Pokemons------ */
loadMoreButton.addEventListener("click", () => {
  offset += limit;
  const qtdRecordNextPage = offset + limit;
  if (qtdRecordNextPage >= maxRecords) {
    const newLimit = maxRecords - offset;
    loadPokemonItens(offset, newLimit);

    loadMoreButton.parentElement.removeChild(loadMoreButton);
  } else {
    loadPokemonItens(offset, limit);
  }
});

/*------Function that load more informations about the pokemon------*/
function loadPokemonPopup(pokemon_number, type_pokemon) {
  pokeAPI.getPokemon(pokemon_number).then((pokemon = []) => {
    pokemonList.innerHTML += `<div class="popup-wrapper wrapper${pokemon.id}">
    <div class="popup ${type_pokemon} popUp${pokemon.id}">
    <div class="container-button">
    <button type="button" id="closePopB" onclick="closePop('wrapper${
      pokemon.id
    }')" class="popup-close">
    <i class='bx bx-exit icon-closePop'></i>
    </button>
    </div>
      <div class="popup-content">
        <div class="header-popup ${type_pokemon}">
          <div class="header-content">
            <div class="header-popup-text">
              <h2>${pokemon.name}</h2>
              ${pokemon.types
                .map(
                  (typeSlot) =>
                    `<span class="types-poke-details ${type_pokemon}">${typeSlot.type.name}</span>`
                )
                .join("")}
            </div>
            <span class="number-poke-details">#${pokemon.id}</span>
          </div>
          <img
            class="img-pokeDetails"
            src="${pokemon.sprites.other.dream_world.front_default}"
            alt="${pokemon.name}"
          />
        </div>
        <div class="about-details">
          <h3 class="About-poke-Tittle">About</h3>
          <table cellspacing="10" align="left">
            <tr>
              <td class="info-poke">Base experience</td>
              <td>${pokemon.base_experience}</td>
            </tr>
            <tr>
              <td class="info-poke">Height</td>
              <td>${pokemon.height}</td>
            </tr>
            <tr>
              <td class="info-poke">Weight</td>
              <td>${pokemon.weight}</td>
            </tr>
            <tr>
              <td class="info-poke">Abilities</td>
              <td>${pokemon.abilities.map(
                (habSlot) => habSlot.ability.name
              )}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>`;
    let wrapper = document.querySelector(`.wrapper${pokemon.id}`);
    let popup = document.querySelector(`.popUp${pokemon.id}`);
    $(wrapper).show("slow");
    $(popup).animate({
      opacity: 1,
      speed: "slow",
    });
  });
}

/*------Function that close PopUp with more Informations from pokemon------*/
function closePop(wrapperId) {
  var pop = document.querySelector(`.${wrapperId}`);
  $(pop).hide("slow");
}
