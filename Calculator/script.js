let display = document.getElementById('display');
let expression = '';

function updateDisplay() {
    display.value = expression || '0';
}

function appendNumber(num) {
    expression += num;
    updateDisplay();
}

function appendOperator(op) {
    // Don't add operator if expression is empty or already ends with operator
    if (expression === '' || /[+\-*/.]$/.test(expression)) {
        return;
    }
    expression += op;
    updateDisplay();
}

function calculate() {
    if (expression === '') {
        return;
    }

    try {
        // Use eval to calculate the expression
        let result = eval(expression);
        expression = result.toString();
        updateDisplay();
    } catch (error) {
        expression = 'Error';
        updateDisplay();
        setTimeout(() => {
            clearDisplay();
        }, 1000);
    }
}

function clearDisplay() {
    expression = '';
    updateDisplay();
}

function deleteLast() {
    expression = expression.slice(0, -1);
    updateDisplay();
}

// Initialize display
updateDisplay();