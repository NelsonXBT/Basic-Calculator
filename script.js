const resultDisplay = document.querySelector('.result');
const numberButtons = document.querySelectorAll('.table button:not(.actionButton):not(#cButton):not(#delButton):not(#dotButton)');
const operatorButtons = document.querySelectorAll('.actionButton');
const clearButton = document.getElementById('#cButton');
const deleteButtton = document.getElementById('#delButton');
const dotButton = document.getElementById('#dotButton');


const currentInput = '';
const previousInput = '';
const operator = '';
const shouldReset = false;



// Update the display
function updateDisplay(value) {
    resultDisplay.textContent = value;
}

// Append numbers
function appendNumber(number) {
    if (shouldReset) {
        currentInput = '';
        shouldReset = false;
    }
    currentInput += number;
    updateDisplay(currentInput);
}