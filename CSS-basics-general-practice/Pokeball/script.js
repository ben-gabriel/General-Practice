
let pokeball1 = document.getElementById('pokeballBody1');

let scale = document.getElementById('scale');
let degrees = document.getElementById('degrees');
let seconds = document.getElementById('seconds');

scale.addEventListener('input',(e)=>{
    console.log(scale.value);
    pokeball1.style.setProperty('--scale', scale.value);
});

degrees.addEventListener('input',(e)=>{
    console.log(degrees.value);
    pokeball1.style.setProperty('--degrees', degrees.value + 'deg');
});

seconds.addEventListener('input',(e)=>{
    console.log(seconds.value);
    pokeball1.style.setProperty('--seconds', seconds.value + 's');
});


// setInterval(()=>{

//     pokeball1.style.setProperty('--degrees', degrees+'deg');
    
//     degrees = degrees + 0.3;
    
//     if(degrees > 359){
//         degrees = 0;
//     }

//     console.log('Degrees = ', degrees);

// }, 50);

// pokeball.style.setProperty('--degrees', 360+'deg');

