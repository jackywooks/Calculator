let firstNumber = null;
let secondNumber = null;
let result = 0;
let operator = "";
let inputArray = [];
const numButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
const equalButton = document.querySelector("#equal");
const clearButton = document.querySelector("#clear");
const decimalButton = document.querySelector("#demical");
const backspaceButton = document.querySelector("#backspace");
const operationContent = document.querySelector(".result");
const operatorContent = document.querySelector(".displayOperator");

equalButton.addEventListener("click", evaluate);
clearButton.addEventListener("click", clear);
backspaceButton.addEventListener("click",removeLastDigit)
decimalButton.addEventListener("click", () => setNumber(decimalButton.innerText));
numButtons.forEach((button) =>
  button.addEventListener("click", () => setNumber(button.innerText))
);
operatorButtons.forEach((button) =>
  button.addEventListener("click", () => setOperator(button.innerText))
);

resetResult();

function evaluate() {
  secondNumber = parseFloat(inputArray.join(""));
  result = operate(firstNumber, secondNumber, operator);
  displayResult(roundNumber(result));
  resetOperator();
}

function setNumber(currentNumber) {
  inputArray.push(currentNumber);
  displayResult(inputArray.join(""));
}

function removeLastDigit(){
  inputArray.pop();
  displayResult(inputArray.join(""));
}

function clear() {
  firstNumber = null;
  secondNumber = null;
  resetResult();
  resetOperator();
  inputArray = [];
}

function resetResult() {
  result = 0;
  displayResult(result);
}

function resetOperator() {
  operator = "";
  displayOperator(operator);
}

function setOperator(currentOperator) {
  //if there is no operator in place
  //handle cases of initial input and input after user press equal
  if (operatorContent.textContent === "") {
    firstNumber = parseFloat(operationContent.textContent);
    operator = currentOperator;
    displayOperator(operator);
  } else {
    secondNumber = parseFloat(inputArray.join(""));
    result = operate(firstNumber, secondNumber, operator);
    displayResult(result);
    operator = currentOperator;
    displayOperator(operator);
  }
  inputArray = [];
}

function displayOperator(operator) {
  operatorContent.textContent = operator;
}

function displayResult(number) {
  operationContent.textContent = number;
}

//round answers with long decimals so that they don’t overflow the screen
function roundNumber(number){
  return number = Math.round(number * 1000) / 1000;
}

// function setOperator(currentOperator) {
//   if (currentOperator == "AC") {
//
//   } else if (currentOperator == "=") {
//     result = operate(firstNumber, secondNumber, operator);
//     displayResult(result);
//     firstNumber = result;
//   } else if (operators.includes(currentOperator)) {
//     if (firstNumber === null) {
//       firstNumber = parseFloat(inputArray.join(""));
//       operator = currentOperator;
//     } else {
//       secondNumber = parseFloat(inputArray.join(""));
//       console.log(secondNumber);
//       result = operate(firstNumber, secondNumber, operator);
//       displayResult(result);
//       firstNumber = result;
//       operator = currentOperator;

//     inputArray = [];
//   }
// }
// }

let add = (num1, num2) => num1 + num2;
let subtract = (num1, num2) => num1 - num2;
let multiply = (num1, num2) => num1 * num2;
let divide = (num1, num2) => num1 / num2;

let operate = (num1, num2, operator) => {
  switch (operator) {
    case "+":
      return add(num1, num2);
    case "-":
      return subtract(num1, num2);
    case "*":
    case "x":
      return multiply(num1, num2);
    case "/":
    case "÷":
      if (num2 == 0) {
        return "Error, Cannot Divide by 0";
      }
      return divide(num1, num2);
  }
};

// handle multiple input of operator, number must follow by input, and input must follow by number > disable? > no, change the operator only if second pressed
//disable the decimal button if there’s already one in the display)
//backspace
//keyboard support
