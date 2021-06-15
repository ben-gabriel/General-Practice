const hamburger = document.querySelector('.hamburger');
const navList = document.getElementById('navList');

hamburger.addEventListener('click', ()=>{
    navList.classList.toggle('open')
});