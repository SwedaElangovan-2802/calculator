const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");

let currentExpression = "";

// Handle button clicks
buttons.forEach((button) => {
    const value = button.getAttribute("data-value");
    const action = button.getAttribute("data-action");

    // Functional buttons: C, DEL, =
    if (action === "clear") {
        button.addEventListener("click", clearDisplay);
    } else if (action === "delete") {
        button.addEventListener("click", deleteLast);
    } else if (action === "calculate") {
        button.addEventListener("click", calculate);
    } else if (value !== null) {
        // Number / operator / dot buttons
        button.addEventListener("click", () => appendToDisplay(value));
    }
});

function appendToDisplay(value) {
    currentExpression += value;
    display.value = currentExpression;
}

function clearDisplay() {
    currentExpression = "";
    display.value = "";
}

function deleteLast() {
    currentExpression = currentExpression.slice(0, -1);
    display.value = currentExpression;
}

function calculate() {
    if (currentExpression.trim() === "") return;

    try {
        // eval is fine for this simple offline calculator
        const result = eval(currentExpression);
        display.value = result;
        currentExpression = String(result);
    } catch (error) {
        display.value = "Error";
        currentExpression = "";
    }
}
