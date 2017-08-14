console.log([0,1,2].map(item => item + 1));

var a = [];
for(let i=0; i<10; i++){
	a[i] = function(){
		console.log(i);
	}
}
a[6]();

let [head, ...tail] = [0,1,2,3,1];
let [x, y, z] = new Set(["a", 1, 2]);

function* fibs(){
	var a = 0, b = 1;
	while(true){
		yield a;
		[a, b] = [b, a+b];
	}
}
var [a,b,c,d,e,f] = fibs();
console.log(a + ' ' + b);

var {foo: baz} = {foo: "abc", bar: "efg"};
console.log(baz);

//将Math对象的取正弦，余弦，对数3个方法赋值到了对应的变量，这样使用起来会方便很多。
let {sin, log, cos} = Math;

var map = new Map();
map.set("first","hello");
map.set("last","world");
for(let [key, value] of map){
  console.log(key + ' is ' + value);
}
for(let [key] of map){console.log(key)};
for(let [,value] of map){console.log(value)};
