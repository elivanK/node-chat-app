const moment = require('moment');

// let date = new Date().getMonth();
// let months =[];
// console.log(date);
//new Date().getTime()
let someTimestamp = moment().valueOf();
console.log(someTimestamp);

let createAt = 1234;
let date = moment(createAt);
//date.add(100, 'year').subtract(9, 'months');
//format method 'MMM Do YYYY'
console.log(date.format('h:mm a')); //the hour and the min am/ pm