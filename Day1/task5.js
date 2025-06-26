// Swapping two numbers without using a temp variable

function swapNumber() {
  let num1 = 3;
  let num2 = 7;

  console.log("Before Swap: num1 =", num1, ", num2 =", num2);

  num1 = num1 + num2; // = 10
  num2 = num1 - num2; // = 3
  num1 = num1 - num2; // = 7

  console.log("After Swap: num1 =", num1, ", num2 =", num2);
}

swapNumber();
