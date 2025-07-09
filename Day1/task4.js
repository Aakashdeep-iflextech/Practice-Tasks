// Logs type coerced values like 5 + "5"

function coercedValues() {
  const value1 = "5";
  const value2 = 5;
  let add = value1 + value2;

  console.log(add);
  console.log("5 + '5' =", 5 + "5");
}

coercedValues();
