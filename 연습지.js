let i = 0; sum = 0;
while (i <= 100) {
if (i %2 === 0 || i % 5 === 0)
   {sum += i;}

i++;
}
console.log(sum);



// let i = 2, j = 1;
// while (i < 10) {
// while (j < 10) {
// console.log(i, "x", j, "=", i * j);
// j++;
// }
// i++;
// j = 1;
// }


// let now = new Date().getHours();
// console.log(now < 12 ? "오전" : "오후");

// // for (let i = 0; i < 10000; i++)

// // if (i % 13 === 0&& i % 2 === 0) {
// //     console.log(i);
// // }

// // }
// // for (let i = 1; i <= 9; i++)
// // {   for (let j = 1; j < 10; j++)
// //     console.log(`${i}*${j}=${i*j}`);
// // }