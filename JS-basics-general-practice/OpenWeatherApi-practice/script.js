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
                fetcher = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${input}&units=${units}&appid=${apiKey}`);
            }
            else if(inputType === 'byCoord'){
                fetcher = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`);
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

        document.getElementById('weatherCurrent').style.visibility = 'visible';


        fLog('Ending');
    },

    showCurrent: function(weatherJson){
        // shorthand
        let tag = this.html;

        tag.name.innerText = weatherJson.name+', ';
        tag.description.innerText = weatherJson.weather[0].description;
        tag.visibility.innerText = 'Visibility: '+(weatherJson.visibility)/1000+'Km';
        tag.temp.innerText = weatherJson.main.temp+unitLetter;
        tag.feels_like.innerText = 'Feels Like: '+weatherJson.main.feels_like+unitLetter;
        tag.humidity.innerText = 'Humidity: '+weatherJson.main.humidity+'%';
        tag.lat.innerText = weatherJson.coord.lat+', ';
        tag.lon.innerText = weatherJson.coord.lon;
        
        let iconId = weatherJson.weather[0].icon;
        tag.icon.src =`https://openweathermap.org/img/wn/${iconId}@4x.png`;
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
        let newDivBtn = document.createElement('div');

        let day;
        if(nDay === 0){
            day = 'Today'
        }
        else{
            day = '+'+(nDay * 24)+'hs';
        }

        let rain;
        if(nDayForecast.rain){
            rain = nDayForecast.rain+'mm';
        }
        else{
            rain = 'no data';
        }

        newDiv.classList.add('day', 'clickable');
        newDivBtn.classList.add(`day${nDay}`, 'dayBtn', 'clickable');


        newDiv.innerHTML = `
        
            <p class="date">${day}</p>

            <div class="forecastMain">
                <p class="weatherDescription">
                    <img class ='dayIcon' src="https://openweathermap.org/img/wn/${nDayForecast.weather[0].icon}@4x.png" alt="Weather Icon">
                    ${nDayForecast.weather[0].description}
                </p>
                
                <div class="minMax">
                    <p>Min - Max</p>
                    <p>${nDayForecast.temp.min} / ${nDayForecast.temp.max} ${unitLetter}</p>
                </div>
            </div>
            
            <div class="forecastData">
                <p>Precipitation ${((nDayForecast.pop)*100).toFixed(0)}%</p>
                <p>Rain ${rain}</p>
                <p>Humidity ${nDayForecast.humidity}%</p>
                <p>Cloudiness ${nDayForecast.clouds}%</p>
            </div>

        `;

        newDivBtn.innerHTML = `<p>${day}</p>`

        section.appendChild(newDiv);
        section.appendChild(newDivBtn);
        
        newDivBtn.addEventListener('click',()=>{
            newDiv.classList.toggle('expand')
            newDiv.classList.toggle('shrink')
            if(newDiv.classList.contains('shrink')){
                newDiv.classList.toggle('shrink')
            }
        });
        
        newDiv.addEventListener('click',()=>{
            if(newDiv.classList.contains('expand')){
                newDiv.classList.toggle('expand')
            }
            newDiv.classList.toggle('shrink')
        });

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
            let fetcher = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${input}&limit=10&appid=${apiKey}`);
            
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


        newListItem.classList.add('clickable');
        newListItem.addEventListener('click', ()=>{
            weather.getCurrent('',suggestion.lat,suggestion.lon, 'byCoord');
            weather.getForecast(suggestion.lat, suggestion.lon);
        });

        if(suggestion.country === 'US'){
            newListItem.innerHTML = `
                <div>
                    <p>
                        ${suggestion.name}, ${suggestion.state}. 
                    </p>    
                    <p>
                        ${suggestion.lat}, ${suggestion.lon}.
                    </p>    
                </div>
            `;
        }else{
            newListItem.innerHTML = `
                <div>
                    <p>
                        ${suggestion.name}, ${suggestion.country}. 
                    </p>    
                    <p>
                        ${suggestion.lat}, ${suggestion.lon}.
                    </p>    
                </div>
            `;
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
    geoLocation.clearSuggestions();
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
            else if(userInputField.value === ''){
                geoLocation.clearSuggestions();
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
        },250);
    });
}

unitsBtn.addEventListener('click', ()=>{

    unitsBtn.classList.toggle('imperial');
    userInputBtn.classList.toggle('imperial');
    unitsBtn.classList.toggle('metric');
    userInputBtn.classList.toggle('metric');
    
    if(units === 'metric'){
        units = 'imperial';
        unitLetter= '°F';
        unitsBtn.innerText = '°F';
    }else{
        units = 'metric'
        unitLetter= '°C';
        unitsBtn.innerText = '°C';
    }

    if((lastLat !== 0) && (lastLon !== 0)){
        weather.getCurrent('',lastLat,lastLon,'byCoord');
        weather.getForecast(lastLat,lastLon);
    }

});