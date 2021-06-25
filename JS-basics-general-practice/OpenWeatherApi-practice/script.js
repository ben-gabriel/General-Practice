console.log('-- script: Starting');

const apiKey = 'cb8c7a9fae36fb84f17d0b6074bf16b2';
let units = 'metric';
let unitLetter = '°C';
let lastLon = 0;
let lastLat = 0;

// Function to console.log specifying the parent function name.
function fLog(message, arg1 = ''){
    // arguments.callee.caller.name is deprecated, use with caution
    let fName = fLog.caller.name;
    console.log(`-+ ${fName}(): ${message}`, arg1);
    console.log('');
}

// Docs: https://openweathermap.org/current
// Can call current weather data for one location
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

    getCurrent: async function (input, lat='', lon='', inputType='byName'){
        fLog('Starting');
        
        try {

            let fetcher;
            if(inputType === 'byName'){
                fetcher = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${input}&units=${units}&appid=${apiKey}`);
            }
            else if(inputType === 'byCoord'){
                fetcher = await fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`);
            }
            
            if(fetcher.ok === true){
                const weatherJson = await fetcher.json();
                fLog('Fetch done, Json created.');

                // Display info
                this.showCurrent(weatherJson);
                if(inputType === 'byName'){
                    weather.getForecast(weatherJson.coord.lat, weatherJson.coord.lon);
                }

                lastLat = weatherJson.coord.lat;
                lastLon = weatherJson.coord.lon;
            }
            else{
                // to do: catch errors
            }


        } catch (error) {
            fLog('Error found = ', error);
        }

        fLog('Ending');
    },

    showCurrent: function(weatherJson){
        // shorthand
        let tag = this.html;

        tag.name.innerText = weatherJson.name;
        tag.main.innerText = weatherJson.weather[0].main;
        tag.description.innerText = weatherJson.weather[0].description;
        tag.visibility.innerText = (weatherJson.visibility)/1000;
        tag.temp.innerText = weatherJson.main.temp+unitLetter;
        tag.feels_like.innerText = weatherJson.main.feels_like+unitLetter;
        tag.humidity.innerText = weatherJson.main.humidity+'%';
        tag.lat.innerText = weatherJson.coord.lat;
        tag.lon.innerText = weatherJson.coord.lon;
        
        let iconId = weatherJson.weather[0].icon;
        tag.icon.src =`http://openweathermap.org/img/wn/${iconId}@4x.png`;
        tag.icon.style.visibility = 'visible';
        
        geoLocation.showInfo(weatherJson.sys.country);
        
        fLog('Info displayed');
    },

    //https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
    getForecast: async function( lat, lon){

        fLog('Starting');
        
        try {

            let fetcher = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude='current,minutely,hourly,alerts'&units=${units}&appid=${apiKey}`);
            
            if(fetcher.ok === true){
                const forecastJson = await fetcher.json();
                fLog('Fetch done, Json created.');
                fLog('forecastJson = ', forecastJson);

                this.clearforecast();
                for (let index = 0; index < forecastJson.daily.length; index++) {
                    this.showForecast(forecastJson.daily[index], index);      
                }

            }
            else{
                // to do: catch errors
            }


        } catch (error) {
            fLog('Error found = ', error);
        }

        fLog('Ending');
    },

    showForecast: function(nDayForecast, nDay){

        let section = document.getElementById('weatherForecast');
        
        let newDiv = document.createElement('div');

        let day;
        if(nDay === 0){
            day = 'Today'
        }
        else{
            day = '+'+(nDay * 24)+'hs';
        }

        newDiv.innerHTML = `
            <div id="day${nDay}">
            
                <p>${day}</p>

                <p>Weather: ${nDayForecast.weather[0].main}</p>
                <img src="http://openweathermap.org/img/wn/${nDayForecast.weather[0].icon}@4x.png" alt="Weather Icon">
                <p>Description: ${nDayForecast.weather[0].description}</p>

                <p>Precipitation: ${(nDayForecast.pop)*100}%</p>
                <p>Rain: ${nDayForecast.rain}mm</p>
                <p>Humidity: ${nDayForecast.humidity}%</p>
                <p>Cloudiness: ${nDayForecast.clouds}%</p>
                <p>Min: ${nDayForecast.temp.min}${unitLetter}</p>
                <p>Max: ${nDayForecast.temp.max}${unitLetter}</p>

            </div> 
        `;

        section.appendChild(newDiv);

    },

    clearforecast: function(){
        let section = document.getElementById('weatherForecast');
        section.innerHTML = '';
    }
    
}


const geoLocation={

    html:{
        flag: document.getElementById('flag'),
        country: document.getElementById('country'),
        suggestions: document.getElementById('suggestions')
    },

    // https://restcountries.eu/rest/v2/alpha/ country code
    showInfo: async function(code){

        // let fetcher = await fetch(`https://restcountries.eu/rest/v2/alpha/${code}`);
        // let countryJson = await fetcher.json();
        // fLog('countryjson = ', countryJson);

        let fetcher = await fetch(`https://restcountries.eu/rest/v2/alpha/${code}?fields=flag;name`);
        let countryJson = await fetcher.json();

        this.html.country.innerText = countryJson.name;
        this.html.flag.src = countryJson.flag;
        this.html.flag.style.visibility = 'visible';
        
    },  
    
    // https://openweathermap.org/api/geocoding-api
    getSuggestions: async function(input){

        if(isNaN(input)){
            // variable = input.toLowerCase();
            let fetcher = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${input}&limit=10&appid=${apiKey}`);
            
            let suggestionsJson = await fetcher.json();
             
            if( (typeof suggestionsJson[0]) !== 'undefined'){
                
                fLog('TRUE suggestionsJson = ', suggestionsJson); 
                this.clearSuggestions();
                
                suggestionsJson.forEach(element => {
                    this.showSuggestion(element);      
                });

            }
            else{
                fLog('FALSE suggestionsJson = ', suggestionsJson);                
            }
            
        }else{
            // search by coordinates
          //  let fetcher = await fetch()

        }

    },

    showSuggestion: async function(suggestion){
        fLog('starting');

        let fetcher = await fetch(`https://restcountries.eu/rest/v2/alpha/${suggestion.country}?fields=flag;name`);
        let flagJson = await fetcher.json();
        let newImg = document.createElement('img');
        newImg.src = flagJson.flag;

        let suggestionsUl = this.html.suggestions;
        let newListItem = document.createElement('li');

        newListItem.id = suggestion.name;
        newListItem.addEventListener('click', ()=>{
            weather.getCurrent('',suggestion.lat,suggestion.lon, 'byCoord');
            weather.getForecast(suggestion.lat, suggestion.lon);
        });

        if(suggestion.country === 'US'){
            newListItem.innerText = `${suggestion.name}, ${suggestion.state}. @ ${suggestion.lat}, ${suggestion.lon}`;
        }else{
            newListItem.innerText = `${suggestion.name}, ${suggestion.country}. @ ${suggestion.lat}, ${suggestion.lon}`;
        }
        
        newListItem.insertBefore(newImg, newListItem.firstChild);
        suggestionsUl.insertBefore(newListItem, suggestionsUl.firstChild);

    },

    clearSuggestions: function(){
        // check if suggestion is inside string 
        // whit string.includes(searchvalue, start)
        //and delete if not

        this.html.suggestions.innerHTML = '';

    }

}

// User Input
function submitUserInput(userInput){
    weather.getCurrent(userInput.value);
    userInput.value = '';
}


/* ---- Main ---- */

const userInputField = document.getElementById('userInputField');
const userInputBtn = document.getElementById('userInputBtn');
const unitsBtn = document.getElementById('unitsBtn');

userInputBtn.addEventListener('click', ()=>{
    submitUserInput(userInputField);
});

userInputField.addEventListener('keydown', (e)=>{
    if(e.key == 'Enter'){submitUserInput(userInputField);}
});

{   
    // This piece of code has the purpose of fetching location suggestions
    // every [interval] ms, only when the input field is on focus, with new text.
    
    const suggestions = document.getElementById('suggestions');

    let inverval = 500; //ms
    let lastInput = '';
    let suggestionInterval;
    
    userInputField.addEventListener('focusin', ()=>{
        
        suggestionInterval = setInterval(()=>{

            if(userInputField.value !== '' && userInputField.value !== lastInput){
                lastInput = userInputField.value;
                geoLocation.getSuggestions(userInputField.value);
            }
            else{
                console.log('-- Interval in effect');
            }
            
        }, inverval);

        suggestions.classList.toggle('hidden');
    });
    
    userInputField.addEventListener('focusout', ()=>{
        clearInterval(suggestionInterval);
        console.log('-- Interval Ended');
        setTimeout(()=>{
            suggestions.classList.toggle('hidden');
        },1000);
    });
}

unitsBtn.addEventListener('click', ()=>{

    unitsBtn.classList.toggle('imperial');
    
    if(units === 'metric'){
        units = 'imperial';
        unitLetter= '°F';
    }else{
        units = 'metric'
        unitLetter= '°C';
    }

    if((lastLat !== 0) && (lastLon !== 0)){
        weather.getCurrent('',lastLat,lastLon,'byCoord');
    }

});