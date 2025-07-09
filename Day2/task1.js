// Creating a loop with 5 user-entred numbers and print with conditions

for (let i = 0; i < 5; i++) {
  let num = parseInt(prompt(`Enter Number ${i + 1} :`));

  if (num < 0) {
    continue;
  }

  let check = num % 2 === 0 ? "Even" : "Odd";

  let multipleOfFive = num % 5 === 0 ? "Yes" : "No";

  console.log(`Number: ${num}, ${check}, Multiple of 5: ${multipleOfFive}`);
}
