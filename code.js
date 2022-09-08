const historyBtnOn = document.querySelector('.history-button-on');
const historyBtnOff = document.querySelector('.history-button-off');
const historyWindow = document.querySelector('.history-container');



historyBtnOn.addEventListener('click', () => {
    historyWindow.style.display = 'block';
    historyBtnOff.style.display = 'inline-block';
    historyBtnOn.style.visibility = 'hidden';
});

historyBtnOff.addEventListener('click', () => {
    historyWindow.style.display = 'none';
    historyBtnOff.style.display = 'none';
    historyBtnOn.style.visibility = 'visible';
});