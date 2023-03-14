const billAmount = document.querySelector("#bill");
const numberOfPeople = document.getElementById("people");
const customTipPercentage = document.getElementById("custom");
const billTipAmount = document.getElementById("tipAmount");
const billTotalPerPerson = document.getElementById("total");
const resetButton = document.getElementById("resetBtn");
const buttons = document.querySelectorAll(".tip-btns button");
const error = document.querySelector(".error");

let percent = 0;

billAmount.addEventListener("input", (e) => {
  let billNum = e.target.value;
  if (percent > 0 && billNum > 0 && numberOfPeople.value > 0) {
    calculateTip(
      parseFloat(billNum),
      parseInt(percent),
      parseInt(numberOfPeople.value)
    );
  }

  if (parseInt(billNum) < 0 || isNaN(billNum)) {
    
    document.querySelector("#message").innerHTML =
      "please use positive numbers";
  } else {
    document.querySelector("#message").innerHTML = "";
  }

  if (billNum >= 100000000) {
    document.querySelector("#message").innerHTML = "bill can't be this big";
  }
});

numberOfPeople.addEventListener("input", (e) => {
  let peopleNum = e.target.value;

  if (numberOfPeople.value == 0) {
    error.style.display = "block";
  } else {
    error.style.display = "none";
  }

  console.log(percent);
  console.log(billAmount.value);
  console.log(peopleNum);

  if (percent > 0 && billAmount.value > 0 && peopleNum > 0) {
    calculateTip(
      parseFloat(billAmount.value),
      parseInt(percent),
      parseInt(peopleNum)
    );
  }
});


// the action that happens when the percent buttons are clicked
buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    let tipvalue = e.target.innerText;
    tipvalue = tipvalue.substr(0, tipvalue.length - 1);
    percent = parseInt(e.target.innerText);

    if (billAmount.value === "") return;

    if (numberOfPeople.value === "") {
      numberOfPeople.value = 1;
    }

    calculateTip(
      parseFloat(billAmount.value),
      parseInt(tipvalue),
      parseInt(numberOfPeople.value)
    );

    clickHandler(e);
  });
});

buttons.forEach(function (val) {
  val.addEventListener("click", clickHandler);
});

function clickHandler(event) {
  buttons.forEach(function (val) {
    val.classList.remove("active");
    if (event.target.innerHTML == val.innerHTML) {
      val.classList.add("active");
    }
  });
}

// the action that happens when we use custom input
customTipPercentage.addEventListener("input", (e) => {
  let customNum = e.target.value;

  if (billAmount.value === "") {
    resetEverything();
    return;
  }

  if (numberOfPeople.value === "") {
    numberOfPeople.value = 1;
  }

  if (percent > 0 && billNum > 0 && numberOfPeople.value > 0) {
    calculateTip(
      parseFloat(billAmount.value),
      parseInt(e.target.value),
      parseInt(numberOfPeople.value)
    );
  }

  if (parseInt(customNum) < 0) {
    document.querySelector(".error-msg").innerHTML = "use positive numbers";
  } else {
    document.querySelector(".error-msg").innerHTML = "";
  }
});

// main function of calculation
function calculateTip(billAmount, tipPercentage, numberOfPeople) {
  let tipAmount = (billAmount * (tipPercentage / 100)) / numberOfPeople;
  let tip = Math.floor(tipAmount * 100) / 100;
  tip = tip.toFixed(2);

  let totalAmount = (tipAmount * numberOfPeople + billAmount) / numberOfPeople;
  totalAmount = totalAmount.toFixed(2);

  billTipAmount.innerHTML = `$${tip}`;
  billTotalPerPerson.innerHTML = `$${totalAmount}`;
}

function variation() {
  if (billAmount.value === "") {
    alert("please fill bill input value");
    resetEverything();
    return;
  }
  if (numberOfPeople.value === "") {
    numberOfPeople.value = 1;
  }
}

resetButton.addEventListener("click", resetEverything);

// fuction that resets every input and output
function resetEverything() {
  billTipAmount.innerHTML = "$0.00";
  billTotalPerPerson.innerHTML = "$0.00";
  billAmount.value = "";
  numberOfPeople.value = "";
  customTipPercentage.value = "";
}
