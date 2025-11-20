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
        const formatter = new Intl.NumberFormat('ja-JP');
        const splitBuffer = buffer.split('.');
        const integerPart = formatter.format(Number(splitBuffer[0]));
        if( buffer.includes('.') ){
            const fractionalPart = buffer.split('.')[1];
            display.textContent = integerPart+'.'+fractionalPart;
        } else {
            display.textContent = integerPart;
        }
    }

    const clickNumber = function(clickedButton){
        buffer = (buffer === '0') ? clickedButton : buffer + clickedButton;
        updateDisplay();
    }
    const clickDot = function(clickedButton){
        if( buffer.includes('.') ) return;
        buffer = (buffer === '0' || buffer === '') ? '0.' : buffer + '.';
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
    const clickBackspace = function(clickedButton){
        buffer = buffer.slice(0, buffer.length-1);
        updateDisplay();
    }

    const addButton = function(callback, name, label){
        const newButton = document.createElement("button");
        newButton.textContent = (label)? label: name;
        newButton.type = "button";
        newButton.name = name;
        newButton.classList.add("button");
        newButton.addEventListener('click', (e) => callback(e.target.name));
        buttons.appendChild(newButton);
    };

    for(let i=0; i<=9; i++){
        addButton(clickNumber, i);
    }
    addButton(clickDot, ".");
    addButton(clickOperator, "+");
    addButton(clickOperator, "-");
    addButton(clickOperator, "*", "×");
    addButton(clickOperator, "/", "÷");
    addButton(clickEqual, "=");
    addButton(clickBackspace, "backspace", "BS");
    addButton(clickClear, "clear", "Clear");
    
    document.addEventListener("keydown", (e) =>{
        if( Number(e.key) >= 0 && Number(e.key) <= 9 ) clickNumber(e.key);
        else if( e.key === '.' ) clickDot(e.key);
        else if( 
                e.key === '+' ||
                e.key === '-' ||
                e.key === '*' ||
                e.key === '/' 
            ) clickOperator(e.key);
        else if( e.key === 'Enter' ) clickEqual('=');
        else if( e.key === 'Backspace' ) clickBackspace('backspace');
        else if( e.key === 'Delete' ) clickClear('clear');
    });
}

calculator();
