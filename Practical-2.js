console.log("Practical-2 Enrollment Number: 202604104610046");
console.log("-------------------------------------------");


const numbers = [1, 2, 3, 4, 5];

const double = (number) => number * 2; 
    
const triple = (number) => number * 3; 
    
const square = (number) => number ** 2; 
    
    
const cube = (number) => number ** 3; 
    


const processArray = (array, callback) => array.map(callback);

console.log(`Original Array: ${JSON.stringify(numbers)}`);

console.log("-------------------------------------------");
console.log(`Doubled Numbers: ${JSON.stringify(processArray(numbers, double))}`);
console.log(`Tripled Numbers: ${JSON.stringify(processArray(numbers, triple))}`);
console.log(`Squared Numbers: ${JSON.stringify(processArray(numbers, square))}`);
console.log(`Cubed Numbers: ${JSON.stringify(processArray(numbers, cube))}`);
