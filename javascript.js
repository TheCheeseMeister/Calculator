const buttonsNum = document.querySelector("#buttonNum");

const smallText = document.querySelector("#small-text");
const largeText = document.querySelector("#large-text");

let replace = false;

function appendNum(button) {
    if (largeText.textContent == "0" || replace) {
        largeText.textContent = button.textContent;
        replace = false;
    }
    else largeText.textContent += button.textContent;
}

function appendDecimal() {
    // would cause problems in parsing so we'll wait.
}

function keyPress(event) {
    event.preventDefault();
    if (event.key.match(/[0-9]/g)) {
        let loopHole = {
            textContent: event.key
        };
        appendNum(loopHole);
    } else if (event.key.match(/[=]/g)) operateParse();

    if (event.shiftKey) {
        if (event.key.match(/[+*]/g)) addOperator(event.key);
    }
}

function deleteRecent() {
    largeText.textContent = largeText.textContent.slice(0, -1);
    if (largeText.textContent == '') largeText.textContent += "0";
}

function clearText() {
    largeText.textContent = "0";
    smallText.textContent = "";
}

function addOperator(button) {
    if (largeText.textContent == "No.") return;
    // if operator is already here, operate
    if (smallText.textContent.match(/[+-/*]/g) && !smallText.textContent.match(/[=]/g)) {
        let tempOp = operateParse();

        smallText.textContent = largeText.textContent + ` ${tempOp} `;
        console.log(tempOp);
    } else {
        smallText.textContent = largeText.textContent + ` ${button.textContent} `;
        replace = true;
    }
}

// Calculator math functionality
function add(a, b) {
    return a+b;
}

function subtract(a, b) {
    return a-b;
}

function multiply(a, b) {
    return a*b;
}

function divide(a, b) {
    if (b == 0) {
        replace = true;
        return "No.";
    }
    return a/b;
}

function operateParse() {
    if (smallText.textContent.match(/[=]/g) || smallText.textContent == '') return;

    let tempArr = smallText.textContent.split("").filter((num) => num != " ").join("");
    let firstNum = tempArr.split(/[d+]/g)[0];
    let tempOp = tempArr[tempArr.length-1];

    let secNum = parseInt(largeText.textContent);

    let result = operate(tempOp, parseInt(firstNum), secNum);

    smallText.textContent += ` ${secNum} =`;
    largeText.textContent = result;

    replace = true;

    return tempOp;
}

function operate(op, a, b) {
    let num1 = parseInt(a);
    let num2 = parseInt(b);

    switch(op) {
        case "+":
            return add(num1, num2);
        case "-":
            return subtract(num1, num2);
        case "*":
            return multiply(num1, num2);
        case "/":
            return divide(num1, num2);
    }
}