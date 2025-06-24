// Get Elements
var expressionDisplay = document.querySelector('.expression');
var resultDisplay = document.querySelector('.mainResult');
var numberButtons = document.querySelectorAll('.table button:not(.actionButton):not(#cButton):not(#delButton):not(#dotButton):not(#equalButton)');
var operatorButtons = document.querySelectorAll('.actionButton');
var clearButton = document.getElementById('cButton');
var deleteButton = document.getElementById('delButton');
var dotButton = document.getElementById('dotButton');
var equalButton = document.getElementById('equalButton');

var currentInput = '';
var previousInput = '';
var operator = '';
var shouldReset = false;

function updateDisplay(value, isResult) {
    if (isResult) {
        resultDisplay.textContent = value;
    } else {
        resultDisplay.textContent = value;
    }
}

// Append numbers
function appendNumber(number) {
    if (shouldReset) {
        currentInput = '';
        shouldReset = false;
    }
    currentInput += number;

    if (operator) {
        resultDisplay.textContent = previousInput + ' ' + operator + ' ' + currentInput;
    } else {
        resultDisplay.textContent = currentInput;
    }
}

// Choose operator
function chooseOperator(op) {
    if (currentInput === '') return;

    if (previousInput !== '') {
        compute();
    }

    operator = op;
    previousInput = currentInput;
    currentInput = '';
    resultDisplay.textContent = previousInput + ' ' + operator;
}

// Perform calculation
function compute() {
    var prev = parseFloat(previousInput);
    var curr = parseFloat(currentInput);
    if (isNaN(prev) || isNaN(curr)) return;

    var result;

    if (operator === '+') {
        result = prev + curr;
    } else if (operator === '-') {
        result = prev - curr;
    } else if (operator === '×') {
        result = prev * curr;
    } else if (operator === '÷') {
        if (curr === 0) {
            alert('Cannot divide by zero!');
            return;
        }
        result = prev / curr;
    } else {
        return;
    }

    // Final result
    expressionDisplay.textContent = previousInput + ' ' + operator + ' ' + currentInput;
    resultDisplay.textContent = result;

    currentInput = result.toString();
    operator = '';
    previousInput = '';
    shouldReset = true;
}

// Clear everything
function clearAll() {
    currentInput = '';
    previousInput = '';
    operator = '';
    shouldReset = false;
    expressionDisplay.textContent = '';
    resultDisplay.textContent = '';
}

// Delete last digit
function deleteLast() {
    currentInput = currentInput.toString().slice(0, -1);
    if (operator) {
        resultDisplay.textContent = previousInput + ' ' + operator + ' ' + currentInput;
    } else {
        resultDisplay.textContent = currentInput;
    }
}

// Append decimal point
function appendDot() {
    if (currentInput.indexOf('.') === -1) {
        currentInput += '.';
        if (operator) {
            resultDisplay.textContent = previousInput + ' ' + operator + ' ' + currentInput;
        } else {
            resultDisplay.textContent = currentInput;
        }
    }
}

// Event Listeners
for (var i = 0; i < numberButtons.length; i++) {
    numberButtons[i].addEventListener('click', function (e) {
        appendNumber(e.target.textContent);
    });
}

for (var j = 0; j < operatorButtons.length; j++) {
    operatorButtons[j].addEventListener('click', function (e) {
        var op = e.target.textContent.trim();

        // Normalization for Unicode minus sign
        if (op === '−') {
            op = '-';
        }

        if (op !== '=') {
            chooseOperator(op);
        }
    });
}

equalButton.addEventListener('click', compute);
clearButton.addEventListener('click', clearAll);
deleteButton.addEventListener('click', deleteLast);
dotButton.addEventListener('click', appendDot);
