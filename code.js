//All the elements from the document section

const historyBtnOn = document.querySelector('.history-button-on');
const historyBtnOff = document.querySelector('.history-button-off');
const historyWindow = document.querySelector('.history-container');
const digitBtns = document.querySelectorAll('button.digit');
const operatorBtns = document.querySelectorAll('button.operator');
const inputField = document.querySelector('.input-container');
const logField = document.querySelector('.log');




//Constants

const operators = ['+', '-', '×', '÷'];




//Event listeners section

historyBtnOn.addEventListener('click', showHistory);

historyBtnOff.addEventListener('click', hideHistory);

[...digitBtns].forEach(btn => {
    btn.addEventListener('click', (e) => {
        if (isDot(e)) addDot();
        else addDigit(e);
    })
});

[...operatorBtns].forEach(btn => {
    btn.addEventListener('click', (e) => {
        if (!isZero()) {
            if (haveOperatorBetween()) {
                if (isLastNumber()) {
                    logField.innerText = inputField.innerText;
                    inputField.innerText = calculate().toString() + ` ${e.target.innerText} `;
                }
            }
            else {
                if (!isPreviousOperator()) {
                    inputField.innerText += ` ${e.target.innerText} `;
                }
            }
        }
    })
})




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
    return element.target.innerText === ',' ? true : false;
}

function isZero() {
    return inputField.innerText === '0' ? true : false;
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
    else {
        if (isPreviousOperator()) {
            inputField.innerText += ` ${e.target.innerText}`;
        }
        else if (isInNumberRange() && isInDecimalPortionRange()) {
            inputField.innerText += e.target.innerText;
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
        console.log(number)
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