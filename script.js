// DOM elements
const calculatorScreen = document.querySelector('h1');
const inputButtons = document.querySelectorAll('button');
const clearButton = document.getElementById('clearButton');

// Operations object
const calculate = {
  '/': (firstNumber, secondNumber) => firstNumber / secondNumber,
  '*': (firstNumber, secondNumber) => firstNumber * secondNumber,
  '-': (firstNumber, secondNumber) => firstNumber - secondNumber,
  '+': (firstNumber, secondNumber) => firstNumber + secondNumber,
  '=': (firstNumber, secondNumber) => secondNumber,
};

// Global variables
let initialValue = 0;
let operatorValue = '';
let awaitingNextValue = false;

// Show inputs on calculator screen
const screenInput = function (input) {
  // If the operator is pressed, accept another input
  if (awaitingNextValue) {
    calculatorScreen.textContent = input;
    awaitingNextValue = false;
    // Show one digit and multiple digit numbers
  } else {
    calculatorScreen.textContent =
      calculatorScreen.textContent === '0'
        ? input
        : calculatorScreen.textContent + input;
  }
};

// Clear all functionality
const clearAll = function () {
  // Clear screen
  calculatorScreen.textContent = '0';
  // Clear global variables
  initialValue = 0;
  operatorValue = '';
  awaitingNextValue = false;
};

// Add decimal point functionality
const addDecimalPoint = function () {
  // Don't accept decimal after the operator has been pressed
  if (awaitingNextValue) return;
  // Don't accept multiple decimals points in one number
  if (!calculatorScreen.textContent.includes('.'))
    calculatorScreen.textContent = `${calculatorScreen.textContent}.`;
};

// Operator functionality
const useOperator = function (operator) {
  // Do not allow operator to be pushed multiple times
  if (operatorValue && awaitingNextValue) {
    operatorValue = operator;
    return;
  }
  // Convert input to number
  const currentValue = Number(calculatorScreen.textContent);
  // Assign the first input number to initial value
  if (!initialValue) {
    initialValue = currentValue;
    // Do the math using the initial value and the current value; update result to screen
  } else {
    const result = calculate[operatorValue](initialValue, currentValue);
    calculatorScreen.textContent = result;
    initialValue = result;
  }
  // Ready for next value
  operatorValue = operator;
  awaitingNextValue = true;
};

// Event listeners for all buttons
inputButtons.forEach(button => {
  if (button.classList.length === 0) {
    button.addEventListener('click', () => screenInput(button.value));
  } else if (button.classList.contains('operator')) {
    button.addEventListener('click', () => useOperator(button.value));
  } else if (button.classList.contains('decimal')) {
    button.addEventListener('click', addDecimalPoint);
  }
});

// Event listener for the clear function
clearButton.addEventListener('click', clearAll);
