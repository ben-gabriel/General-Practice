//https://pokeapi.co/api/v2/pokemon/ditto

const pokemons = {
    pokemonsList:[],

    // ----- refactoring into createJson()
    fetcher: async function(pokemonName){
        try{    
            return ((await fetch('https://pokeapi.co/api/v2/pokemon/'+pokemonName)).json());
            //returns the promise of a json object given that is an async function
        }catch(error){
            console.log('Error found: ' + error);
        }
    },

    createJson: async function(pokemonName){
        try{
            let myjson = await(await fetch('https://pokeapi.co/api/v2/pokemon/'+pokemonName)).json();
            
            this.pokemonsList[pokemonName] = this.pokemonsList[pokemonName] || [];
            // check if the element already exist in the array || create empty otherwise
            

            this.pokemonsList[pokemonName] = (myjson);
            
        }catch(error){
            console.log('Error found: ' + error);
        }
    },

    getInfo:{
        json: function(pokemonName){
            return this.pokemonsList[pokemonName];
        }



    },

    createImg: function(parent){
        let newImage = document.createElement('img');
        parent.insertBefore(newImage,parent.firstChild);    
        return newImage;
    },

    addImage: async function(name, parent){
        let imgElement = this.createImg(parent);
        try{
            let myjson = await this.fetcher(name);
            console.log(myjson);
            imgElement.src = myjson.sprites.other['official-artwork'].front_default;
        }catch(error){
            console.log('Error found: ' + error)
        }
    },

    newSubmition: function(input, display){
        this.addImage(input.value, display);
        input.value = '';
        input.focus();
    }

}

//----main----

const display = document.getElementById('imgDisplay');
const submit = document.getElementById('submitBtn');
const input = document.getElementById('textField');
const infoText = document.getElementById('infoText');

// submit.addEventListener('click', () => {
//     pokemons.newSubmition(input,display);
// });

// input.addEventListener('keydown', (e)=>{
//     if(e.key== 'Enter'){
//         pokemons.newSubmition(input,display);
//     }
// });


//pokemons.addImage('pikachu', display);

pokemons.createJson('pikachu');

pokemons.createJson('raichu');

pokemons.createJson('pichu');

let vary = pokemons.pokemonsList;


submit.addEventListener('click', () => {
    console.log(vary.pichu)
});