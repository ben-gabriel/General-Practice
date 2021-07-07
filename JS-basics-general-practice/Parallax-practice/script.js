// The general idea is that, on scroll down, the images whill
// start going up from the front to the back.
// starting with the flat ones, up to the mountains
// ending with the person victorious in the center as
// in the *idea* picture.
// it would be cool to add in a similar fashion to said image,
// a sun or something in that vein.
// the different layers might have to be in different colors.

// Get images from DOM
const img5 = document.getElementById('img5');
const img4 = document.getElementById('img4');
const img3 = document.getElementById('img3');
const img2 = document.getElementById('img2');
const img1 = document.getElementById('img1');


// Get mainContainer height, updated on resize
let mainContainer = document.getElementById('mainContainer');
let mainContainerHeight = mainContainer.scrollHeight;

window.addEventListener('resize', ()=>{
    mainContainerHeight = mainContainer.scrollHeight;
    console.log('mainContainerHeight height: ', mainContainerHeight);
});


// Calculate a percentage using rule of 3
let pixelsScrolled;
let percentageScrolled;

document.addEventListener('scroll', ()=>{

    
    pixelsScrolled = window.scrollY;

    
    // mainContainerHeight -> 100
    // pixelsScrolled -> percentageScrolled
    // percentageScrolled = (pixelsScrolled * 100)/mainContainerHeight; 
    // (-window.innerHeight because there is an offset)
    percentageScrolled = ruleOfThree((mainContainerHeight-window.innerHeight), 100, pixelsScrolled);


    // Translate the elements in the DOM    
    translateElements(img5,50,percentageScrolled);  // background mountain
    translateElements(img4,100,percentageScrolled); // person to the center
    translateElements(img3,60,percentageScrolled);  // person to the left
    translateElements(img2,40,percentageScrolled);  // person to the right

    console.log('pixelsScrolled: ', pixelsScrolled);
    console.log('percentageScrolled: ', percentageScrolled);
});

function ruleOfThree(arg1, arg2, arg3){
    
    // Rule of three:
    //
    // 10(px) -> 100(%)
    // 5(px) -> ?
    //   ? = (5 * 100)/10 = 50(%) 
    // 
    // arg1 -> arg2
    // arg3 -> x

    let x = (arg3 * arg2)/arg1
    return x
}

function translateElements(element, percentageToFinishAt, percentageScrolled){
    
    let translate = ruleOfThree(percentageToFinishAt, 100, percentageScrolled);
    
    if(translate <= 100){
        element.style.transform = `translateY(-${translate}%)`
    }
    else{
       element.style.transform = `translateY(-${100}%)`    
    }
}