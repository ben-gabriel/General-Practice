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
        growth_rate :document.getElementById('growth_rate'), 
        evolves_from_species :document.getElementById('evolves_from_species'),
        
        sprite: document.getElementById('sprite'),
        altImg: document.getElementById('altImg')
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
                
                    // Function to check if data is available
                    function loadList(tagName, dimention){
                        console.log('createPokemon.loadList: tag name = ', pokemonJson[tagName]);
                        if(pokemonJson[tagName]){
                            if(dimention === 2){
                                pkl[tagName] = pokemonJson[tagName].name;
                            }else{
                                pkl[tagName] = pokemonJson[tagName];
                            }
                        }else{
                            pkl[tagName] = 'not found';
                        }
                    }

                    // Artwork
                    pkl.image = pokemonJson.sprites.other['official-artwork'].front_default;
                    pkl.altImg = pokemonJson.sprites.other.dream_world.front_default;
                    pkl.sprite = pokemonJson.sprites.front_default;
                    
                    // // info
                    pkl.type = pokemonJson.types[0].type.name;
                    loadList('name');
                    loadList('weight');
                    loadList('height');

                fetcher = await fetch('https://pokeapi.co/api/v2/pokemon-species/'+pokemonName);
                pokemonJson = await(fetcher).json(); 
                    
                    console.log('createPokemon: Second Jason = ', pokemonJson);
 
                    // info
                    loadList('color', 2);
                    loadList('shape', 2);
                    loadList('habitat', 2);
                    loadList('growth_rate', 2)
                    loadList('evolves_from_species', 2);

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
        
        console.log('Log inside show info: '+ pokemonName);

        let object = this.html;
        let imageElement = object.sprite;

        for (const key in object) {
            object[key].innerText = this.list[pokemonName][key];
            console.log('Log inside loop in show info: ',key);

            if(object[key].tagName === "IMG"){
                object[key].src = this.list[pokemonName][key];
                console.log('Log inside if in showInfo');
            }

            console.log(`${key}: ${object[key]}`);    
        }
        
    },

    loadAboutImgs: function(pokemonName){
        this.sprite.src = this.list[pokemonName].sprite;
        this.altImg.src = this.list[pokemonName].altImg;
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

    newSubmition: async function(pokemonName, display){

        let response = await this.createPokemon(pokemonName);
        console.log('Log inside newSubmition - createPokemon response: ', response);

        if(response && response != (-1) ){
            this.addImage(pokemonName,display);
            this.showInfo(pokemonName);
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


pokemons.newSubmition('444',display)

//To do: in order to random investigate fetch of:
//https://pokeapi.co/api/v2/pokemon/
//https://pokeapi.co/api/v2/pokemon/?offset=20&limit=20