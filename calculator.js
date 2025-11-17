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


let numberA, numberB, operator;

const operate = function(operator, numberA, numberB){
    switch(operator){
        case "+":
            return add(numberA, numberB);
        case "-":
            return subtract(numberA, numberB);
        case "*":
            return multiply(numberA, numberB);
        case "/":
            return divide(numberA, numberB);
        default:
            return false;
    }
}