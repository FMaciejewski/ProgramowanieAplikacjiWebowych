let x = 10;
let y = 5;
let z = 0;

function power(a, b) {
    for (let i = 1; i < b; i++) {
        a *= a;
    }
    return a;
}

function divide(a, b) {
    if (b === 0) {
        return "Nie dziel przez zero!";
    }
    return a / b;
}

const readline = require('node:readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question(`Jak masz na imie?`, name => {
  console.log(`Cześć ${name}!`);
  console.log(power(x, y));
  console.log(divide(x, y));
  console.log(divide(x, z));
  rl.close();
});