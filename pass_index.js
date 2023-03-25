 const inputSlider = document.querySelector("[data-lengthSlider]");
 const displayLength=document.querySelector("[data-Length]");
 const passwordDisplay=document.querySelector("[data-passwordDisplay]");
 const copyBtn = document.querySelector("[ data-copy]");
 const copyMsg=document.querySelector("[ data-copyMsg]");
 const uppercaseCheck = document.querySelector("#uppercase");
 const lowercaseCheck=document.querySelector("#lowercase");
 const numbersCheck=document.querySelector("#numbers");
 const symbolsCheck=document.querySelector("#symbols");
 const indicator = document.querySelector("[data-indicator]");
 const generateBtn = document.querySelector(".generateButton");
 const allCheckBox=document.querySelectorAll("input[type=checkbox]"); 
const symbols='~`!@#$%^&*()_-+={[}]|:;"<,>.?/';

 let password="";
 let passwordLength=10;
 let checkCount=0;
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
      return symbols.charAt(randNum);
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
        setIndicator("#0f0");
     }
     else if((hasUpper||hasLower) && (hasNum||hasSymbol) && passwordLength>=5)
     {
        setIndicator("#ff0");
     }
     else{
        setIndicator("#f00"); 
     }
}

 async function copyContent() {
   try{
      await navigator.clipboard.writeText(passwordDisplay.value);
      copyMsg.innerText="copied";
   }
   catch(e)
   {
    copyMsg.innerText="Failed";
   }

   //to make copy vala span visible

   copyMsg.classList.add("active");
   setTimeout( () => {
    copyMsg.classList.remove("active");
   },2000);
    
}


inputSlider.addEventListener('input' , (e) =>{
    passwordLength=e.target.value;
    handleSlider();
})


copyBtn.addEventListener('click' , () =>{
if(passwordDisplay.value)
{
    copyContent();
}
})
 
function handlecheckboxChange()
{
    checkCount=0;
    allCheckBox.forEach((checkbox) =>{
        if(checkbox.checked)
        {
            checkCount++;
        }
    });
    //special condition
    if(passwordLength<checkCount)
    {
        passwordLength=checkCount;
        handleSlider();
    }
}


allCheckBox.forEach( (checkbox) =>{
    checkbox.addEventListener('change' , handlecheckboxChange);
}); 
function shufflePassword(array)
{
    //FISHER YATES METHOD

    for(let i=array.length-1;i>0;i--)
    {
        const j=Math.floor(Math.random()* (i+1));
        const temp=array[i];
        array[i]=array[j];
        array[j]=temp;
    }
    let str="";
    array.forEach((el) => (str += el));
    return str;

    
}
generateBtn.addEventListener('click' , () =>{
       //none of the check box are selected
       if(checkCount==0)
       {
        return;
       }
       if(passwordLength<checkCount)
       {
        passwordLength=checkCount;
        handleSlider();
       }

       //lets start the journey to find the new password
       console.log("starting the joureny");
       //remove old password
       password="";

    //    lets put the stuff mentioned by checkboxes

    // if(uppercaseCheck.checked)
    // {
    //     password+=generateUpperCase();
    // }
    // if(lowercaseCheck.checked)
    // {
    //     password+=generateLowerCase();
    // }
    // if(numbersCheck.checked)
    // {
    //     password+=generateBtn();
    // }
    // if(symbolsCheck.checked)
    // {
    //     password+=generateSymbols();
    // }
    let funcArr=[];
    
    if(uppercaseCheck.checked)
    {
        funcArr.push(generateUpperCase);
    }
    if(lowercaseCheck.checked)
    {
        funcArr.push(generateLowerCase);
    }
    if(numbersCheck.checked) 
    {
        funcArr.push(generateRandomInteger);
    }
    if(symbolsCheck.checked)
    {
        funcArr.push(generateSymbols);
    }
    //compulsory addition

    for(let i=0;i<funcArr.length;i++)
    {
        password+=funcArr[i]();
    }

    console.log("Compulsory addition done");
    //remaining addition

    for(let i=0;i<passwordLength-funcArr.length;i++)
    {
        let randIndex=getrndInteger(0,funcArr.length);
        console.log("randIndex" + randIndex);
        password+=funcArr[randIndex]();
    }

    console.log("Remaining addition done");
    //shuffle the passwword

    password=shufflePassword(Array.from(password));

    //show in UI

    passwordDisplay.value=password;

    console.log("UI addition done");
    //calculate strength

    calculateStrength();

});
