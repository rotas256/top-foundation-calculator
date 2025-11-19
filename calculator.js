const add = function(a, b) {
    return a + b;
}

const subtract = function(a, b) {
    return a - b;
}

const multiply = function(a, b) {
    return a * b;
}

const divide = function(a, b) {
    if( b === 0 ) return NaN;
    return a / b;
}

const operate = function(op, a, b){
    switch(op){
        case "+":
            return add(a, b);
        case "-":
            return subtract(a, b);
        case "*":
            return multiply(a, b);
        case "/":
            return divide(a, b);
        default:
            return false;
    }
}

const calculator = function(){
    const calculator = document.querySelector("#calculator");
    const display = document.querySelector("#display");
    const buttons = document.querySelector("#buttons");
    let numberA = null;
    let numberB = null;
    let operator = '';
    let buffer = '';

    const updateDisplay = function(){
        display.textContent = (buffer === '') ? '0' : buffer;
    }

    const clickNumber = function(clickedButton){
        buffer = (buffer === '0') ? clickedButton : buffer + clickedButton;
        updateDisplay();
    }
    const clickOperator = function(clickedButton){
        if( numberA === null ){
            numberA = Number(buffer);
            buffer = '';
            operator = clickedButton;
        } else {
            if( buffer === '' ){
                operator = clickedButton;
            } else {
                numberB = Number(buffer);
                buffer = String(operate(operator, numberA, numberB));
                updateDisplay();
                numberA = Number(buffer);
                buffer = '';
                numberB = null;
                operator = clickedButton;
            }
        }
    }
    const clickEqual = function(clickedButton){
        if(operator === '') return;
        numberB = Number(buffer);
        buffer = String(operate(operator, numberA, numberB));
        updateDisplay();
        numberA = null;
        operator = '';
        numberB = null;
        buffer = '';
    }
    const clickClear = function(clickedButton){
        numberA = null;
        numberB = null;
        operator = '';
        buffer = '';
        updateDisplay();
    }

    const addButton = function(callback, name, label){
        const newButton = document.createElement("button");
        newButton.textContent = (label)? label: name;
        newButton.id = name;
        newButton.classList.add("button");
        newButton.addEventListener('click', (e) => callback(e.target.id));
        buttons.appendChild(newButton);
    };

    for(let i=0; i<=9; i++){
        addButton(clickNumber, i);
    }
    addButton(clickEqual, "=");
    addButton(clickOperator, "+");
    addButton(clickOperator, "-");
    addButton(clickOperator, "*", "×");
    addButton(clickOperator, "/", "÷");
    addButton(clickClear, "clear", "Clear");
}

calculator();
