let height = document.getElementById('height');
let width = document.getElementById('width');
let ratio = document.getElementById('ratio');

this.addEventListener('resize', ()=>{
    
    let y = this.innerHeight;
    let x = this.innerWidth;

    height.innerText = `${y}`
    width.innerText = `${x}`

    if(x > y){
        ratio.innerText = ' x > y'
    }else{
        ratio.innerText = ' y > x'

    }




});