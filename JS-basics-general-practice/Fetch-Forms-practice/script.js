//https://pokeapi.co/api/v2/pokemon/ditto

async function fetcher(name){
    try{    
        return ((await fetch('https://pokeapi.co/api/v2/pokemon/'+name)).json());
        //returns the promise of a json object given that is an async function
    }catch(error){
        console.log('Error found: ' + error);
    }
}

function createImg(parent){
    let newImage = document.createElement('img');
    parent.appendChild(newImage);    
    return newImage;
}

async function addImage(name, parent){
    let imgElement = createImg(parent);
    try{
        let myjson = await fetcher(name);
        imgElement.src = myjson.sprites.other['official-artwork'].front_default;
    }catch(error){
        console.log('Error found: ' + error)
    }
}

function newSubmition(input, display){
    addImage(input.value, display);
    input.value = '';
    input.focus();
}

//----main----

const display = document.getElementById('imgDisplay');
const submit = document.getElementById('submitBtn');
const input = document.getElementById('textField');
const infoText = document.getElementById('infoText');

submit.addEventListener('click', () => {
    newSubmition(input,display);
});

input.addEventListener('keydown', (e)=>{
    if(e.key== 'Enter'){
        newSubmition(input,display);
    }
});

//addImage('pikachu', display);
