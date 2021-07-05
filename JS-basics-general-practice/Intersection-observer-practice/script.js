const navBar = document.querySelector('nav');
const sections = document.querySelectorAll('section');

let options = {
    root: null,
    rootMargin: "0px",
    threshold: 1
}

const observer = new IntersectionObserver((entries)=>{
    entries.forEach(entry =>{
        console.log(entry);
        // entry.target.classList.toggle('');    
    });
    

},options);

sections.forEach(section =>{
    observer.observe(section);
});

