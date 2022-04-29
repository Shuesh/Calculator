let operatorArray = [undefined, undefined, undefined];

function initializeButtons(){
    let buttons = document.querySelectorAll('button');
    buttons.forEach(button => button.addEventListener('click', e => dispatch(e, 'button')));
};

function mapKeys(e){
    let key = e.key;
    switch(e.key){
        case 'Backspace':
            key = 'Del';
            break;
        case 'Delete':
            key = 'Del';
            break;
        case 'c':
            key = 'C';
            break;
        case 'Enter':
            key = '=';
            break;
        case '/':
            key = 'div';
            break;
        case '*':
            key = 'mul';
            break;
        case '-':
            key = 'sub';
            break;
        case '+':
            key = 'add';
            break;
    }

    dispatch(key, 'key');
}

function updateDisplay(value){
    document.querySelector("#display > p").textContent = value;
}

function appendNum(display, num){
    if (isNaN(display) && display != '' && display != 'Error! Dividing by 0 is dumb.'){
        operatorArray[1] = display;
        updateDisplay(num);
    }
    else if (display == '' || display == 'Error! Dividing by 0 is dumb.'){
        updateDisplay(num);
    }
    else {
        updateDisplay(`${display}${num}`);
    }
}

function updateOperator(display, operator){
    if (isNaN(display) && display != '' && display != 'Error! Dividing by 0 is dumb.'){
        updateDisplay(operator);
    }
    else if (operatorArray[1] == undefined && display != '' && display != 'Error! Dividing by 0 is dumb.'){
        operatorArray[0] = +display;
        updateDisplay(operator);
    }
    else if (operatorArray[0] != undefined && operatorArray[1] != undefined && display != '' && display != 'Error! Dividing by 0 is dumb.') {
        operatorArray[2] = +display;
        operate();
        updateDisplay(operator);
    }
}

function dispatch (e, type){
    let code;
    if (type == 'button'){
        code = e.target.id;
    }
    else if (type == 'key'){
        code = e;
    }
    let display = document.querySelector('#display > p').textContent;
    switch (code){
        case 'CE':
            updateDisplay('');
            break;
        case 'C':
            updateDisplay('');
            operatorArray = [undefined, undefined, undefined];
            break;
        case 'Del':
            updateDisplay(display.slice(0, display.length-1));
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
            if (!isNaN(display) && display[0] != '-'){
                updateDisplay(`-${display}`);
            }
            else if (!isNaN(display) && display[0] == '-'){
                updateDisplay(display.slice(1,display.length-1));
            }
            break;
        case '0':
            appendNum(display, '0');
            break;
        case '.':
            if (!display.includes('.')){
                if (isNaN(display)){
                    appendNum(display, '0.');
                }
                else{
                    appendNum(display, '.');
                }
            }
            break;
        case '=':
            if (!isNaN(display) && operatorArray[2] == undefined && operatorArray[1] != undefined){
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

function div(a, b){
    if (b == 0){
        operatorArray = [undefined, undefined, undefined];
        return 'div0';
    }
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
    if (result == 'div0'){
        updateDisplay('Error! Dividing by 0 is dumb.');
    }
    operatorArray = [result, undefined, undefined];
}

initializeButtons();
window.addEventListener('keydown', mapKeys);