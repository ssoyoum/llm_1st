<<<<<<< HEAD
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
=======
// while문
// for와 나눠 쓰는 기준
// 반복 횟수를 미리 알 때 -> for
// 조건이 만족될 때까지 -> while
// for는 초기화 조건 증감이 한줄에 모여 있지만, while문은 흩어져 이어 빠드리기 쉽습니다.

// 조건이 참인 동안 반복 - 증감식이 기본포함되어 있지 않아 직접 챙겨야 함

let greet = 3;
while (true) {
  console.log(greet);
  greet++;

  if (greet == 10) {
    break;
  }
}

for (let i = 0; i < 10; i++) {
  if (i === 3 || i === 7) {
    continue;
  }
  console.log("i", i);
}
>>>>>>> f3e01c710d9c1129afcbe7db4e25d82007ba3e88
