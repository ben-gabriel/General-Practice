// callback function practice
//
// A callback is a function passed as an argument to another function
// this technique allows a function to call another function
// a callback function can run after another function has finished
//
// setTimeout(function, milliseconds, param1, param2, ...)

function myCallBack (n){
    console.log("this is the message number " + n);
}

// setTimeout(()=>{
//     myCallBack(1);
// },3000);

// setTimeout(myCallBack, 2000, 2);

 myCallBack(3);


const myPromise = new Promise((resolve, reject) =>{
    const rand = Math.floor(Math.random()*2);
    const cond = true;

    if (rand === 0){
        resolve(", success message");
    }else{
        reject(", error message");
    }
    
});

myPromise
    .then(() => console.log("Success"))
    .catch(() => console.log('Error'));

myPromise
    .then((msg) => {myCallBack(4 + msg)})
    .catch((err) => {myCallBack(5 + err)});

const myAsync = async () => {
    try {
        const awaitVar = await myPromise;
        myCallBack(6 + awaitVar);
    } catch (error) {
        myCallBack(7 + error);       
    }
}

myAsync();  