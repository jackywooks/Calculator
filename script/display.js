const operationContent = document.querySelector(".result");
const operatorContent = document.querySelector(".displayOperator");

//Display Function
export function displayOperator(operator) {
  operatorContent.textContent = operator;
}

export function displayCalculationResult(number) {
  operationContent.textContent = number;
}

export function getOperatorTextContent(){
    return operatorContent.textContent;
}

export function getOperationTextContent(){
    return operationContent.textContent;
}

export default {displayOperator,displayCalculationResult,getOperatorTextContent,getOperationTextContent};
