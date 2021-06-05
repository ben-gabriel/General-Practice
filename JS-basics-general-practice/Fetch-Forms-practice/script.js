//https://pokeapi.co/api/v2/pokemon/ditto

const pokemons = {
    list:[],

    createPokemon: async function(pokemonName){
        try{

            let fetcher = await fetch('https://pokeapi.co/api/v2/pokemon/'+pokemonName);
            
            if(fetcher.ok === true){
                //checks if the fetching was successful
                console.log('pokemon found');

                this.list[pokemonName] = this.list[pokemonName] || [];
                // shorthand
                let pkl = this.list[pokemonName];

                let pokemonJson = await((fetcher).json());  
                    // Artwork
                    pkl.image = pokemonJson.sprites.other['official-artwork'].front_default;
                    pkl.imageAlt = pokemonJson.sprites.other.dream_world.front_default;
                    pkl.imagePixel = pokemonJson.sprites.front_default;
                    
                    // info
                    pkl.type = pokemonJson.types[0].type.name;

                    pkl.weight = pokemonJson.weight;
                    pkl.height = pokemonJson.height;
                    
                    console.log('log inside createPokemon: ', this.list.pokemonName.image);

                fetcher = await fetch('https://pokeapi.co/api/v2/pokemon-species/'+pokemonName);
               
                pokemonJson = await(fetcher).json(); 
                    
                    // info
                    pkl.color =  pokemonJson.color.name;
                    pkl.shape = pokemonJson.shape.name;
                    pkl.habitat = pokemonJson.habitat.name;
                    pkl.growthRate = pokemonJson.growth_rate.name;
                    
                    if(pokemonJson.evolves_from_species !== null){
                        pkl.evFrom = pokemonJson.evolves_from_species.name;
                    }else{
                        pkl.evFrom = 'none';
                    }    
                return await((await fetch('https://pokeapi.co/api/v2/pokemon/'+pokemonName)).json())

            }else{
                //to do: trigger non existent pokemon actions
                console.log('pokemon not found');
                //In case of error a false flag indicates the fetch was invalid
                return false;
            }
        
                
        }catch(error){
            console.log('Error found: ' + error);
            //In case of error a -1 flag indicates the fetch was not completed
            return -1;
        }

        return true;    
    },

    createImg: function(parent){
        let newImage = document.createElement('img');
        parent.insertBefore(newImage,parent.firstChild);    
        return newImage;
    },

    addImage: async function( pokemonName, parent){
        let imgElement = this.createImg(parent);

        let pkl = this.list;
        console.log('Log inside addImage - this.list : ', pkl);
        
        try{
            console.log('Log inside addimage - pokemonName: ', pokemonName);
            console.log('Log inside addimage - this.list[pokemonName].type:',this.list[pokemonName].type);
            console.log('Log inside addimage - this.list.pokemonName.type:',this.list.pokemonName.type);
            
            imgElement.src = this.list[pokemonName].type;

        }catch(error){
            console.log('Error found: ' + error)
        }
    },

    newSubmition: async function(input, display){

        let response = await this.createPokemon(input.value);
        console.log('Log inside newSubmition - createPokemon response: ', response);

        if(response){
            this.addImage(input.value,display);
        }

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
    //pokemons.newSubmition(input,display);
    console.log(pokemons.list);
});

input.addEventListener('keydown', (e)=>{
    if(e.key== 'Enter'){
        pokemons.newSubmition(input,display);
    }
});


//pokemons.addImage('pikachu', display);




let obj0 = {value: 0}
let obj1 = {value: 1}
let obj2 = {value: 2}
let obj3 = {value: 'tag',value2: 'tag2',value3: 'tag3',}

let objArray = [];

objArray[0]=obj0;
objArray[1]=obj1;
objArray[2]=obj2;
objArray['tag']=obj3;

let tagvar = 'tag'

console.log(objArray[tag]);


