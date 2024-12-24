let calculation=""

 function updatecalculation(value){
   calculation+=value;
    console.log(calculation);
   
   displayCalculation();
 }
    function displayCalculation(){
   document.querySelector('.js-display').innerHTML=calculation

 }
