
document.getElementById('containerBox').style.position = 'absolute';

document.getElementById('positionChangerBtn').onclick = changePositioning;

function changePositioning() {
    
    classToModify = document.getElementById('containerBox');

    let containerPosition = classToModify.style.position;
    
    console.log("container position -> ", containerPosition);
    
    if(containerPosition === 'absolute'){
        classToModify.style.position = 'static';
        document.getElementById("text").innerHTML = 'Static';
    }
    else if(containerPosition === 'static'){
        classToModify.style.position = 'absolute';
        document.getElementById("text").innerHTML = "Absolute";
    }

}    




