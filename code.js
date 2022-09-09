//All the elements from the document section

const historyBtnOn = document.querySelector('.history-button-on');
const historyBtnOff = document.querySelector('.history-button-off');
const historyWindow = document.querySelector('.history-container');
const allBtns = document.querySelectorAll('button');
const digitBtns = document.querySelectorAll('button.digit');
const operatorBtns = document.querySelectorAll('button.operator');
const inputField = document.querySelector('.input-container');
const logField = document.querySelector('.log');
const allClearBtn = document.querySelector('button.else');
const clearEntryBtn = document.querySelector('button.clear');
const plusMinusBtn = document.querySelector('button.minus');
const historyLog = document.querySelector('.history-text');




//Variable

const operators = ['+', '-', '×', '÷', '*', '/'];
let toggled = false;
let historyCount = 1;




//Event listeners section

historyBtnOn.addEventListener('click', showHistory);

historyBtnOff.addEventListener('click', hideHistory);

[...digitBtns].forEach(btn => {
    btn.addEventListener('click', addDigitDot);
    btn.addEventListener('touchcancel', addDigitDot);
});

[...operatorBtns].forEach(btn => {
    btn.addEventListener('click', addOperator);
    btn.addEventListener('touchcancel', addOperator);
})

allClearBtn.addEventListener('click', clearAll);
allClearBtn.addEventListener('touchcancel', clearAll);

clearEntryBtn.addEventListener('click', clearEntry);
clearEntryBtn.addEventListener('touchcancel', clearEntry);

plusMinusBtn.addEventListener('click', togglePlusMinus);
plusMinusBtn.addEventListener('touchcancel', togglePlusMinus);

//Keyboard support
[...allBtns].forEach(btn => {
    addEventListener('keydown', addKey);
});;


//Keyboard support
[...allBtns].forEach(btn => {
    addEventListener('keydown', addKey);
    // Practicing git commit --amend, nothing spacial 
});;




//Functions section

function showHistory() {
    historyWindow.style.display = 'block';
    historyBtnOff.style.display = 'inline-block';
    historyBtnOn.style.visibility = 'hidden';
}

function hideHistory() {
    historyWindow.style.display = 'none';
    historyBtnOff.style.display = 'none';
    historyBtnOn.style.visibility = 'visible';
}

function isDot(element) {
    return element.target.innerText === ',';
}

function isZero() {
    return inputField.innerText === '0';
}

function addDot() {
    if (!isZero()) {
        let characters = [...inputField.innerText];
        if (haveOperatorBetween()) {
            let startIndex = characters.lastIndexOf(" ") + 1;
            if (!operators.includes(characters[startIndex])) {
                if (!characters.slice(startIndex).includes('.')) {
                    inputField.innerText += '.';
                }
            }
        }
        else {
            if (!characters.includes('.')) inputField.innerText += '.';
        }
    }
}

function addDigit(e) {
    if (isZero()) {
        inputField.innerText = '';
        inputField.innerText += e.target.innerText;
    }
    else if (!isZero() && !(logField.innerText !== '' && !haveOperatorBetween())) {
        if (isPreviousOperator()) {
            if (toggled) {
                inputField.innerText += `${e.target.innerText}`;
                toggled = false;
            }
            else {
                inputField.innerText += ` ${e.target.innerText}`;
            }
        }
        else if (isInNumberRange() && isInDecimalPortionRange()) {
            inputField.innerText += e.target.innerText;
        }
    }
}

function addDigitKeyboard(e) {
    if (isZero()) {
        inputField.innerText = '';
        inputField.innerText += e.key;
    }
    else if (!isZero() && !(logField.innerText !== '' && !haveOperatorBetween())) {
        if (isPreviousOperator()) {
            if (toggled) {
                inputField.innerText += `${e.key}`;
                toggled = false;
            }
            else {
                inputField.innerText += ` ${e.key}`;
            }
        }
        else if (isInNumberRange() && isInDecimalPortionRange()) {
            inputField.innerText += e.key;
        }
    }
}

function isInNumberRange() {
    let characters = [...inputField.innerText];
    let number = Number(inputField.innerText);
    if (haveOperatorBetween()) {
        let startIndex = characters.lastIndexOf(" ") + 1;
        if (operators.includes(characters[startIndex])) return true;
        number = Number(characters.slice(startIndex).join(''));
    }
    return number / Math.pow(10, 9) < 1;
}

function isInDecimalPortionRange() {
    let characters = [...inputField.innerText];
    if (haveOperatorBetween()) {
        let indexOfDot = characters.lastIndexOf('.');
        let indexofSpace = characters.lastIndexOf(' ');
        if (indexOfDot < indexofSpace) return true;
        if (characters.slice(indexOfDot).length > 5) return false;
        return true;
    }
    else {
        let indexOfDot = characters.indexOf('.');
        if (indexOfDot === -1) return true;
        if (characters.slice(indexOfDot).length > 5) return false;
        return true;
    }
}

function haveOperatorBetween() {
    let characters = [...inputField.innerText];
    let isContain = false;
    let indexOfCharacter = 0;
    characters.forEach(character => {
        if (operators.includes(character)) {
            indexOfCharacter = characters.indexOf(character, indexOfCharacter);
            if (!(indexOfCharacter === 0 || isNaN(characters[indexOfCharacter - 2]))) {
                isContain = true;
                operator = character
            }
            indexOfCharacter++;
        }
    });
    return isContain;
}

function isPreviousOperator() {
    let characters = [...inputField.innerText];
    return operators.includes(characters[characters.length - 1]) ? true : false;
}

function isLastNumber() {
    let characters = [...inputField.innerText];
    return isNaN(characters[characters.length - 1]) ? false : true;
}

function calculate() {
    let characters = [...inputField.innerText];
    let endOfFirstNumber = characters.indexOf(' ');
    let startOfSecondNumber = characters.lastIndexOf(' ') + 1;
    let firstNumber = Number(characters.slice(0, endOfFirstNumber).join(''));
    let secondNumber = Number(characters.slice(startOfSecondNumber).join(''));
    let indexOfOperator = endOfFirstNumber + 1;
    let operatorCharacter = characters[indexOfOperator];
    let operator;

    operatorCharacter === '+' ? operator = '+'
        : operatorCharacter === '-' ? operator = '-'
            : operatorCharacter === '×' ? operator = '*'
                : operator = '/';

    let result;
    if (secondNumber === 0 && operator === '/') return 'Error'

    if (operator === '+') result = firstNumber + secondNumber;
    if (operator === '-') result = firstNumber - secondNumber;
    if (operator === '*') result = firstNumber * secondNumber;
    if (operator === '/') result = firstNumber / secondNumber;

    if (Number.isInteger(result)) return result;
    return parseFloat(result.toFixed(5));
}

function addDigitDot(e) {
    if (isDot(e)) addDot();
    else addDigit(e);
}

function addOperator(e) {
    if (!isZero()) {
        if (haveOperatorBetween()) {
            if (isLastNumber()) {
                logField.innerText = inputField.innerText;
                if (e.target.innerText === '=') {
                    if (calculate() === 'Error') {
                        inputField.innerText = 'Error';
                        disableButtons();
                    }
                    else {
                        if (calculate() / Math.pow(10, 9) < 1) {
                            inputField.innerText = String(calculate());
                        }
                        else {
                            inputField.innerText = 'Error';
                        }
                    }
                }
                else {
                    if (calculate() === 'Error') {
                        inputField.innerText = 'Error';
                        disableButtons();
                    }
                    else {
                        if (calculate() / Math.pow(10, 9) < 1) {
                            inputField.innerText = String(calculate()) + ` ${e.target.innerText} `;
                        }
                        else {
                            inputField.innerText = 'Error';
                        }
                    }
                }
                if (historyCount === 1) historyLog.innerText = '';
                let inputText = [...inputField.innerText];
                if ((isNaN(inputText[inputText.length - 1]) && (inputText[inputText.length - 1] !== 'r'))) {
                    inputText.splice(inputText.length - 1, 2);
                }
                historyLog.innerHTML += `<div><span style="display: inline-flex; justify-content: center;align-items: center; font-weight: 900; border: 1px solid black; border-radius: 50%; padding: 2px 8px;">${historyCount}.</span>  ${logField.innerText} = ${inputText.join('')}</div>`;
                historyCount++;
            }
        }
        else {
            if (!isPreviousOperator() && e.target.innerText !== '=') {
                inputField.innerText += ` ${e.target.innerText} `;
            }
        }
    }
}

function addOperatorKeyboard(e) {
    if (!isZero()) {
        if (haveOperatorBetween()) {
            if (isLastNumber()) {
                logField.innerText = inputField.innerText;
                if (e.key === '=' || e.key === 'Enter') {
                    if (calculate() === 'Error') {
                        inputField.innerText = 'Error';
                        disableButtons();
                    }
                    else {
                        if (calculate() / Math.pow(10, 9) < 1) {
                            inputField.innerText = String(calculate());
                        }
                        else {
                            inputField.innerText = 'Error';
                        }
                    }
                }
                else {
                    if (calculate() === 'Error') {
                        inputField.innerText = 'Error';
                        disableButtons();
                    }
                    else {
                        if (calculate() / Math.pow(10, 9) < 1) {
                            let operator = e.key;
                            if (e.key === '*') operator = '×';
                            if (e.key === '/') operator = '÷';
                            inputField.innerText = String(calculate()) + ` ${operator} `;
                        }
                        else {
                            inputField.innerText = 'Error';
                        }
                    }
                }
                if (historyCount === 1) historyLog.innerText = '';
                let inputText = [...inputField.innerText];
                if ((isNaN(inputText[inputText.length - 1]) && (inputText[inputText.length - 1] !== 'r'))) {
                    inputText.splice(inputText.length - 1, 2);
                }
                historyLog.innerHTML += `<div><span style="display: inline-flex; justify-content: center;align-items: center; font-weight: 900; border: 1px solid black; border-radius: 50%; padding: 2px 8px;">${historyCount}.</span>  ${logField.innerText} = ${inputText.join('')}</div>`;
                historyCount++;
            }
        }
        else {
            if (!isPreviousOperator() && e.key !== '=') {
                if (inputField.innerText === 'Error') disableButtons();
                else {
                    let operator = e.key;
                    if (e.key === '*') operator = '×';
                    if (e.key === '/') operator = '÷';
                    inputField.innerText += ` ${operator} `;
                }
            }
        }
    }
}

function disableButtons() {
    buttons = [...allBtns];
    buttons.forEach(button => {
        button.removeEventListener('click', addDigitDot);
        button.removeEventListener('click', addOperator);
        button.removeEventListener('keypress', addDigitKeyboard);
        button.removeEventListener('keypress', addOperatorKeyboard);
    });
}

function clearAll() {
    inputField.innerText = '0';
    logField.innerText = '';
    [...digitBtns].forEach(btn => {
        btn.addEventListener('click', addDigitDot);
    });

    [...operatorBtns].forEach(btn => {
        btn.addEventListener('click', addOperator);
    });
}

function clearEntry() {
    let characters = [...inputField.innerText];
    if (!isZero() && !(logField.innerText !== '' && !haveOperatorBetween())) {
        if (isLastNumber()) {
            if (characters.length > 1) {
                inputField.innerText = characters.splice(0, characters.length - 1).join('');
            }
            else {
                inputField.innerText = '0';
            }
        }
        else if (isPreviousOperator()) {
            inputField.innerText = characters.splice(0, characters.length - 2).join('');
        }
        else if (characters[characters.length - 1] === ' ') {
            inputField.innerText = characters.splice(0, characters.length - 3).join('');
        }
    }
}

function togglePlusMinus() {
    let characters = [...inputField.innerText];
    if (!isZero() && !(logField.innerText !== '' && !haveOperatorBetween())) {
        if (haveOperatorBetween()) {
            let indexOfSpace = characters.indexOf(' ');
            if (characters[indexOfSpace + 2] === undefined) {
                inputField.innerText += ' -';
                toggled = true;
            }
            else if (characters[indexOfSpace + 3] === '-') {
                characters.splice((indexOfSpace + 3), 1);
                inputField.innerText = characters.join('');
            }
            else {
                characters.splice(indexOfSpace + 3, 0, '-');
                inputField.innerText = characters.join('');
            }
        }
        else {
            if (!(characters[0] === '-')) {
                characters.unshift('-');
                inputField.innerText = characters.join('');
            }
            else {
                characters.splice(0, 1);
                inputField.innerText = characters.join('');
            }
        }
    }
}

function addKey(e) {
    if (!isNaN(e.key)) {
        addDigitKeyboard(e);
    }
    else if (e.key === '+' || e.key === '-' || e.key === '/' || e.key === '*' || e.key === '=' || e.key === 'Enter') {
        addOperatorKeyboard(e);
    }
    else if (e.key === ',') {
        addDot();
    }
    else if (e.key === '_') {
        togglePlusMinus();
    }
    else if (e.key === 'c' || e.key === 'Backspace') {
        clearEntry()
    }
    else if (e.key === 'C') {
        clearAll();
    }
}