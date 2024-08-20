const buttons = document.querySelectorAll('.btn');
const inputDisplay = document.getElementById('input-display');
const resultDisplay = document.getElementById('result-display');
const equalButton = document.getElementById('equal');
const clearButton = document.getElementById('clear');

let currentInput = '';
let operator = '';
let previousInput = '';
let resultDisplayed = false;

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.getAttribute('data-value');

        // Handle number input or decimal point
        if (!isNaN(value) || value === '.') {
            if (resultDisplayed) {
                // If a result was just displayed, start fresh with new input
                currentInput = value;
                resultDisplayed = false;
            } else {
                currentInput += value; // Append number to current input
            }
            inputDisplay.value = currentInput; // Display only the current input
        } 
        // Handle operator input
        else if (['+', '-', '*', '/'].includes(value)) {
            if (currentInput !== '') {
                if (previousInput === '') {
                    // Move currentInput to previousInput if no previous input
                    previousInput = currentInput;
                } else if (!resultDisplayed) {
                    // If continuing calculation, perform calculation
                    previousInput = calculate(previousInput, operator, currentInput).toString();
                    resultDisplay.value = previousInput;
                }
                operator = value; // Set the operator
                currentInput = ''; // Clear the current input
                inputDisplay.value = previousInput + ' ' + operator; // Show first number and operator
            } else if (resultDisplayed) {
                // If result was displayed and operator pressed, use result as previous input
                operator = value;
                inputDisplay.value = previousInput + ' ' + operator; // Display result and operator
                resultDisplayed = false;
            }
        }
    });
});

// Handle equal button
equalButton.addEventListener('click', () => {
    if (currentInput !== '' && previousInput !== '' && operator !== '') {
        const result = calculate(previousInput, operator, currentInput);
        inputDisplay.value = previousInput + ' ' + operator + ' ' + currentInput; // Display full equation
        resultDisplay.value = result; // Display result

        // Reset inputs for next calculation
        previousInput = result.toString(); // Make result the new previous input
        currentInput = ''; // Clear current input
        operator = ''; // Clear operator
        resultDisplayed = true; // Mark result as displayed
    }
});

// Handle clear button
clearButton.addEventListener('click', () => {
    // Clear all values and reset the display
    currentInput = '';
    previousInput = '';
    operator = '';
    inputDisplay.value = '';
    resultDisplay.value = '';
    resultDisplayed = false;
});

// Calculation function
function calculate(num1, op, num2) {
    const number1 = parseFloat(num1);
    const number2 = parseFloat(num2);

    switch (op) {
        case '+':
            return number1 + number2;
        case '-':
            return number1 - number2;
        case '*':
            return number1 * number2;
        case '/':
            return number1 / number2;
        default:
            return 0;
    }
}
