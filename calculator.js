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

    const addButton = function(name, label){
        const buttonAction = function(event){
            const clickedButton = event.target.id;
            if( Number(clickedButton) >= 0 && Number(clickedButton) <= 9 ){
                buffer = (buffer === '0') ? clickedButton : buffer + clickedButton;
            }
            updateDisplay();
        };
        const newButton = document.createElement("button");
        newButton.textContent = (label)? label: name;
        newButton.id = name;
        newButton.classList.add("button");
        newButton.addEventListener('click', (e) => buttonAction(e));
        buttons.appendChild(newButton);
    };

    for(let i=0; i<=9; i++){
        addButton(i);
    }
    addButton("=");
    addButton("+");
    addButton("-");
    addButton("*", "×");
    addButton("/", "÷");
    addButton("clear", "Clear");
}

calculator();
