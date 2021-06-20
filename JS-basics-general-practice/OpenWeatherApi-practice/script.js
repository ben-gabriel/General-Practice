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

    currentWeather: async function (input, country = '', type){
        fLog('Starting');
        
        try {
            
            let fetcher = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${input},${country}&appid=cb8c7a9fae36fb84f17d0b6074bf16b2`);
            const currentJson = await fetcher.json();

        } catch (error) {
            fLog('Error found = ', error);
        }

        fLog('Ending');
    }

}


// http://openweathermap.org/img/wn/10d@2x.png

// https://openweathermap.org/api/geocoding-api

/* Main */
//exceedCalls('banfield',1);