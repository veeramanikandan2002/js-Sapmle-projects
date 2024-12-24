let form=document.getElementById("form");
let nameinput=document.getElementById('name')
let emailinput=document.getElementById('email');
let passwordinput=document.getElementById('password');
let confirmpassinput=document.getElementById('confirmpass');
let submited=document.getElementById('submited')
form.addEventListener('submit',function(event){
    event.preventDefault();
    if(nameinput.value==""||emailinput.value==""||passwordinput.value==""|| confirmPass()!==passwordinput.value){
        
        userName()
        userEmail()
        userpassword()
        confirmPass()
    }

    else{
       
        submited.textContent="sucessfully submitted";
        
      form.reset()
    }
  
    
})


function userName() {
    let checkstr=/^[A-Za-z]+$/;
    let namepara = document.getElementById("name-p");
    
    let namecount=nameinput.value.split('');
    let count=0;
    for(let i=0;i<namecount.length;i++){
        count++
    }
    
    if (!checkstr.test(nameinput.value)||count<3) {
      namepara.textContent="enter  the correct name";
     nameinput.style.border="1px solid red"
    }
    else{
        submited.textContent="";
        namepara.textContent=" ";
        nameinput.style.border="";
        return nameinput.value;
    }
}

function userEmail(){
     
   let emailvalitade=/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/; 
  
       let emailcheck=document.getElementById("email-p");
       if(!emailvalitade.test(emailinput.value)){
         emailcheck.textContent="enter the correct email";
         emailinput.style.border="1px solid  red"
       }
       else{
           emailcheck.textContent="";
             emailinput.style.border=""
      return emailinput.value;
       }
   }

   function userpassword(){
    let passwordCheck=document.getElementById("password-p");
    let passValue= passwordinput.value.split('');
    let count=0
    for(let i=0;i<passValue.length;i++){
        count++
    }
    if(count<6){
        passwordCheck.textContent="enter the 6 charcter";
        passwordinput.style.border="1px solid  red"
    }
    else{//
        passwordCheck.textContent="";
        passwordinput.style.border=""
        return passwordinput.value
    }
   }

   function confirmPass(){
    let conformpasssCheck=document.getElementById("conformpass-p")
    if(confirmpassinput.value!==userpassword()){
        conformpasssCheck.textContent="enter the correct password";
        confirmpassinput.style.border="1px solid  red"
    }
    else{
         conformpasssCheck.textContent="";
         confirmpassinput.style.border=""
        return confirmpassinput.value
    }
   }



