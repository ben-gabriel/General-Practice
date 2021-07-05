const navBar = document.querySelector('nav');
const sections = document.querySelectorAll('section');

let options = {
    root: null,
    rootMargin: "0px",
    threshold: 0
}

const observer = new IntersectionObserver((entries)=>{
    entries.forEach(entry =>{
        console.log(entry);
    });
},options);

console.log(sections);
// observer.observe(sections);

