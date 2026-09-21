let [a, b, c] = [1, 2, 3];
const sum = [a + b + c];
a = sum;
b = sum;
c = sum;


console.log(`${a} ${b} ${c}`)