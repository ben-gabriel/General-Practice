//https://pokeapi.co/api/v2/pokemon/ditto

const pokemons = {
    list:[],

    createPokemon: async function(pokemonName, fetchFlag){
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
            
            }else{
                //to do: trigger non existent pokemon actions
                console.log('pokemon not found');
                fetchFlag = false;
                //In case of error a false flag indicates the fetch was invalid
                return false;
            }

        }catch(error){
            console.log('Error found: ' + error);
            fetchFlag = -1;
            //In case of error a -1 flag indicates the fetch was not completed
            return -1;
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

pokemons.createPokemon('pikachu');

pokemons.createPokemon('raichu');

pokemons.createPokemon('pichu');

let pkl = pokemons.list;


submit.addEventListener('click', () => {
    
    console.log(pkl.pikachu);

});