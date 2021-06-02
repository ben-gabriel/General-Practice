//https://pokeapi.co/api/v2/pokemon/ditto

const pokemons = {
    pokemonsList: [],

    fetcher: async function(pokemonName){
        try{    
            return ((await fetch('https://pokeapi.co/api/v2/pokemon/'+pokemonName)).json());
            //returns the promise of a json object given that is an async function
        }catch(error){
            console.log('Error found: ' + error);
        }
    },

    getInfo:{
        createJson:async function(pokemonName){
            try{
                let myjson = await this.fetcher(pokemonName);
                
                this.pokemonsList[pokemonName] = this.pokemonsList[pokemonName] || [];
                // check if element already exist in array || create empty otherwise
                
                this.pokemonsList[pokemonName].push(myjson);
            }catch(error){
                console.log('Error found: ' + error)
            }
        },

        getJson: function(pokemonName){

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

submit.addEventListener('click', () => {
    pokemons.newSubmition(input,display);
});

input.addEventListener('keydown', (e)=>{
    if(e.key== 'Enter'){
        pokemons.newSubmition(input,display);
    }
});

pokemons.addImage('pikachu', display);
