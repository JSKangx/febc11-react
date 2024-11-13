var score = [100, 90, 80];

var newScore = [...score, 70];
console.log(score); // [100, 90, 80]
console.log(newScore); // [100, 90, 80, 70]
console.log('같은 배열인가? :', score === newScore); // false
