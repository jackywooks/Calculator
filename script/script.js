let firstNumber = null;
let secondNumber = null;
let result = 0;
let operator = "";
let operators = ["+", "-", "*", "/", "x", "÷"];
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
backspaceButton.addEventListener("click", removeLastDigit);
decimalButton.addEventListener("click", () =>
  setNumber(decimalButton.innerText)
);
numButtons.forEach((button) =>
  button.addEventListener("click", () => setNumber(button.innerText))
);
operatorButtons.forEach((button) =>
  button.addEventListener("click", () => setOperator(button.innerText))
);

resetResult();

function evaluate() {
  //the function will not do anything if the input of second number is not input yet
  if (isEmpty(inputArray)) {
    return;
  }
  secondNumber = parseFloat(inputArray.join(""));
  result = operate(firstNumber, secondNumber, operator);
  displayResult(roundNumber(result));
  inputArray = [];
  resetOperator();
}

function setNumber(currentNumber) {
  inputArray.push(currentNumber);
  displayResult(inputArray.join(""));
}

function removeLastDigit() {
  //the function will not do anything if the input of second number is not input yet
  if (isEmpty(inputArray)) {
    return;
  }
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
  } else if (operators.includes(currentOperator)) {
    //if the input Array is empty, i.e. second number not input, user can change the operator
    if (isEmpty(inputArray)) {
      operator = currentOperator;
      displayOperator(operator);
      return;
    }
    secondNumber = parseFloat(inputArray.join(""));
    result = operate(firstNumber, secondNumber, operator);
    displayResult(roundNumber(result));
    firstNumber = result;
    operator = currentOperator;
    displayOperator(operator);
  }
  inputArray = [];
}

function isEmpty(obj) {
  for (let item in obj) {
    return false;
  }
  return true;
}

function displayOperator(operator) {
  operatorContent.textContent = operator;
}

function displayResult(number) {
  operationContent.textContent = number;
}

//round answers with long decimals so that they don’t overflow the screen
function roundNumber(number) {
  if (!isNaN(number)) {
    return (number = Math.round(number * 1000) / 1000);
  }
  return number;
}

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

//disable the decimal button if there’s already one in the display)
//backspace
//keyboard support
