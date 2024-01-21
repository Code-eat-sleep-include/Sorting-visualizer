arrSize = 75;
delayNum = 500;

// Algorithms

async function bubbleSort(arr){

    let n = arr.length;
    
    for(let i=0; i<n; i++){
        for(let j=0; j<n-1-i; j++){

            const h1 = parseInt(arr[j].getAttribute("heightnum"))
            const h2 = parseInt(arr[j+1].getAttribute("heightnum"))            

            arr[j].classList.add("selected")
            arr[j+1].classList.add("selected")

            let tempC = arr[j].style.backgroundColor, tempC2 = arr[j+1].style.backgroundColor;

            arr[j].style.backgroundColor = "red";
            arr[j+1].style.backgroundColor = "red";

            await delay(delayNum);           

            if(h1 > h2){
                let tempH = arr[j].style.height;
                arr[j].style.height = arr[j+1].style.height;
                arr[j+1].style.height = tempH; 

                arr[j].style.backgroundColor = "blue";
                arr[j+1].style.backgroundColor = "blue";

                let tempA = parseInt(arr[j].getAttribute("heightnum"));
                arr[j].setAttribute("heightnum", `${parseInt(arr[j+1].getAttribute("heightnum"))}`);
                arr[j+1].setAttribute("heightnum", `${tempA}`);

                await delay(delayNum);  

                arr[j].style.backgroundColor = tempC2;
                arr[j+1].style.backgroundColor = tempC;


            }   
            
            else{

                await delay(delayNum);  

                arr[j+1].style.backgroundColor = tempC2;
                arr[j].style.backgroundColor = tempC;
            }                      

            arr[j].classList.remove("selected")
            arr[j+1].classList.remove("selected")
        }
    }   

}

async function partition(arr, start, end){
    
    const last = parseInt(arr[end].getAttribute("heightnum"))
              

    arr[end].classList.add("selected")
    

    let tempC = arr[end].style.backgroundColor;

    arr[end].style.backgroundColor = "black";
    
    let low = start-1;

    // let last = arr[end];

    for(let i = start; i<end; i++){        

        let tempC1 = arr[i].style.backgroundColor, tempC2 = arr[low+1].style.backgroundColor;
        arr[i].classList.add("selected")        
        arr[i].style.backgroundColor = "red";

        await delay(delayNum);

        const h = parseInt(arr[i].getAttribute("heightnum"))  
        if(h<last){
            low++;   
            
            let tempC4 = arr[low].style.backgroundColor;
            
            arr[low].classList.add("selected");
            arr[low].style.backgroundColor = "blue";
            arr[i].style.backgroundColor = "blue";

            await delay(delayNum);

            arr[low].classList.remove("selected");
            arr[low].style.backgroundColor = tempC4;

            let tempH = arr[i].style.height;
            arr[i].style.height = arr[low].style.height;
            arr[low].style.height = tempH; 

            arr[i].classList.remove("selected");
            arr[i].style.backgroundColor = tempC2;
            arr[low].style.backgroundColor = tempC1;

            let tempA = parseInt(arr[i].getAttribute("heightnum"));
            arr[i].setAttribute("heightnum", `${parseInt(arr[low].getAttribute("heightnum"))}`);
            arr[low].setAttribute("heightnum", `${tempA}`);            
        }

        else{
            await delay(delayNum);
            arr[i].classList.remove("selected");
            arr[i].style.backgroundColor = tempC1;
        }

    }

    await delay(delayNum);

    arr[end].classList.remove("selected")
    arr[end].style.backgroundColor = tempC;

    let tempH = arr[low + 1].style.height;
    arr[low + 1].style.height = arr[end].style.height;
    arr[end].style.height = tempH; 

    let tempA = parseInt(arr[low + 1].getAttribute("heightnum"));
    arr[low + 1].setAttribute("heightnum", `${parseInt(arr[end].getAttribute("heightnum"))}`);
    arr[end].setAttribute("heightnum", `${tempA}`);    
    
    return (low + 1);
}

async function quickSort(arr, start, end){

    if(start >= end) return;

    let part = await partition(arr, start, end);

    await quickSort(arr, start, part-1);
    await quickSort(arr, part+1, end);

}

async function merge(arr, start, mid, end){

    let L = [], R = [], LC = [], RC = [], arrC = [];

    // copy info
    for(let i = start; i<=mid; i++){
        L.push(parseInt(arr[i].getAttribute("heightnum")));
    }
    for(let i = start; i<=mid; i++){
        LC.push(arr[i].style.backgroundColor);
    }

    for(let i = mid+1; i<=end; i++){
        R.push(parseInt(arr[i].getAttribute("heightnum")));
    }
    for(let i = mid+1; i<=end; i++){
        RC.push(arr[i].style.backgroundColor);
    }   

    //change color
    for(let i = start; i<=end; i++){
        arr[i].style.backgroundColor = "green";
    }


    //sort 
    let i = 0, j = 0, k = start;    

    while(i<L.length && j<R.length){

        arr[k].classList.add("selected");
        await delay(delayNum);

        if(L[i] < R[j]){            
            arr[k].setAttribute("heightnum", `${L[i]}`);
            arr[k].style.height = `${L[i]}px`;
            arrC.push(LC[i]);
            i++;            
        }
        else{            
            arr[k].setAttribute("heightnum", `${R[j]}`);
            arr[k].style.height = `${R[j]}px`;
            arrC.push(RC[j]);
            j++;            
        }

        arr[k].classList.remove("selected");

        k++;
    }

    while(i<L.length){

        arr[k].classList.add("selected");
        await delay(delayNum);

        arr[k].setAttribute("heightnum", `${L[i]}`);
        arr[k].style.height = `${L[i]}px`;
        arrC.push(LC[i]);
        i++;

        arr[k].classList.remove("selected");

        k++;        
    }
    while(j<R.length){

        arr[k].classList.add("selected");
        await delay(delayNum);

        arr[k].setAttribute("heightnum", `${R[j]}`);
        arr[k].style.height = `${R[j]}px`;
        arrC.push(RC[j]);
        j++;

        arr[k].classList.remove("selected");

        k++;        
    }    

    let c = 0;
    for(let x = start; x<=end; x++){
        arr[x].style.backgroundColor = arrC[c];
        c++;
    }

}

async function mergeSort(arr, start, end){

    if(start >= end) return;

    let mid = parseInt(start + (end-start)/2);

    console.log(mid);    

    await mergeSort(arr, start, mid);    

    await mergeSort(arr, mid+1, end);

    await merge(arr, start, mid, end);

}

// Utils

function delay(n){
    return new Promise((res, rej) => {
        setTimeout(()=>{
            res();
        }, n);
    })
}

function randomNum (range, offset = 0){
    return Math.floor(Math.random()*range + offset);
}

function randColor (){
    
    let r = randomNum(255, 40);
    let g = randomNum(255, 20);
    let b = randomNum(255, 40);

    return `rgb(${r}, ${g}, ${b})`;

}

function createArr(n){

    const main = document.querySelector(".space");

    for(let i=0; i<n; i++){
        const temp = document.createElement("span");
        temp.classList.add("bar");
        temp.style.width = "30px";    
        
        let h = randomNum(500, 50);

        temp.style.height = `${h}px`;
        temp.setAttribute("heightnum", `${h}`);
        temp.style.backgroundColor = `${randColor()}`;

        main.appendChild(temp);
    }
}


// Event Listeners

const slider = document.getElementById("myRange");

slider.oninput = function() {
    delayNum = Math.abs(this.value - 1000);
}

const bubble = document.querySelector(".bubble");
bubble.addEventListener("click", (e)=>{    
    e.preventDefault();
    bubbleSort(arr);
})

const arrC = document.querySelector(".arrC");
arrC.addEventListener("click", (e)=>{
    e.preventDefault();
    const temp = document.querySelectorAll(".bar");
    for(let i of temp){
        i.remove();
    }
    createArr(arrSize);
    arr = document.querySelectorAll("span");

    slider.value = 500;
    delayNum = 500;

})

const quick = document.querySelector(".quick");
quick.addEventListener("click", (e)=>{
    e.preventDefault();
    quickSort(arr, 0, arrSize-1);
})

const mergeB = document.querySelector(".merge");
mergeB.addEventListener("click", (e)=>{
    e.preventDefault();
    mergeSort(arr, 0, arrSize-1);
})

// Test

let arr1 = [10, 45, 89, 10, 1, -45, -2, 14, 0, 565, 32];

function printArr(arr){
    let n = arr.length;

    for(let i=0; i<n; i++){
        console.log(arr[i]);
    }

}

createArr(arrSize);
let arr = document.querySelectorAll("span");
