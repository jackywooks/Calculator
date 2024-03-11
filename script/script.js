let firstNumber = null;
let secondNumber = null;
let result = 0;
let operator = "";
let inputArray = [];
let numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
let operators = ["+", "-", "*", "x", "/", "÷"];
const displayContent = document.querySelector(".display p");
displayContent.textContent = 0;

let isEmpty = (array) => {
  for (value in array) {
    return false;
  }
  return true;
};

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

const numButtons = document.querySelectorAll(".number-container button");
numButtons.forEach((button) =>
  button.addEventListener("click", () => {
    setNumber(button.innerText);
  })
);

const operatorButtons = document.querySelectorAll(".operator-container button");
operatorButtons.forEach((button) =>
  button.addEventListener("click", () => {
    setOperator(button.innerText);
  })
);

function setNumber(currentNumber) {
  inputArray.push(currentNumber);
  displayContent.textContent = inputArray.join("");
}

function setOperator(currentOperator) {
  if (currentOperator == "AC") {
    firstNumber = null;
    inputArray = [];
    displayContent.textContent = 0;
  } else if (currentOperator == "=") {
    result = operate(firstNumber, secondNumber, operator);
    displayContent.textContent = result;
    firstNumber = result;
  } else if (operators.includes(currentOperator)) {
    if (firstNumber === null) {
      firstNumber = parseFloat(inputArray.join(""));
      operator = currentOperator;
    } else {
      secondNumber = parseFloat(inputArray.join(""));
      console.log(secondNumber);
      result = operate(firstNumber, secondNumber, operator);
      displayContent.textContent = result;
      firstNumber = result;
      operator = currentOperator;
    }
    inputArray = [];
  }
}

//You should round answers with long decimals so that they don’t overflow the screen.
// handle multiple input of operator, number must follow by input, and input must follow by number > disable? > no, change the operator only if second pressed
//disable the decimal button if there’s already one in the display)
//backspace
//keyboard support