console.log('-- script: Starting');

function fLog(message, arg1 = ''){
    // arguments.callee.caller.name is deprecated, use with caution
    let fName = fLog.caller.name;
    console.log(`-+ ${fName}(): ${message}`, arg1);
    console.log('');
}

async function exceedCalls(cityName){
    fLog('Starting');

    try{
        for (let index = 0; index < 100; index++) {
            let fetcher = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=cb8c7a9fae36fb84f17d0b6074bf16b2`);
            
            fLog('fetcher = ', fetcher);
            
            if(fetcher.ok === true){
                fLog('fetcher ok status = true');
            }
            else{
                fLog('fetcher ok status = false');
            }
            
            fLog('for() index =', index);
        }
        

    }
    catch{

    }
}

exceedCalls('london');

