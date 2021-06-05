//https://pokeapi.co/api/v2/pokemon/ditto

const pokemons = {
    list:[],
    
    html:{
        name :document.getElementById('name'),
        type :document.getElementById('type'),
        color :document.getElementById('color'),    
        shape :document.getElementById('shape'),   
        height :document.getElementById('height'),    
        weight :document.getElementById('weight'),   
        habitat :document.getElementById('habitat'),   
        growth :document.getElementById('growth'), 
        evFrom :document.getElementById('evFrom')
    },

    createPokemon: async function(pokemonName){
        try{

            let fetcher = await fetch('https://pokeapi.co/api/v2/pokemon/'+pokemonName);
            
            if(fetcher.ok === true){
                //checks if the fetching was successful
                console.log('createPokemon: Fetch Done');
                
                this.list[pokemonName] = this.list[pokemonName] || [];
                // shorthand
                let pkl = this.list[pokemonName];
                
                let pokemonJson = await((fetcher).json());  
                console.log('createPokemon: Initial Json = ', pokemonJson);
                    // Artwork
                    pkl.image = pokemonJson.sprites.other['official-artwork'].front_default;
                    pkl.imageAlt = pokemonJson.sprites.other.dream_world.front_default;
                    pkl.imagePixel = pokemonJson.sprites.front_default;
                    
                    // info
                    pkl.type = pokemonJson.types[0].type.name;
                    pkl.name = pokemonJson.name
                    pkl.weight = pokemonJson.weight;
                    pkl.height = pokemonJson.height;
                    
                    console.log('log inside createPokemon: ', pokemonJson);

                fetcher = await fetch('https://pokeapi.co/api/v2/pokemon-species/'+pokemonName);
               
                pokemonJson = await(fetcher).json(); 
                    
                    console.log('log inside createPokemon: ', pokemonJson);
 
                    // info
                    pkl.color =  pokemonJson.color.name;
                    pkl.shape = pokemonJson.shape.name;
                    pkl.habitat = pokemonJson.habitat.name;
                    pkl.growth = pokemonJson.growth_rate.name;
                    
                    if(pokemonJson.evolves_from_species !== null){
                        pkl.evFrom = pokemonJson.evolves_from_species.name;
                    }else{
                        pkl.evFrom = 'none';
                    }    
                return true

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

    showInfo: function(pokemonName){
        
        console.log('Log inside show info: '+ pokemonName.value);

        let object = this.html;

        for (const key in object) {
            object[key].innerText = this.list[pokemonName][key];
            console.log('Log inside loop in show info: ',key);
            //console.log(`${property}: ${object[property]}`);    
        }
        
    },

    createImg: function(parent){
        let newImage = document.createElement('img');
        parent.insertBefore(newImage,parent.firstChild);    
        return newImage;
    },

    addImage: async function(pokemonName, parent){
        console.log('Log inside addImage - this.list : ', this.list);

        let imgElement = this.createImg(parent);
        
        try{
            console.log('Log inside addimage - pokemonName: ', pokemonName);
            console.log('Log inside addimage - this.list[pokemonName].type:',this.list[pokemonName].type);
            //console.log('Log inside addimage - this.list.pokemonName.type:',this.list.pokemonName.type);
            
            imgElement.src = this.list[pokemonName].image;

        }catch(error){
            console.log('Error found: ' + error)
        }
    },

    newSubmition: async function(input, display){

        let response = await this.createPokemon(input);
        console.log('Log inside newSubmition - createPokemon response: ', response);

        if(response && response != (-1) ){
            this.addImage(input,display);
            this.showInfo(input)    ;
        }

    }


}

//----main----

const display = document.getElementById('imgDisplay');
const submit = document.getElementById('submitBtn');
const input = document.getElementById('inputField');

submit.addEventListener('click', () => {
    //pokemons.newSubmition(input,display);
    console.log(pokemons.list);
});

input.addEventListener('keydown', (e)=>{
    if(e.key== 'Enter'){
        pokemons.newSubmition(input.value,display);
        input.value = '';
        input.focus();
    }
});


pokemons.newSubmition('pikachu',display)

//To do: investigate fetch of:
//https://pokeapi.co/api/v2/pokemon/
//https://pokeapi.co/api/v2/pokemon/?offset=20&limit=20