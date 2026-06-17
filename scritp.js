let pokemonActual = null;

function saveFavorite() {
  if (pokemonActual === null) {
    alert("Primero busca un Pokémon");
    return;
  }

  let favoritos = localStorage.getItem("favoritos");

  if (favoritos === null) {
    favoritos = [];
  } else {
    favoritos = JSON.parse(favoritos);
  }

  const existe = favoritos.some(function(pokemon) {
    return pokemon.nombre === pokemonActual.nombre;
  });

  if (existe) {
    alert("Este Pokémon ya está en favoritos");
    return;
  }

  favoritos.push(pokemonActual);

  localStorage.setItem("favoritos", JSON.stringify(favoritos));

  alert("Pokémon guardado en favoritos");
}

