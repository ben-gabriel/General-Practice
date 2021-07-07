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
    
    // Rule of three:
    //
    // 10(px) -> 100(%)
    // 5(px) -> ?
    //   ? = (5 * 100)/10 = 50(%) 
    // 
    // mainContainerHeight -> 100
    // pixelsScrolled -> percentageScrolled
    //   percentageScrolled = (pixelsScrolled * 100)/mainContainerHeight 
    
    pixelsScrolled = window.scrollY;

    // percentageScrolled = (pixelsScrolled * 100)/mainContainerHeight; 
    // (-window.innerHeight because there is an offset)
    percentageScrolled = Math.round((pixelsScrolled * 100)/(mainContainerHeight-window.innerHeight));
    

    // Translate the elements in the DOM

    // backgroudn mountain
    img5.style.transform = `translateY(-${percentageScrolled}%)`
    
    // person to the center
    if(percentageScrolled*2 <= 100){
        img4.style.transform = `translateY(-${percentageScrolled*2}%)`
    }else{
        img4.style.transform = `translateY(-${100}%)`
    }
    
    // person to the left
    if(percentageScrolled*3 <= 100){
        img3.style.transform = `translateY(-${percentageScrolled*3}%)`
    }else{
        img3.style.transform = `translateY(-${100}%)`
    }

    // person to the right
    if(percentageScrolled*4 <= 100){
        img2.style.transform = `translateY(-${percentageScrolled*4}%)`
    }else{
        img2.style.transform = `translateY(-${100}%)`
    }

    // front ground
    if(percentageScrolled*5 <= 100){
        img1.style.transform = `translateY(-${percentageScrolled*5}%)`
    }else{
        img1.style.transform = `translateY(-${100}%)`
    }

    console.log('pixelsScrolled: ', pixelsScrolled);
    console.log('percentageScrolled: ', percentageScrolled);
});

