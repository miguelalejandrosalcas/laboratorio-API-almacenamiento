let pokemonActual = null;

function searchPokemon() {

    const input = document.getElementById("pokemonInput");
    const nombre = input.value.toLowerCase().trim();

    if (nombre === "") {
        alert("Escribe el nombre de un Pokémon");
        return;
    }

    fetch(`https://pokeapi.co/api/v2/pokemon/${nombre}`)
        .then(function (response) {

            if (!response.ok) {
                throw new Error("Pokémon no encontrado");
            }

            return response.json();

        })
        .then(function (data) {

            pokemonActual = {
                nombre: data.name,
                imagen: data.sprites.front_default,
                id: data.id,
                altura: data.height,
                peso: data.weight,
                tipo: data.types[0].type.name
            };

            const resultado = document.getElementById("resultado");

            resultado.innerHTML = `
                <div class="contenedor-card">

                    <div
                        class="pokemon-card"
                        onclick="girarCard(this)">

                        <div class="card-frente">

                            <img
                                src="${pokemonActual.imagen}"
                                alt="${pokemonActual.nombre}"
                                class="img-fluid">

                            <h2 class="text-capitalize mt-3">
                                ${pokemonActual.nombre}
                            </h2>

                        </div>

                        <div class="card-dorso">

                            <h3 class="text-capitalize">
                                ${pokemonActual.nombre}
                            </h3>

                            <p>
                                <strong>ID:</strong>
                                ${pokemonActual.id}
                            </p>

                            <p>
                                <strong>Tipo:</strong>
                                ${pokemonActual.tipo}
                            </p>

                            <p>
                                <strong>Altura:</strong>
                                ${pokemonActual.altura}
                            </p>

                            <p>
                                <strong>Peso:</strong>
                                ${pokemonActual.peso}
                            </p>

                        </div>

                    </div>

                </div>
            `;

        })
        .catch(function (error) {

            pokemonActual = null;

            document.getElementById("resultado").innerHTML = "";

            alert("Pokémon no encontrado");

            console.error(error);

        });

}

function saveFavorite() {

    if (!pokemonActual) {
        alert("Primero busca un Pokémon");
        return;
    }

    let favoritos =
        JSON.parse(localStorage.getItem("favoritos")) || [];

    const existe = favoritos.some(function (pokemon) {
        return pokemon.nombre === pokemonActual.nombre;
    });

    if (!existe) {

        favoritos.push(pokemonActual);

        localStorage.setItem(
            "favoritos",
            JSON.stringify(favoritos)
        );

        updateFavoritesList();

        alert("Pokémon agregado a favoritos");
    }

}

function updateFavoritesList() {

    const contenedor =
        document.getElementById("favoritos");

    const favoritos =
        JSON.parse(localStorage.getItem("favoritos")) || [];

    contenedor.innerHTML = "";

    if (favoritos.length === 0) {

        contenedor.innerHTML = `
            <p class="text-muted">
                Todavía no tienes favoritos guardados.
            </p>
        `;

        return;
    }

    favoritos.forEach(function (pokemon) {

        contenedor.innerHTML += `
            <div class="col-md-3">

                <div class="card text-center h-100">

                    <img
                        src="${pokemon.imagen}"
                        alt="${pokemon.nombre}"
                        class="card-img-top p-3">

                    <div class="card-body">

                        <h5 class="card-title text-capitalize">
                            ${pokemon.nombre}
                        </h5>

                        <p>ID: ${pokemon.id}</p>

                        <p>Tipo: ${pokemon.tipo}</p>

                    </div>

                </div>

            </div>
        `;

    });

}

function girarCard(elemento) {

    elemento.classList.toggle("is-flipped");

}