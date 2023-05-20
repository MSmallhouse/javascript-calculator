function add(a, b) {
    return a + b;
}

function subtract (a, b) {
    return a - b;
}

function multiply (a, b) {
    return a * b;
}

function divide (a, b) {
    // Math.round returns nearest whole number, so do this to round to 1 decimal
    return Math.round((a/b) * 10)/10;
}

function operate(operator, a, b) {
    a = parseInt(a);
    b = parseInt(b);
    switch (operator) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case '*':
            return multiply(a, b);
        case '/':
            return divide(a, b);
    }
}

function pressedEquals() {
    firstNumber = operate(operator, firstNumber, secondNumber);
    updateScreen(firstNumber);
    secondNumber = null;
    firstNumberEntered = false;
}

function pressedOperator(valueEntered) {
    if (firstNumberEntered) {
        firstNumber = operate(operator, firstNumber, secondNumber);
        secondNumber = null;
    }
    firstNumberEntered = true;
    operator = valueEntered;
    updateScreen(valueEntered);
}

function clearScreen() {
    updateScreen('0');
    firstNumber = null;
    secondNumber = null;
    firstNumberEntered = false;
    secondNumberEntered = false;
}

function recievePress (event) {
    valueEntered = event.textContent;
    if (valueEntered === '=') pressedEquals();
    else if (valueEntered === 'clear') clearScreen();
    else if ('/*-+'.includes(valueEntered)) pressedOperator(valueEntered);
    else if (!firstNumberEntered) {
        updateFirstNumber(valueEntered);
    }
    else {
        updateSecondNumber(valueEntered);
    }
}

function updateFirstNumber(value) {
    if (!firstNumber) firstNumber = value;
    else firstNumber += value;
    updateScreen(firstNumber);
}

function updateSecondNumber(value) {
    if (!secondNumber) secondNumber = value;
    else secondNumber += value;
    updateScreen(secondNumber);
}

function updateScreen(value) {
    console.log(screen)
    screen.textContent = '';
    screen.textContent = value;
}

let firstNumber;
let secondNumber;
let answer;
let operator;
let firstNumberEntered = false;
let secondNumberEntered = false;

const screen = document.querySelector('.screen div')
const keys = document.querySelectorAll('.key');
const keysArray = Array.from(keys);
keysArray.forEach(element => {
    element.addEventListener('click', () => recievePress(element));
});