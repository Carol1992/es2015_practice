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
function displayChoice(stocks){
	var stock_groups = {
		colors:[],
		sizes:[],
		prices:[],
		types:[],
		all_sizes:["XS","S","M","L","XL"],
		all_types:["超薄","薄","中厚","厚"]
	};
	for(let i=0; i<stocks.length; i++){
		var {颜色, 尺码, 价格, 厚度, skuId} = stocks[i];
		stock_groups.colors.push(颜色);
		stock_groups.sizes.push(尺码);
		stock_groups.prices.push(价格);
		stock_groups.types.push(厚度);
	}
	var stock_groups2 = {
		colors: Array.from(new Set(stock_groups.colors)),
		sizes:Array.from(new Set(stock_groups.all_sizes.filter(v => new Set(stock_groups.sizes).has(v)))),
		prices:Array.from(new Set(stock_groups.prices)),
		types:Array.from(new Set(stock_groups.all_types.filter(v => new Set(stock_groups.types).has(v))))
	}
	stock_groups2.minPrice = Math.min(...stock_groups2.prices);
	stock_groups2.maxPrice = Math.max(...stock_groups2.prices);
	console.log(stock_groups2);
	return stock_groups2;
}

var vm = new Vue({
	el: "#choice-zone",
	data: {
		stock_groups2:displayChoice(stocks),
		selected:false,
		selectedPrice: 0,
		hasStock: true,
		selectedStocks: 900,
		selectedItem:{},
		buyNums:1
	},
	methods: {
		getNewData: function(){
			var colors = ["红","黑","蓝","粉","白","青","灰","藏蓝","黄"],
			prices = [90,100,110,123,124,150,190,200,213,230];
			sizes = ["XS","S","M","L","XL"],
			types = ["超薄","薄","中厚","厚"],
			stocks = [];
			for (let i=0; i<5; i++){
				var item = {
					颜色:colors[Math.round(Math.random()*(colors.length-1))],
					价格:prices[Math.round(Math.random()*(prices.length-1))],
					尺码:sizes[Math.round(Math.random()*(sizes.length-1))],
					厚度:types[Math.round(Math.random()*(types.length-1))]
				};
				stocks.push(item);
			}
			this.stock_groups2 = displayChoice(stocks);
		},
		checkRemainingOptions: function(e, choice, opt){
			document.getElementById(choice).style.backgroundColor = "#eee";
			switch (opt) {
				case "color":
					//选择了color,哪些size和type是可选的，不可选的用灰色表示
					//选择了color+size/type,哪些type/size是可选的，不可选的用灰色表示
					//选择了color+size+type有货
					//用户重新点击灰色选项
					//存货与价格，用户关注的就是有没有货，有的话购买价格是多少
					vm.selectedItem.color = choice;
					break;
				case "size":
					//todo
					vm.selectedItem.size = choice;
					break;
				case "type":
					//todo
					vm.selectedItem.type = choice;
					break;
				default:
					console.log(choice, opt);
			}
		},
		addToCart: function(){
			vm.selectedItem.nums = vm.buyNums;
			console.log(vm.selectedItem);
		},
		buyNow: () => {
			vm.selectedItem.nums = vm.buyNums;
			console.log(vm.selectedItem);
		},
		reduce:() => {
			var elt = document.getElementById("nums");
			if(+elt.value > 1) {
				elt.value--;
				vm.buyNums = elt.value;
			}
			else return;
		},
		addMore:() => {
			var elt = document.getElementById("nums");
			if(+elt.value < vm.selectedStocks) {
				elt.value++;
				vm.buyNums = elt.value;
			}
			else return;
		},
		checkNum:() => {
			var elt = document.getElementById("nums");
			if(+elt.value < 1) elt.value = 1;
			if(+elt.value > vm.selectedStocks) elt.value = vm.selectedStocks;
		}
	}
});

//es5:空字符会被改为默认值，这个坑你踩过的亲
function test(x,y){
	y = y || "world";
	console.log(x,y);
}
test("hello","");//hello world
//es6:参数变量是默认声明的，所以不能用let或const再次声明
function test2(x, y="world"){
	console.log(x,y);
}
test2("hello","");//hello
//与结构赋值默认值结合使用
function myfetch(url, { body='', method='GET', headers={}}){
	console.log(method);
}
myfetch("https://baidu.com",{});//GET
//myfetch("https://baidu.com");//报错

let insert = (value) => ({into: (array) => ({after: (afterValue) => {
	array.splice(array.indexOf(afterValue) + 1, 0, value);
	return array;
}})});
console.log(insert(2).into([1,3]).after(1));

function factorial(n){
	if (n === 1) return 1;
	return n * factorial(n - 1);
}
function factorial2(n, total=1){
	if (n === 1) return total;
	return factorial2(n - 1, n * total);
}

function tailFactorial(n, total){
	if(n === 1) return total;
	return tailFactorial(n - 1, n * total);
}
function factorial3(n){
	return tailFactorial(n,1);
}

//应用参数默认值，可以指定某一个参数不得省略，如果省略就会抛出一个错误
function throwIfMissing(){
	throw new Error("Missing parameter");
}
function foo(mustProvided = throwIfMissing()){
	return mustProvided;
}
//foo();
var person = {
	sayName: function(){
		console.log(this.name);
	},
	get firstName(){
		return "carol";
	}
};
//person.sayName.name = "sayName"; person.firstName.name = "get firstName"

//{b: 'c'} Object.assign 只复制自身属性，不可枚举的属性和继承的属性不会被复制
Object.assign({b: 'c'}, Object.defineProperty({}, 'invisible', {
	emumerable: false,
	value: 'hello'
}))

var ms = {};
function getItem(key){return key in ms ? ms[key] : null;}
function setItem(key, value){ms[key] = value;}
function clear(){ms = {};}
//module.exports = {getItem, setItem, clear}
// modules.export = {
// 	getItem: getItem,
// 	setItem: setItem,
// 	clear: clear
// };

let sym = Symbol();
console.log(typeof sym);
var sym1 = Symbol("foo");
console.log(sym);
console.log(sym1);

var obj = {};
var a = Symbol('a'), b = Symbol('b');
obj[a] = "Hello";
obj[b] = "World";
console.log(Object.getOwnPropertySymbols(obj));

var size = Symbol('size');
class Collection {
	constructor(){
		this[size] = 0;
	}
	add(item) {
		this[this[size]] = item;
		this[size]++;
	}
	static sizeOf(instance){
		return instance[size];
	}
}
var x2 = new Collection();
console.log(Collection.sizeOf(x2));
x2.add("foo");
console.log(Collection.sizeOf(x2));
console.log(Object.keys(x2));
console.log(Object.getOwnPropertyNames(x2))
console.log(Object.getOwnPropertySymbols(x2));

var shapeType = {
	//tri: 'Triangle'
	tri: Symbol()
};
function getArea(shape, options){
	var area = 0;
	switch (shape) {
		case shapeType.tri:
			area = .5 * options.width * options.height;
			break;
	}
	return area;
}
console.log(getArea(shapeType.tri, {width:100, height:100}));

var arr = [1,2,3,4,5,6,7,7,7];
var s1 = new Set();
arr.map(x => s1.add(x));
console.log(s1);
var s2 = new Set();
arr.forEach(x => s2.add(x));
console.log(s2);
a1 = arr.filter(x => x > 4);
console.log(a1);

//数组原生具有遍历器接口，部署在数组的Symbol.iterator属性上
let arr2 = ['a', 'b', 'c'];
let iter = arr2[Symbol.iterator]();
l(iter.next());
l(iter.next());
l(iter.next());
l(iter.next());
l(iter.next());

function l(val){
	console.log(val);
}

//使用Promise异步加载图片
function loadImage(url){
	return new Promise(function(resolve, reject){
		var image = new Image();
		image.onload = function(){
			resolve(image);
		};
		image.onerror = function(){
			reject(new Error('could not load image at ' + url));
		};
		image.src = url;
	});
}

//用Promise对象实现的AJAX操作
var getJson = function(url){
	var promise = new Promise(function(resolve, reject){
		var client = new XMLHttpRequest();
		client.open("GET", url);
		client.onreadystatechange = handler;
		client.responseType = "json";
		client.setRequestHeader("Accept", "application/json");
		client.send();

		function handler(){
			if(this.readyState !== 4){
				return;
			}
			if(this.status === 200){
				resolve(this.response);
			}else{
				reject(new Error(this.statusText));
			}
		}
	});
	return promise;
};
getJson("relation.json").then(function(json){
	console.log(json);
}, function(error){
	console.error(error);
})
