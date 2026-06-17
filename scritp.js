// async function buscarPersonajes() {
//     //try sirve para manejar errores enla pagina web sin quese rompa  
//     try{
//         //creamos una cnstante, await es decirle a js que tomo un tiempo qeula ccion a realizar
//         // se demora unos milisegundos y en fetches decirle donde saca lla info
//         const response = await fetch('https://pokeapi.co/api/v2/pokemon/ditto'); // CORREGIDO: antes decia 'responde', pero abajo se usaba 'response' → nombre inconsistente causaba error
//         if(!response.ok) throw new Error('Error al conectar con el API😔'); // CORREGIDO: antes decia 'responde.ok' → la variable ya se llama 'response', nombre inconsistente causaba error
//         const data = await response.json()
//         console.log(data);

//         const responsePersonajes = await fetch(data);
//         if(!responsePersonajes.ok) throw new Error('Error al buscar los personajes ❎');


//         const listaPersonajes = await responsePersonajes.json();

//         // // retorna la lista de personajes
//         return listaPersonajes.results;

//         //catch(error) =  es el atrapador de de errores 
//         //(error) = variablle que crea automaticamente js para guardar pq fallo 
//         //log = ver el  error en la terminal  
//         // return = como no traajimos nada por cupa del error trae un array 
//         //vacio par ano mostrar anda a el usuario
//     }catch(error){
//         console.log("Paila manito hubo un error en la busqueda de personajes");
//         return [];
//     }
// }


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
                imagen: data.sprites.front_default
            };
            const resultado = document.getElementById("resultado");
            resultado.innerHTML = `
        <h2>${pokemonActual.nombre}</h2>
        <img src="${pokemonActual.imagen}" alt="${pokemonActual.nombre}">
      `;
        })
        .catch(function (error) {
            pokemonActual = null;
            document.getElementById("resultado").innerHTML = "";
            alert("Pokémon no encontrado");
        });
}

// const listaPersonajes = buscarPersonajes();
// console.log(listaPersonajes);



// const btnBuscar = document.getElementById('btn-buscar');

// btnBuscar.addEventListener('click', buscarPersonaje); // solo se ejecuta cuando e le da click, no cuando se recarga la página

// function buscarPersonaje() {
//     const inputBusqueda = document.getElementById('pokemonInput');
//     console.log("El botón funciona");
//     console.log(inputBusqueda.value); // muestra el valor del input, lo que significa lo que está dentro del input

//     const textoIngresado = inputBusqueda.value.trim().toLowerCase();

//     if (textoIngresado != "") {
//         const peronajesEncontrados = listaPersonajes.filter(personaje =>
//             personaje.name?.toLowerCase().includes(textoIngresado));
//         console.log(peronajesEncontrados);
//         //  crearTarjetaPersonajeEncontrado(peronajesEncontrados);
//     } else {
//         console.log("No sse ingresó ningún nombre de personaje");
//     }
// }




function updateFavoritesList() {

    let contenedor = document.getElementById('favoritos');

    let pokemonGuardados = JSON.parse(localStorage.getItem('favoritos'));

    pokemonGuardados.innerHTML = "";

    pokemonGuardados.forEach(pokemon => {

        let tarjeta = document.createElement("div");

        tarjeta.innerHTML = `
            <img src="${pokemon.image}">
            <p>${pokemon.name}</p>
        `;

        contenedor.appendChild(tarjeta);
    });
}