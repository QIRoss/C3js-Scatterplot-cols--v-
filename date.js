const times =  ["39:01", "39:23", "39:32", "39:37", "39:40", "39:47", "39:50"];

const res = times.map(i => new Date(2000,10,4,3,i[0]+i[1], i[3]+i[4]))

console.log(res)