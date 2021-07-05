const root = document.documentElement;
const sections = document.querySelectorAll('section');

let options = {
    root: null,
    rootMargin: "0px",
    threshold: 1
}

const observer = new IntersectionObserver((entries)=>{
    entries.forEach(entry =>{
        console.log(`${entry.target.id} is intersecting = ${entry.isIntersecting}`);
        console.log(entry);

        if(entry.target.id === 'main' && entry.isIntersecting === true){
            root.style.setProperty('--a-color', 'var(--color-orange)')
        }
        
        if(entry.target.id === 'description' && entry.isIntersecting === true){
            root.style.setProperty('--a-color', 'var(--color-darkblue)')
        }else{
            root.style.setProperty('--a-color', 'var(--color-orange)')
        }
        


    });
    

},options);

sections.forEach(section =>{
    observer.observe(section);
});

console.log(root)