"use strict";

const body = document.querySelector("body");
const themeSwitches = document.querySelector(".theme-switch");

themeSwitches.addEventListener("click", (e) => {
  if (!e.target.classList.contains("switch")) return;

  [...themeSwitches.children].forEach((el) => el.classList.remove("active"));
  e.target.classList.add("active");

  if (e.target === themeSwitches.querySelector("div:last-child")) {
    body.className = "violet";
  } else if (e.target === themeSwitches.querySelector("div:first-child")) {
    body.className = "dark";
  } else {
    body.className = "light";
  }
});

const numbers = document.querySelectorAll(".number");
const operation = document.querySelectorAll(".operation");
const del = document.querySelector(".delete");
const reset = document.querySelector(".reset");
const equals = document.querySelector(".equals");
const currentOperandEl = document.querySelector(".current-operand");
const previousOperandEl = document.querySelector(".previous-operand");

class Calculator {
  constructor(display) {
    this.currentOperandEl = currentOperandEl;
    this.previousOperandEl = previousOperandEl;
    this.previousOperand = "";
    this.currentOperand = "";
    this.operation = "";
  }

  appendNumber(number) {
    if (number === "." && this.currentOperand.includes(".")) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  chooseOperation(operation) {
    if (this.currentOperand === "") return;
    if (this.previousOperand !== "") {
      this.calculate();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  reset() {
    this.currentOperand = "";
    this.operation = "";
  }

  calculate() {
    let comp;
    const prev = parseFloat(this.previousOperand);
    const curr = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(curr)) return;
    switch (this.operation) {
      case "+":
        comp = prev + curr;
        break;
      case "-":
        comp = prev - curr;
        break;
      case "/":
        comp = prev / curr;
        break;
      case "x":
        comp = prev * curr;
        break;
      default:
        return;
    }
    this.currentOperand = comp;
    this.operation = "";
    this.previousOperand = "";
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const intergers = parseFloat(stringNumber.split(".")[0]);
    const decimals = stringNumber.split(".")[1];
    let intergerNumber;
    if (isNaN(intergers)) {
      intergerNumber = "";
    } else {
      intergerNumber = intergers.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }

    if (decimals) {
      return `${intergerNumber}.${decimals}`;
    } else {
      return intergerNumber;
    }
  }

  displayResult() {
    this.currentOperandEl.textContent = this.getDisplayNumber(
      this.currentOperand
    );
    this.previousOperandEl.textContent = `${this.getDisplayNumber(
      this.previousOperand
    )} ${this.operation}`;
  }
}

const calculator = new Calculator(currentOperandEl);

numbers.forEach((el) =>
  el.addEventListener("click", () => {
    calculator.appendNumber(el.textContent);
    calculator.displayResult();
  })
);

operation.forEach((el) => {
  el.addEventListener("click", () => {
    calculator.chooseOperation(el.textContent);
    calculator.displayResult();
  });
});

equals.addEventListener("click", () => {
  calculator.calculate();
  calculator.displayResult();
});

del.addEventListener("click", () => {
  calculator.delete();
  calculator.displayResult();
});

reset.addEventListener("click", () => {
  calculator.reset();
  calculator.displayResult();
});
