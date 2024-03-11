let firstNumber = null;
let secondNumber = null;
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
    times = 0;
    displayContent.textContent = 0;
  } else if (currentOperator == "=") {
    result = operate(firstNumber, secondNumber, operator);
    displayContent.textContent = result;
  } else if (operators.includes(currentOperator)) {
    if (firstNumber === null) {
      firstNumber = parseFloat(inputArray.join(""));
    } else if (secondNumber === null){
        operator = currentOperator;
      secondNumber = parseFloat(inputArray.join(""));
      firstNumber = operate(firstNumber, secondNumber, operator);
      displayContent.textContent = firstNumber;
    }else{
        secondNumber = parseFloat(inputArray.join(""));
        firstNumber = operate(firstNumber, secondNumber, operator);
        operator = currentOperator;
        displayContent.textContent = firstNumber;
  
    }
  }
  inputArray = [];
}
