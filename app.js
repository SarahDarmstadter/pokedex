// appel API base pokemon
let allPokemon = []
let tableauFin = []

function fetchPokemonBase (){
    fetch('https://pokeapi.co/api/v2/pokemon?limit=300')
        .then(res => res.json())
        .then(allPoke => {
            //console.log(allPoke)
            allPoke.results.forEach((pokemon) => {
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
            fullPokemon.id = pokeData.id
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

                    if(allPokemon.length === 300){
                        console.log("allpokemon", allPokemon)

                        tableauFin = allPokemon.sort((a,b)=> {
                            return a.id - b.id
                        }).splice(0,21)

                        createCard(tableauFin)
                    }   
                })
                .catch(function(error){
                    console.log(error)
                })
        }) 
}

function createCard(arr){
    for (let i = 0; i< arr.length; i++){
    
        const content = document.createElement("div")
        content.classList.add("content", "flip-container", "rotate", "col-md-4")
        content.setAttribute("id", i + "_content")

        const wrap = document.createElement("div")
        wrap.classList.add("flipper", "tourne", "wrap")
        wrap.setAttribute("id", i + "_wrap")
        content.appendChild(wrap)

        const row = document.getElementById("row")
        row.appendChild(content)

        const front = document.createElement("div")
        front.classList.add("front", 'd-flex', "flex-column", "align-items-center")
        front.style.border ="2px solid yellow"
        wrap.appendChild(front)
        
        const type = document.createElement("p")
        type.classList.add("description", "description_1")
        type.innerHTML = "Type: " + arr[i].type
        front.appendChild(type)

        const weight = document.createElement("p")
        weight.classList.add("description")
        weight.innerHTML = "Weigth : " + arr[i].weight + " pounds"
        front.appendChild(weight)

        const ability = document.createElement("p")
        ability.classList.add("description")
        ability.innerHTML = "Ability: " + arr[i].ability_one
        front.appendChild(ability)
        
        const baseExp = document.createElement("p")
        baseExp.classList.add("description")
        baseExp.innerHTML = "Base_Exp: " + arr[i].baseExp
        front.appendChild(baseExp)
        
        const back = document.createElement("div")
        back.classList.add("back")
        back.style.border ="2px solid yellow"
        wrap.appendChild(back)

        const pokeName = document.createElement("h1")
        pokeName.classList.add("name")
        pokeName.innerHTML = arr[i].name
        back.appendChild(pokeName)

        const pokeImg = document.createElement("img")
        pokeImg.src = arr[i].img
        pokeImg.classList.add("img")
        back.appendChild(pokeImg)

        if(arr[i].type == "grass"){
            back.style.backgroundColor = "#3e9709";
            front.style.backgroundColor = "#3e9709";
        } else if (arr[i].type === "fire") {
            back.style.backgroundColor = "#f67f0b";
            front.style.backgroundColor = "#f67f0b";
        } else if (arr[i].type === "water") {
            back.style.backgroundColor = "#0a7abc";
            front.style.backgroundColor = "#0a7abc";
        } else if (arr[i].type === "water") {
            back.style.backgroundColor = "#0a7abc";
            front.style.backgroundColor = "#0a7abc";
        } else if (arr[i].type === "bug") {
            back.style.backgroundColor = "#91ba2e";
            front.style.backgroundColor = "#91ba2e";
        } else if (arr[i].type === "normal") {
            back.style.backgroundColor = "#aca974";
            front.style.backgroundColor = "#aca974";
        } else if (arr[i].type === "ground") {
            back.style.backgroundColor = "#bfac21";
            front.style.backgroundColor = "#bfac21";
        } else if (arr[i].type === "fighting") {
            back.style.backgroundColor = "#800b11";
            front.style.backgroundColor = "#800b11";
        } else if (arr[i].type === "psychic") {
            back.style.backgroundColor = "#ec0e63";
            front.style.backgroundColor = "#ec0e63";
        } else if (arr[i].type === "rock") {
            back.style.backgroundColor = "#776a3e";
            front.style.backgroundColor = "#776a3e";
        } else if (arr[i].type === "electric") {
            back.style.backgroundColor = "#969101";
            front.style.backgroundColor = "#969101";
        } else if (arr[i].type === "poison") {
            back.style.backgroundColor = "#611380";
            front.style.backgroundColor = "#611380";
        } else if (arr[i].type === "ghost") {
            back.style.backgroundColor = "#472b53";
            front.style.backgroundColor = "#472b53";
        } else if (arr[i].type === "ice") {
            back.style.backgroundColor = "#1995a1";
            front.style.backgroundColor = "#1995a1";
        } else if (arr[i].type === "dragon") {
            back.style.backgroundColor = "#29036a";
            front.style.backgroundColor = "#29036a";
        } else if (arr[i].type === "dark") {
            back.style.backgroundColor = "#5f4632";
            front.style.backgroundColor = "#5f4632";
        } else if (arr[i].type === "fairy") {
            back.style.backgroundColor = "#f87ea7";
            front.style.backgroundColor = "#f87ea7";
        } else if (arr[i].type === "steel") {
            back.style.backgroundColor = "#7b8e8a";
            front.style.backgroundColor = "#7b8e8a";
        } 

        const cardId = i +"_content"
        const card = document.getElementById(cardId)

        card.addEventListener("click", flipCard)
        function flipCard(){
            console.log("xcvgbhjk")
            card.classList.toggle("rotate")
            const wrapcard = document.getElementById(i+"_wrap")
            wrapcard.classList.toggle("tourne")
        }
    }
}

// infini scroll

window.addEventListener('scroll', ()=>{
    console.log("dfghjklm")
    const {scrollTop, scrollHeight, clientHeight} = document.documentElement;

    if(clientHeight + scrollTop >= scrollHeight - 20) {
        addPokemon(20)
    }
});

let index = 21

function addPokemon(nb){
    if(index > 300){
        return;
    }
    const arrToAdd = allPokemon.slice(index, index + nb);
    createCard(arrToAdd);
    index += nb
};

//recherche
const loupe = document.getElementById("loupe")
loupe.addEventListener("click",recherche) 
const search = document.getElementById("search")
search.addEventListener("keyup", recherche)

function recherche(){
    if (index <300){
        addPokemon(50)
    }
    let filter, nameValue, allcard, allname;
    filter = search.value.toUpperCase()
    allname = document.querySelectorAll("h1")
    allcard = [...document.querySelectorAll("div.content")];


    for (let i =0; i< allcard.length; i++){
        nameValue = allname[i].innerText

        if(nameValue.toUpperCase().indexOf(filter) > -1){
            allcard[i].style.display = "block"
        } else {
            allcard[i].style.display ="none"
        }
    }
}