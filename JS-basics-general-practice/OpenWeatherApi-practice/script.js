console.log('script: Starting');

function logs(message){
    let fName = logs.caller.name;
    console.log(`-+ ${fName}(): ${message}`);
}

function getFuncName() {
    return getFuncName.caller.name
}


async function exceedCalls(cityName){
    // console.log('exceedCalls: Starting');
    logs('test');

    // exceedCalls('london');

    console.log(this);

    try{
//        let fetcher = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=cb8c7a9fae36fb84f17d0b6074bf16b2`)
        //console.log('exceedCalls: fetcher = ', fetcher);

        if(fetcher.ok === true){
            
        }

    }
    catch{

    }
}

// logs('test');
exceedCalls('london');
