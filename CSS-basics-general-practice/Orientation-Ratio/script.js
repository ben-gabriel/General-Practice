let height = document.getElementById('height');
let width = document.getElementById('width');

this.addEventListener('resize', ()=>{
    
    let h = this.innerHeight;
    let w = this.innerWidth;

    height.innerText = `${h}`
    width.innerText = `${w}`


});