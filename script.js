//buscar pokemons por nombre o num

const btnBuscar = document.getElementById("buscar");
let pageGrid = document.getElementById("pokemon-grid");
let statsDiv = document.getElementById("pokemonStats");
let siguiente = document.getElementById("btn-sig");
let anterior = document.getElementById("btn-ant");

//mostrar info

window.onload = function () {
  siguiente.style.display = "none";
  anterior.style.display = "none";

  let html = "";

  for (let i = 0; i < 24; i++) {
    const randomPokemonNumber = Math.floor(Math.random() * 150) + 1;
    const pokemonDataUrl = `https://pokeapi.co/api/v2/pokemon/${randomPokemonNumber}`;

    fetch(pokemonDataUrl)
      .then((response) => response.json())
      .then((data) => {
        const pokemonName = data.name;
        const pokemonImageUrl =
          data.sprites.other["official-artwork"].front_default;

        html += `
            <div class="item" onclick="mostrarInformacion(${randomPokemonNumber})"> 
              <img src="${pokemonImageUrl}" alt="" class="grid-img">
              <p>No: ${randomPokemonNumber}</p>
              <p>Name: ${pokemonName}</p>
            </div>
          `;

        if (i === 23) {
          pageGrid.innerHTML = html;
        }
      })
      .catch((error) =>
        console.error("Error al obtener los datos del Pokémon:", error)
      );
  }
};

function mostrarInformacion(pokemonNumber) {
  const pokemonDataUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonNumber}`;

  fetch(pokemonDataUrl)
    .then((response) => response.json())
    .then((datosPkm) => mostrarPkm(datosPkm))
    .catch(() => mostrarError());
}

btnBuscar.addEventListener("click", buscarPkm);

function buscarPkm() {
  pageGrid.style.display = "none";
  let nombrePkm = document
    .getElementById("pokemonInput")
    .value.trim()
    .toLowerCase();
  let urlApi = `https://pokeapi.co/api/v2/pokemon/${nombrePkm}`;

  fetch(urlApi)
    .then((Response) => Response.json())
    .then((datosPkm) => mostrarPkm(datosPkm))
    .catch(() => mostrarError(nombrePkm));

  siguiente.addEventListener("click", (e) => {
    e.preventDefault();
    nombrePkm = parseInt(nombrePkm) + 1;
    document.getElementById("pokemonInput").value = nombrePkm;
    buscarPkm();
  });

  anterior.addEventListener("click", (e) => {
    e.preventDefault();
    nombrePkm = parseInt(nombrePkm) - 1;
    document.getElementById("pokemonInput").value = nombrePkm;
    buscarPkm();
  });
}

function mostrarPkm(datosPkm) {
  siguiente.style.display = "";
  anterior.style.display = "";
  let infoDiv = document.getElementById("pokemonInfo");
  statsDiv.style.display = "grid";
  infoDiv.innerHTML = `
    <h2 class= "pk-name">${datosPkm.name.toUpperCase()}</h2>
    <img class= "pk-img" src="${
      datosPkm.sprites.other["official-artwork"].front_default
    }" alt="imagen del pokemon">
    <div class="contenedor-info">
        <ul>
            <li>
                <span>Numero: </span>
                </span>${datosPkm.id}<span>
            </li><br>
            <li>
                <span>Altura: </span>
                </span>${datosPkm.height / 10}M<span>
            </li><br>
            <li>
                <span>Peso: </span>
                </span>${datosPkm.weight / 10}Kg<span>
            </li><br>
            <li>
                <span>Habilidad: </span>
                </span>${datosPkm.abilities[0].ability.name}<span>
            </li><br>
        </ul>
    </div>

    `;

  statsDiv.innerHTML = `     
    
    <div class="contenedor-stats">
        <h3>Stats:</h3><br>
       
        
        <p>${datosPkm.stats[0].stat.name}:</p>
        <div class="progress">
            <div class="progress-bar" style="width: ${datosPkm.stats[0].base_stat}%;">
                <span>${datosPkm.stats[0].base_stat}</span>
            </div>
        </div>
        <p>${datosPkm.stats[1].stat.name}:</p>
        <div class="progress">
            <div class="progress-bar" style="width: ${datosPkm.stats[1].base_stat}%;">
                <span>${datosPkm.stats[1].base_stat}</span>
            </div>
        </div>
        <p>${datosPkm.stats[2].stat.name}:</p>
        <div class="progress">
            <div class="progress-bar" style="width: ${datosPkm.stats[2].base_stat}%;">
                <span>${datosPkm.stats[2].base_stat}</span>
            </div>
        </div>
        <p>${datosPkm.stats[3].stat.name}:</p>
        <div class="progress">
            <div class="progress-bar" style="width: ${datosPkm.stats[3].base_stat}%;">
                <span>${datosPkm.stats[3].base_stat}</span>
            </div>
        </div>
        <p>${datosPkm.stats[4].stat.name}:</p>
        <div class="progress">
            <div class="progress-bar" style="width: ${datosPkm.stats[4].base_stat}%;">
                <span>${datosPkm.stats[4].base_stat}</span>
            </div>
        </div>
        <p>${datosPkm.stats[5].stat.name}:</p>
        <div class="progress">
            <div class="progress-bar" style="width: ${datosPkm.stats[5].base_stat}%;">
                <span>${datosPkm.stats[5].base_stat}</span>
            </div>
        </div>
        
        
     
    


    </div>
    
`;
}

function mostrarError() {
  let infoDiv = document.getElementById("pokemonInfo");
  pageGrid.style.display = "grid";
  statsDiv.style.display = "none";

  infoDiv.innerHTML = `
    <p class= "pk-ms">Pokemon no encontrado. <br>Intenta con otro nombre o numero</br>
    `;
}
