console.log('-- script: Starting');

function fLog(message, arg1 = ''){
    // arguments.callee.caller.name is deprecated, use with caution
    let fName = fLog.caller.name;
    console.log(`-+ ${fName}(): ${message}`, arg1);
    console.log('');
}

async function exceedCalls(cityName, amount){
    fLog('Starting');

    try{
        for (let index = 0; index < amount; index++) {
           
            const fetcher = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=cb8c7a9fae36fb84f17d0b6074bf16b2`);
            const weatherJson = await fetcher.json();

            fLog('weatherJson = ', weatherJson);
            
            if(fetcher.ok === true){
                fLog('fetcher ok status = true');
            }
            else{
                fLog('fetcher ok status = false');
            }
            
            //fLog('for() index =', index);
        }
        
    }
    catch(error){
        fLog('Error found = ', error);
    }
}

// https://openweathermap.org/current
// Call current weather data for one location
// By: city name, city ID, ZIP code, geographic coordinates
const weather={

    html:{
        name: document.getElementById('name'),
        main: document.getElementById('main'),
        description: document.getElementById('description'),
        visibility: document.getElementById('visibility'),
        temp: document.getElementById('temp'),
        feels_like: document.getElementById('feels_like'),
        humidity: document.getElementById('humidity'),
        lat: document.getElementById('lat'),
        lon: document.getElementById('lon'),
        icon: document.getElementById('icon')
    },

    currentWeather: async function (input, country = '', type){
        fLog('Starting');
        
        try {
            
            let fetcher = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${input},${country}&appid=cb8c7a9fae36fb84f17d0b6074bf16b2`);
            
            if(fetcher.ok === true){
                const weatherJson = await fetcher.json();
                fLog('Fetch done, Json created.');

                // Display info
                this.showInfo(weatherJson);


            }
            else{
                // to do: catch errors
            }


        } catch (error) {
            fLog('Error found = ', error);
        }

        fLog('Ending');
    },

    showInfo: function(weatherJson){
        // shorthand
        let tag = this.html;

        tag.name.innerText = weatherJson.name;
        tag.main.innerText = weatherJson.weather[0].main;
        tag.description.innerText = weatherJson.weather[0].description;
        tag.visibility.innerText = weatherJson.visibility;
        tag.temp.innerText = weatherJson.main.temp;
        tag.feels_like.innerText = weatherJson.main.feels_like;
        tag.humidity.innerText = weatherJson.main.humidity;
        tag.lat.innerText = weatherJson.coord.lat;
        tag.lon.innerText = weatherJson.coord.lon;
        
        let iconId = weatherJson.weather[0].icon;
        tag.icon.src =`http://openweathermap.org/img/wn/${iconId}@2x.png`;
        
        country.showInfo(weatherJson.sys.country);
        
        fLog('Info displayed');
    }
    
}

// https://restcountries.eu/rest/v2/alpha/co
const country={

    html:{
        flag: document.getElementById('flag'),
        country: document.getElementById('country'),
    },

    showFlag: async function(code){
        let fetcher = await fetch(`https://restcountries.eu/rest/v2/alpha/${code}?fields=flag`);
        let flagJson = await fetcher.json();

        this.html.flag.src = flagJson.flag;
    },

    showInfo: async function(code){

        let fetcher = await fetch(`https://restcountries.eu/rest/v2/alpha/${code}`);
        let countryJson = await fetcher.json();
        fLog('countryjson = ', countryJson);

        fetcher = await fetch(`https://restcountries.eu/rest/v2/alpha/${code}?fields=flag;name`);
        countryJson = await fetcher.json();

        this.html.flag.src = countryJson.flag;
        this.html.country.innerText = countryJson.name;
    }

}


// User Input
function submitUserInput(userInput){
    weather.currentWeather(userInput.value);
    userInput.value = '';
    userInput.focus();
}

// http://openweathermap.org/img/wn/10d@2x.png

// https://openweathermap.org/api/geocoding-api

/* Main */

exceedCalls('banfield',1);

// weather.currentWeather('lanús', 'ar');

const userInputField = document.getElementById('userInputField');
const userInputBtn = document.getElementById('userInputBtn');



userInputBtn.addEventListener('click', ()=>{
    submitUserInput(userInputField);
});

userInputField.addEventListener('keydown', (e)=>{
    if(e.key == 'Enter'){
        submitUserInput(userInputField);
    }
});
