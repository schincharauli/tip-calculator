const billAmount = document.getElementById("bill");
const numberOfPeople = document.getElementById("people");
const customTipPercentage = document.getElementById("custom");
const billTipAmount = document.getElementById("tipAmount");
const billTotalPerPerson = document.getElementById("total");
const resetButton = document.getElementById("resetBtn");
const buttons = document.querySelectorAll(".tip-btns button");


// the action that happens when the percent buttons are clicked
buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
        let tipvalue = e.target.innerText;
        tipvalue = tipvalue.substr(0, tipvalue.length - 1);

        if(billAmount.value === "") return;
        if(numberOfPeople.value === "") numberOfPeople.value = 1;

        calculateTip(
            parseFloat(billAmount.value),
            parseInt(tipvalue),
            parseInt(numberOfPeople.value)
        );
    })
})


// the action that happens when we use custom input
customTipPercentage.addEventListener("input", (e) => {
    if(billAmount.value === ""){
        resetEverything();
        return;
    }
    
   if(numberOfPeople.value === "") {
        numberOfPeople.value = 1;
    }
        
    calculateTip(
        parseFloat(billAmount.value),
        parseInt(e.target.value),
        parseInt(numberOfPeople.value)
    );
})


// main function of calculation
function calculateTip(billAmount, tipPercentage, numberOfPeople){
    let tipAmount = (billAmount * (tipPercentage / 100)) / numberOfPeople;
    let tip = Math.floor(tipAmount * 100) / 100;
    tip = tip.toFixed(2);
       

    let totalAmount = (tipAmount * numberOfPeople + billAmount) / numberOfPeople;
    totalAmount = totalAmount.toFixed(2);

    billTipAmount.innerHTML = `$${tip}`;
    billTotalPerPerson.innerHTML = `$${totalAmount}`;
}   



resetButton.addEventListener("click", resetEverything);


// fuction that resets every input and output
function resetEverything(){
    billTipAmount.innerHTML = "$0.00";
    billTotalPerPerson.innerHTML = "$0.00";
    billAmount.value = "";
    numberOfPeople.value = "";
    customTipPercentage.value = "";
}


