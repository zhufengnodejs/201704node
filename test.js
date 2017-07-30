console.time('cost1');
console.time('cost2');
for(let i=0;i<1000000;i++){}

console.timeEnd('cost1');
console.timeEnd('cost2');