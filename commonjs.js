const { sum } = require("./math");

const result = sum(2, 3);
console.log(result);

// En math.js
const sum = (a, b) => a + b;
module.exports = { sum };
