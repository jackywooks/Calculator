let currentInput = [];
//Numpad
export function setNumber(currentNumber) {
  //disable the decimal button if there’s already one decimal point in the display)
  if (currentInput.includes(".") && currentNumber == ".") {
    return;
  }
  //add a leading zero if the first input is "."
  if (currentNumber == "." && isEmpty(currentInput)) {
    currentInput.push("0");
  }
  currentInput.push(currentNumber);
}

//Backspace Button
export function removeLastDigit() {
  //the backspace will not do anything if the input of second number is not input yet
  if (isEmpty(currentInput)) {
    return 0;
  }
  currentInput.pop();
  return 1;
}

export function resetUserInput(){
    currentInput = [];
}

export function getCurrentInput(){
    return currentInput;
}

//Helper Function
function isEmpty(obj) {
  for (let item in obj) {
    return false;
  }
  return true;
}

export default { setNumber, removeLastDigit, getCurrentInput, resetUserInput};
