let passInput=document.getElementById("password-input");
let passwordProgress=document.getElementById("second-prog");

function passWordChecker(){
   let count=0;

   let widthprog=[ "10%","25%","50%","75%","85%","100%"]
   let progcolor=["red","orange","yellow","blue","green"]


    if(passInput.value.length>3){
    
     let arrRegex=[/[0-9]/, /[a-z]/, /[A-Z]/, /[^0-9a-zA-Z]/]
     arrRegex.forEach((item)=>{
          if(item.test(passInput.value)){
            count++
          }

     })
   }

   passwordProgress.style.width=widthprog[count];
   passwordProgress.style.backgroundColor=progcolor[count]
   
}