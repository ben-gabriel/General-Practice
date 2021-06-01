console.log('first message');
console.log(
    fetch('https://pokeapi.co/api/v2/pokemon/ditto')
);
console.log('second message');

async function fetcher() {
    let myvar = await fetch('https://pokeapi.co/api/v2/pokemon/ditto');
    let myjson = myvar.json();
    return myjson;
}

let promiseCatcher = fetcher();

console.log(promiseCatcher);

const myDiv = document.getElementById('myDiv');

let newE = document.createElement('img');

myDiv.appendChild(newE);



newE.src = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/132.png"