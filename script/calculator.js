// Import modules
import UserInput from "./userInput.js";
import Display from "./display.js";

let firstNumber = null;
let secondNumber = null;
let calculationResult = 0;
let operator = "";
let operators = ["+", "-", "*", "/", "x", "÷", "−", "×"];

//DOM elements definition
const numButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
const equalButton = document.querySelector("#equal");
const clearButton = document.querySelector("#clear");
const decimalButton = document.querySelector("#demical");
const backspaceButton = document.querySelector("#backspace");

//Button Event Listeners
equalButton.addEventListener("click", equal);
clearButton.addEventListener("click", clear);
backspaceButton.addEventListener("click", () => {
  UserInput.removeLastDigit();
  Display.displayCalculationResult(UserInput.getCurrentInput().join(""));
});
decimalButton.addEventListener("click", () => {
  UserInput.setNumber(decimalButton.innerText);
  Display.displayCalculationResult(UserInput.getCurrentInput().join(""));
});
numButtons.forEach((button) =>
  button.addEventListener("click", () => {
    UserInput.setNumber(button.innerText);
    Display.displayCalculationResult(UserInput.getCurrentInput().join(""));
  })
);
operatorButtons.forEach((button) =>
  button.addEventListener("click", () => setOperator(button.innerText))
);

resetCalculationResult();
//Keyboard Support


//Button Function
//EqualButton
function equal() {
  //the equal button will not do anything if the input of second number is not input yet
  if (isEmpty(UserInput.getCurrentInput())) {
    resetOperator();
    return;
  }
  evaluate();
  UserInput.resetUserInput();
  resetOperator();
}

//AC Button
function clear() {
  firstNumber = null;
  secondNumber = null;
  resetCalculationResult();
  resetOperator();
  UserInput.resetUserInput();
}

//Operator Buttons
function setOperator(currentOperator) {
  //if there is no operator in place
  //handle cases of initial input and input after user press equal
  if (Display.getOperatorTextContent() === "") {
    firstNumber = parseFloat(Display.getOperationTextContent());
    operator = currentOperator;
    Display.displayOperator(operator);
  } else if (operators.includes(currentOperator)) {
    //if the input Array is empty, i.e. second number not input, user can change the operator
    if (isEmpty(UserInput.getCurrentInput())) {
      operator = currentOperator;
      Display.displayOperator(operator);
      return;
    }
    evaluate();
    operator = currentOperator;
    Display.displayOperator(operator);
    firstNumber = calculationResult;
  }
  UserInput.resetUserInput();
}

//round answers with long decimals so that they don’t overflow the screen
function roundNumber(number) {
  if (!isNaN(number)) {
    return (number = Math.round(number * 1000) / 1000);
  }
  return number;
}

function resetCalculationResult() {
  calculationResult = 0;
  Display.displayCalculationResult(calculationResult);
}

function resetOperator() {
  operator = "";
  Display.displayOperator(operator);
}

//Helper Function
function isEmpty(obj) {
  for (let item in obj) {
    return false;
  }
  return true;
}

function evaluate() {
  secondNumber = parseFloat(UserInput.getCurrentInput().join(""));
  calculationResult = operate(firstNumber, secondNumber, operator);
  Display.displayCalculationResult(roundNumber(calculationResult));
}

//Calculation Backend Function
let add = (num1, num2) => num1 + num2;
let subtract = (num1, num2) => num1 - num2;
let multiply = (num1, num2) => num1 * num2;
let divide = (num1, num2) => num1 / num2;

let operate = (num1, num2, operator) => {
  switch (operator) {
    case "+":
      return add(num1, num2);
    case "-":
    case "−":
      return subtract(num1, num2);
    case "*":
    case "x":
    case "×":
      return multiply(num1, num2);
    case "/":
    case "÷":
      if (num2 == 0) {
        return "Error, Cannot Divide by 0";
      }
      return divide(num1, num2);
  }
};
