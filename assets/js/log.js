let URL = 'https://pokeapi.co/api/v2/pokemon/'; // URL de la API
let lupa = document.getElementById('pokebusqueda')
let URLF = 'https://pokeapi.co/api/v2/pokemon/' + 1; // URL de la API
let pokemonElegido = {}
let pokefoto = document.getElementById("contenido-index");

buscador()

// TRAER LOS DATOS
function traerDatos(url) {
        fetch(url)
            .then(response => response.json())
            .then(data => {
              fetch(data.species.url)
                .then(response => response.json())
                .then(data2 => {

                    // console.log(data2)
                    // console.log(data);

                  let tipos = []
                  let habilidades = []
                  let nombre = data.name
                  let id = data.id
                  let img = data.sprites.other.dream_world.front_default
                  let estadisticas = []
                  let descripcion = ""
                  let especie = data.species.name
                  let growdate = data2.growth_rate.name
                  let habitat = data2.habitat.name
                  let captureRate = data2.capture_rate
                  let baseExp = data.base_experience
                  let height = data.height //esta en decimetros
                  let weight = data.weight //esta en gramos

                  data.abilities.forEach(element => {
                    habilidades.push(element.ability.name)
                    })
                    data.types.forEach(element => {
                        tipos.push(element.type.name)
                    })

                    data.stats.forEach(element => {
                        estadisticas.push({
                          name: element.stat.name,
                          nivel: element.base_stat,
                        })              
                      })

                      data2.flavor_text_entries.forEach(idioma => {
                        if(idioma.language.name == "en"){
                          descripcion = idioma.flavor_text
                        }
                      })

                      pokemonElegido = {
                            tipo: tipos,
                            habilidades: habilidades,
                            nombre: nombre,
                            id: id,
                            img: img,
                            stadisticas: estadisticas,
                            descripcion: descripcion,
                            especie: especie,
                            growdate: growdate,
                            habitat: habitat,
                            captureRate: captureRate,
                            baseExp: baseExp,
                            height: height, //esta en decimetros
                            weight: weight
                      }
                      console.log(pokemonElegido)
                      mostrarPokemon(pokemonElegido)
                })
    })

}

// leer el buscador

// Detener el comportamiento por default
function buscador(){
    form.addEventListener('submit', function(e){
        e.preventDefault()
    })
    lupa.addEventListener('keyup', (evento)=>{
        let dataInput = evento.target.value;
        traerDatos(URL + dataInput)
    })
}

//para mostrar en pantalla las cartas
function mostrarPokemon(pokemon) {
    let ponerCarta = "";
  
        ponerCarta+= `
        <div class="info1 d-flex flex-column justify-content-between align-items-center">

          <h1 class="card-title text-center">${pokemon.nombre}</h1>
          <img src=${pokemon.img} alt="${pokemon.nombre}">
          <div class="texto-poke">
            <div class="d-flex gap-2 justify-content-center">
              <p v-for="tip in pokemon.tipo" class="type">${pokemon.tipo}</p>
            </div>
          </div>
        </div>


        <div class="text-white descripcionP">

          <div class="tab-content" id="myTabContent">
            <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
              <div class="mt-3">
                <p>${pokemon.descripcion}</p>
              </div>
              <div class="d-flex justify-content-evenly gap-2">
                <div class="d-flex flex-column-reverse about-mini">
                  <h6>Habilidades</h6>
                  <div v-for="hab in pokemon.habilidades" class="habilidades">
                  <p class="type">${pokemon.habilidades} </p>
                  </div>
                  
                  

                </div>
                <div class="d-flex flex-column-reverse about-mini medio">
                  <h6><i class="uil uil-weight"></i> Weight</h6>
                  <span class="text-center">
                    ${pokemon.weight} Kg
                  </span>
                </div>
                <div class="d-flex flex-column-reverse about-mini">
                  <h6><i class="uil uil-ruler"></i> Height</h6>
                  <span class="text-center"> ${pokemon.height} M</span>
                </div>
              </div>

              <div class="rounded-3 ">
                <div d-flex flex-row bg-warning>
                  <div class="details">
                    <p>Pokemon id:</p>
                    <span> ${pokemon.id}</span>
                  </div>
                  <div class="details">
                    <p>Especie:</p>
                    <span> ${pokemon.especie}</span>
                  </div>
                  <div class="details">
                    <p>Habitad:</p>
                    <span> ${pokemon.habitat}</span>
                  </div>

                  <div class="details">
                    <p>Base Exp.: </p>
                    <span>${pokemon.baseExp}</span>
                  </div>
                  <div class="details">
                    <p>Capture Rate: </p>
                    <span>${pokemon.captureRate}%</span>
                  </div>
                  <div class="details">
                    <p>Grow Rate: </p>
                    <span>${pokemon.growdate}</span>
                  </div>
                </div>
              </div>

            </div>
            <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
              <div id="stats" class="stats__poke p-1 text-white d-flex flex-column align-items-center">
                <h3>
                  Stats:
                </h3>
                <div class="mt-3 w-100 d-flex flex-column align-items-center">

                  <div class="w-100 d-flex flex-column justify-content-center">

                    <div v-for="stats in pokemon.stats" class="details">
                      <p>${pokemon.stadisticas.name}</p>
                      <div class="progress">
                        <div class="progress-bar" role="progressbar" aria-label="Example 1px high"
                          aria-valuenow="25" aria-valuemin="0" aria-valuemax="200">
                        </div>
                      </div>
                      <span>${pokemon.stadisticas.nivel}</span>
                    </div>


                  </div>
                </div>

              </div>
            </div>

            
          </div>
      </div>`;
  
      pokefoto.innerHTML = ponerCarta;
  
      }


