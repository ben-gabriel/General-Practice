const root = document.documentElement;
const sections = document.querySelectorAll('section');

let options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.5
}

const observer = new IntersectionObserver((entries)=>{
    entries.forEach(entry =>{
        console.log(`${entry.target.id} is intersecting = ${entry.isIntersecting}`);
        // console.log(entry);

        let main = (entry.target.id === 'main' && entry.isIntersecting === true);
        let description = (entry.target.id === 'description' && entry.isIntersecting === true);
        let end = (entry.target.id === 'end' && entry.isIntersecting === true);

        if(main){
            root.style.setProperty('--a-color', 'var(--color-orange)')
        }
        
        if(description && !main){
            root.style.setProperty('--a-color', 'var(--color-darkblue)')
        }
       
        if(end && !description){
            root.style.setProperty('--a-color', 'var(--color-pink)')
        }
        


    });
    

},options);

sections.forEach(section =>{
    observer.observe(section);
});

console.log(root)