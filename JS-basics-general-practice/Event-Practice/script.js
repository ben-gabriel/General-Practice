// The purpose of this script is to practice the use of event driven
//  actions, the main idea is to have a button which when clicked,
//  triggers a change in color on the child number 2.
// An interesting way to expand this idea in the future, would be 
//  to make the change between colors a fading transtition, or similar.


const child1 = document.getElementById('c1');
const child2 = document.getElementById('c2');
const btn = document.getElementById('btn');
const g_btn = document.getElementById('ghost-btn');

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function changeColor(element, n1, n2, n3){
    element.style.background = `rgb(${n1},${n2},${n3})`;
}

function changeColorRandom(element){

    let n1 = getRandomInt(255);
    let n2 = getRandomInt(255);
    let n3 = getRandomInt(255);

    element.style.background = `rgb(${n1},${n2},${n3})`;
}

//btn.addEventListener('click', () => {changeColorRandom(child2)});
btn.addEventListener('click', changeColorRandom.bind(null,child2));

btn.addEventListener('mouseup', () => {
    g_btn.focus();
});

//element.setInterval(myCallback, *miliseconds, 'Parameter 1', 'Parameter 2');
setInterval(() => {
    changeColorRandom(child1);
}, 1000); //miliseconds
