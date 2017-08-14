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

function is32Bit(c){
  return c.codePointAt(0) > 0xFFFF;
}
console.log(is32Bit("𠮷"));
console.log(is32Bit("a"));
console.log(is32Bit("ab"));
console.log(String.fromCodePoint(0x20BB7));

var name = "carol", time = new Date();
document.getElementById("app").append(`
		Hello ${name}, today is ${time}
`);

//tag函数的第一个参数是一个数组，该数组的成员是模板字符串中那些没有变量替换的部分，
//tag函数的其他参数都是模板字符串各个变量被替换后的值
//第一个参数：['Hello ', ' world ', '']
//第二个参数：15
//第三个参数：5
var a = 10, b = 5;
tag`Hello ${a+b} world ${a-b}`;
function tag(s, v1, v2){
	console.log(s[0]);
	console.log(s[1]);
	console.log(v1 + v2);
}

var pattern = /[0-9]{4}([0-9]{2})([0-9]{2})/;
var groups = pattern.exec("19920907");
console.log("生日：" + groups[1] + "月" + groups[2] + "日");

var stocks = [
	{颜色:"红", 尺码:"L", 价格:200, 厚度:"厚", skuId:"00001"},
	{颜色:"蓝", 尺码:"M", 价格:300, 厚度:"中厚", skuId:"00002"},
	{颜色:"黑", 尺码:"S", 价格:120, 厚度:"薄", skuId:"00003"},
	{颜色:"红", 尺码:"XL", 价格:210, 厚度:"厚", skuId:"00004"}
];
var stock_groups = {
	colors:[],
	sizes:[],
	prices:[],
	type:[]
};
for(let i=0; i<stocks.length; i++){
	var {颜色, 尺码, 价格, 厚度, skuId} = stocks[i];
	stock_groups.colors.push(颜色);
	stock_groups.sizes.push(尺码);
	stock_groups.prices.push(价格);
	stock_groups.type.push(厚度);
}
var stock_groups2 = {
	colors: new Set(stock_groups.colors),
	sizes:new Set(stock_groups.sizes),
	prices:new Set(stock_groups.prices),
	type:new Set(stock_groups.type)
}
console.log(stock_groups2);
for(let v of stock_groups2.colors){
	console.log(v);
}
