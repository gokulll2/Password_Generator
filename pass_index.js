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
const symbols='~`!@#$%^&*()_-+={[}]|:;"<,>.?/';
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
function generateRandomInteger(){
    return getrndInteger(0,9);
} 
function generateLowerCase(){
    return String.fromCharCode(getrndInteger(97,123));

}
function generateUpperCase()
{
    return String.fromCharCode(getrndInteger(65,91));
}
function generateSymbols()
{
      const randNum=getrndInteger(0,symbols.length);
      return symbols.charAt[randNum];
}
function calculateStrength() {
     let hasUpper=false;
     let hasNum=false;
     let hasLower=false;
     let hasSymbol=false;

     if(uppercaseCheck.checked)
     {
        hasUpper=true;
     }
     if(lowercaseCheck.checked)
     {
        hasLower=true;
     }
     if(numbersCheck.checked)
     {
        hasNum=true;
     }
     if(symbolsCheck.checked)
     {
        hasSymbol=true;
     }
     if(hasUpper && hasLower && (hasNum || hasSymbol) && passwordLength>=8)
     {
        setIndicator('#0f0');
     }
     else if((hasUpper||hasLower) && (hasNum||hasSymbol) && passwordLength>=5)
     {
        setIndicator('#ff0');
     }
     else{
        setIndicator('#f00'); 
     }
}

 async function copyContent() {
   try{
      await navigator.clipboardtext.writeText(passwordDisplay.value);
      copyMsg.innerText="copied";
   }
   catch(e)
   {
    copyMsg.innerText="Failed";
   }

   //to make copy vala span visible

   copyMsg.classList.add('Active');
   setTimeout( () => {
    copyMsg.classList.remove("Active");
   },2000);
    
}
inputSlider.addEventListener('input' , (e) =>{
    passwordLength=e.target.value;
    handleSlider();
})
function generatePassword() {
      
}
