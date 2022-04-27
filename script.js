let operatorArray = [undefined, undefined, undefined];

function initializeButtons (){
    let buttons = document.querySelectorAll('button');
    buttons.forEach(button => button.addEventListener('click', e => dispatch(e)));
};

function updateDisplay(value){
    document.querySelector("#display > p").textContent = value;
}

function appendNum(display, num){
    if (isNaN(display) && display != ''){
        operatorArray[1] = display;
        updateDisplay(num);
    }
    else if (display == ''){
        updateDisplay(num);
    }
    else {
        updateDisplay(`${display}${num}`);
    }
}

function updateOperator(display, operator){
    if (isNaN(display)){
        updateDisplay(operator);
    }
    else {
        operatorArray[0] = +display;
        updateDisplay(operator);
    }
}

function dispatch (e){
    let pressed = e.target.id;
    let display = document.querySelector('#display > p').textContent;
    switch (pressed){
        case '%':
            break;
        case 'CE':
            updateDisplay('');
            break;
        case 'C':
            updateDisplay('');
            operatorArray = [undefined, undefined, undefined];
            break;
        case 'Del':
            updateDisplay(display.slice(0, display.length-2));
            break;
        case 'x_inv':
            break;
        case 'x^2':
            break;
        case 'sqrt':
            break;
        case 'div':
            updateOperator(display, '/');
            break;
        case '7':
            appendNum(display, '7');
            break;
        case '8':
            appendNum(display, '8');
            break;
        case '9':
            appendNum(display, '9');
            break;
        case 'mul':
            updateOperator(display, '*');
            break;
        case '4':
            appendNum(display, '4');
            break;
        case '5':
            appendNum(display, '5');
            break;
        case '6':
            appendNum(display, '6');
            break;
        case 'sub':
            updateOperator(display, '-');
            break;
        case '1':
            appendNum(display, '1');
            break;
        case '2':
            appendNum(display, '2');
            break;
        case '3':
            appendNum(display, '3');
            break;
        case 'add':
            updateOperator(display, '+');
            break;
        case 'neg':
            break;
        case '0':
            appendNum(display, '0');
            break;
        case '.':
            if (isNaN(display)){
                appendNum(display, '0.');
            }
            else{
                appendNum(display, '.');
            }
            break;
        case '=':
            if (!isNaN(display) && operatorArray[2] == undefined){
                operatorArray[2] = +display;
                operate();
            }
            break;   
    }
}

function add(a, b){
    return a + b;
}

function sub(a, b){
    return a - b;
}

function mul(a, b){
    return a * b;
}

//Implement a check to make sure no /0
function div(a, b){
    return a / b;
}

function operate(){
    let result;
    switch (operatorArray[1]){
        case '+':
            result = add(operatorArray[0], operatorArray[2]);
            break;
        case '-':
            result = sub(operatorArray[0], operatorArray[2]);
            break;
        case '*':
            result = mul(operatorArray[0], operatorArray[2]);
            break;
        case '/':
            result = div(operatorArray[0], operatorArray[2]);
            break;
    }
    updateDisplay(result);
    operatorArray = [result, undefined, undefined];
}

initializeButtons();