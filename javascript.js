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

function deleteRecent() {
    largeText.textContent = largeText.textContent.slice(0, -1);
    if (largeText.textContent == '') largeText.textContent += "0";
}

function clearText() {
    largeText.textContent = "0";
    smallText.textContent = "";
}

function addOperator(button) {
    // if operator is already here, operate
    if (smallText.textContent.match(/[+-/*]/g) && !smallText.textContent.match(/[=]/g)) {
        let tempOp = operateParse();

        smallText.textContent = largeText.textContent + ` ${tempOp} `;
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
        return "No.";
    }
    return a/b;
}

function operateParse() {
    let tempArr = smallText.textContent.split("").filter((num) => num != " ").join("");
    let firstNum = tempArr.split(/[d+]/g)[0];
    let tempOp = tempArr[tempArr.length-1];

    let secNum = parseInt(largeText.textContent);

    let result = operate(tempOp, parseInt(firstNum), secNum);

    smallText.textContent += ` ${secNum} =`;
    largeText.textContent = result;

    return tempArr[1];
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