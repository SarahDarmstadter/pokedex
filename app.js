// appel API base pokemon
let allPokemon = []

function fetchPokemonBase (){
    fetch('https://pokeapi.co/api/v2/pokemon?limit=200')
        .then(res => res.json())
        .then(allPoke => {
            console.log(allPoke)
            allPoke.results.forEach(pokemon => {
                getFullPokemon(pokemon)
            });
        })
        .catch(error => console.log(error))
}

fetchPokemonBase()

function getFullPokemon(pokemon){

    let fullPokemon={}
    let url = pokemon.url
    let pokemonName = pokemon.name

    fetch(url)
        .then(response => response.json())
        .then(pokeData => {
            fullPokemon.img = pokeData.sprites.front_default
            fullPokemon.weight = pokeData.weight
            fullPokemon.type = pokeData.types[0].type.name
            fullPokemon.ability_one = pokeData.abilities[0].ability.name
            fullPokemon.baseExp = pokeData.base_experience

            fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonName}`)
                .then(res => res.json())
                .then(pokeData => {
                    fullPokemon.name = pokeData.names[4].name;

                    allPokemon.push(fullPokemon)
                    console.log(allPokemon)

                })
                .catch(function(error){
                    console.log(error)
                })

        })
      
}