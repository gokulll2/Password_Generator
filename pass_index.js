 const inputSlider = document.querySelector("[data-lengthSlider]");
 const displayLength=document.querySelector("[data-Length]");
 const passwordDisplay=document.querySelector("[data-passwordDisplay]");
 const copyBtn = document.querySelector("[ data-copy]");
 const copyMsg=document.querySelector("[ data-copyMsg]");
 const uppercaseCheck = document.querySelector('#uppercase');
 const lowercaseCheck=document.querySelector('#lowercase');
 const numbersCheck=document.querySelector('#numbers');
 const symbolsCheck=document.querySelector('#symbols');
 const indicator = document.querySelector("[data-indicator]");
 const generateBin = document.querySelector('.generateBtn');
 const allCheckBox=document.querySelectorAll("input[type=checkbox]"); 

 let password="";
 let passwordLength=15;
 let checkCount=1;
handleSlider();
 //set passwordLength
 function handleSlider() {
    inputSlider.value=passwordLength;
    displayLength.innerText=passwordLength;
 }

function setIndicator(color) {
    indicator.style.backgroundColor = color;
    //shadow vala khud karna
}
function getrndInteger(min,max)
{
    return Math.floor(Math.random() * (max-min))+min;
    
}
