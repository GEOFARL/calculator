//All the elements from the document section

const historyBtnOn = document.querySelector('.history-button-on');
const historyBtnOff = document.querySelector('.history-button-off');
const historyWindow = document.querySelector('.history-container');
const digitBtns = document.querySelectorAll('button.digit');
const inputField = document.querySelector('.input-container');




//Event listeners section

historyBtnOn.addEventListener('click', showHistory);

historyBtnOff.addEventListener('click', hideHistory);

[...digitBtns].forEach(btn => {
    btn.addEventListener('click', (e) => {
        if (isDot(e)) addDot();
        else addDigit(e);
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
        if (!characters.includes('.'))
            inputField.innerText += '.';
    }
}

function addDigit(e) {
    if (isZero()) {
        inputField.innerText = '';
        inputField.innerText += e.target.innerText;
    }
    else {
        if (isInNumberRange() && isInDecimalPortionRange()) {
            inputField.innerText += e.target.innerText;
        }
    }
}

function isInNumberRange() {
    return Number(inputField.innerText) / Math.pow(10, 13) < 1 ? true : false;
}

function isInDecimalPortionRange() {
    let characters = [...inputField.innerText];
    let indexOfDot = characters.indexOf('.');
    if (indexOfDot === -1) return true;
    if (characters.slice(indexOfDot).length < 8) return true;
    return false;
}