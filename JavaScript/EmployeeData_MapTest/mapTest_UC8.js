let keyString='a string';
let keyObj={};
let keyFunc= function(){};

//settings the values

let myMap=new Map();
myMap.set("keyString","value associated with 'a string'");
myMap.set("keyObj","value associated with keyObj");
myMap.set("keyFunc","value associated with keyFunc");

//getting the values
let size=myMap.size;
let valStr=myMap.get(keyString);
let isKeyExist=myMap.has('a string');

for(let [key, value] of myMap) console.log("Loop1: "+key+' = '+value);
for(let [key, value] of myMap.entries()) console.log("Loop2: "+key+' = '+value);
for(let key of myMap.keys()) console.log("Loop3: "+key);
for(let value of myMap.values()) console.log("Loop4: "+value);
console.log("DT: "+typeof myMap.values());


//Merge two maps. The last repeated key wins.
//Spread operator essentially converts a Map to an Array

let first=new Map([[1, 'one'],[2, 'two'],[3,'three']])
let second=new Map([[1, 'uno'],[2, 'dos'],[3,'three']])
let merged=new Map([...first,...second,[1,'eins']])

let hasKey=merged.has(1)
let delKey=merged.delete(1);
if(merged.has(1)) console.log(merged.get(1))//uno
console.log("Pos2: "+merged.get(2)) //dos
merged.clear();
console.log(merged.size);


// UC 8 is left which is given in PDF, Engineers will do it as offline Practice

console.log("UC 8A - E");

