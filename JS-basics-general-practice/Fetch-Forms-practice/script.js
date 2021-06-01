//https://pokeapi.co/api/v2/pokemon/ditto

// async function fetcher(element) {
//     let myvar = await fetch('https://pokeapi.co/api/v2/pokemon/raichu');
//     let myjson = await myvar.json();
//     console.log(myjson);
    
//     console.log(myjson.sprites.other['official-artwork'].front_default);
//     element.src = myjson.sprites.other['official-artwork'].front_default;
// }

async function fetcher(name){
    console.log(name+' inside fetcher');
    return ((await fetch('https://pokeapi.co/api/v2/pokemon/'+name)).json());
    //returns the promise of a json object given that is an async function
}

async function addImage(name, newElement){
    console.log(name+' inside add image');
    let myjson = await fetcher(name);
    newElement.src = myjson.sprites.other['official-artwork'].front_default;
}

const myDiv = document.getElementById('myDiv');

let newE = document.createElement('img');

myDiv.appendChild(newE);

addImage('pikachu',newE);

//newE.src = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/132.png"
//object. sprites. other. official-artwork. front_default


