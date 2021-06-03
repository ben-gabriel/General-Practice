//https://pokeapi.co/api/v2/pokemon/ditto

const pokemons = {
    list:[],

    // ----- refactoring into createJson()
    // fetcher: async function(pokemonName){
    //     try{    
    //         return ((await fetch('https://pokeapi.co/api/v2/pokemon/'+pokemonName)).json());
    //         //returns the promise of a json object given that is an async function
    //     }catch(error){
    //         console.log('Error found: ' + error);
    //     }
    // },

    createJson: async function(pokemonName){
        try{

            let fetcher = await fetch('https://pokeapi.co/api/v2/pokemon/'+pokemonName);
            
            if(fetcher.ok === true){
                //checks if the fetching was successful
                console.log('pokemon found');

                let pokemonJson = await((fetcher).json());  
                    // Artwork
                    let pokemonImage = pokemonJson.sprites.other['official-artwork'].front_default;
                    let pokemonAltImage = pokemonJson.sprites.other.dream_world.front_default;
                    let pokemonImagePixel = pokemonJson.sprites.front_default;
                    
                    // info
                    let pokemonType = pokemonJson.types[0].type.name;
                    let pokemonWeight = pokemonJson.weight;
                    let pokemonHeight = pokemonJson.height;

                fetcher = await fetch('https://pokeapi.co/api/v2/pokemon-species/'+pokemonName);
                pokemonJson = await(fetcher).json(); 
                    
                    // info
                    let pokemonColor = pokemonJson.color.name;
                    let pokemonGrowthRate = pokemonJson.growth_rate.name;
                    let pokemonShape = pokemonJson.shape.name;
                    let pokemonHabitat = pokemonJson.habitat.name;

                    let pokemonEvFrom = '';
                    if(pokemonJson.evolves_from_species !== null){
                        pokemonEvFrom = pokemonJson.evolves_from_species.name;
                    }else{
                        pokemonEvFrom = 'none';
                    }


                this.list[pokemonName] = this.list[pokemonName] || [];
                // check if the element already exist in the array || create empty otherwise
                
                // shorthand
                let pkl = this.list[pokemonName];
                
                // artwork
                pkl.image = pokemonImage;
                pkl.imageAlt = pokemonAltImage;
                pkl.imagePixel = pokemonImagePixel;

                // Info
                pkl.type = pokemonType;
                pkl.color = pokemonColor;
                pkl.shape = pokemonShape;
                pkl.evFrom = pokemonEvFrom;
                pkl.weight = pokemonWeight;
                pkl.height = pokemonHeight;
                pkl.habitat = pokemonHabitat;
                pkl.growthRate = pokemonGrowthRate;
            
            }else{
                //to do: trigger non existent pokemon actions
                console.log('pokemon not found');
            }
            
        }catch(error){
            console.log('Error found: ' + error);
        }
    },

    getInfo:{
        json: function(pokemonName){
            if(this.list.pokemonName.sprites){
                //if true then pokemonName does have data
                //return this.list[pokemonName];
            }else{
                //to do: trigger non existent pokemon actions
            }
        },

        bio: function(pokemonName){
            if(this.list.pokemonName.sprites){
                //if true then pokemonName does have data
                return this.list.pokemonName;
            }else{
                //to do: trigger non existent pokemon warning
            }
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

let vary = pokemons.list;


submit.addEventListener('click', () => {
    
    console.log(vary.pikachu);

});