console.log('first message');
console.log(
    fetch('https://pokeapi.co/api/v2/pokemon/ditto')
);
console.log('second message');

async function fetcher(element) {
    let myvar = await fetch('https://pokeapi.co/api/v2/pokemon/charizard');
    let myjson = await myvar.json();
    console.log(myjson);
    
    console.log(myjson.sprites.other['official-artwork'].front_default);
    element.src = myjson.sprites.other['official-artwork'].front_default;
}




const myDiv = document.getElementById('myDiv');

let newE = document.createElement('img');

myDiv.appendChild(newE);

fetcher(newE);

//newE.src = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/132.png"
//object. sprites. other. official-artwork. front_default


