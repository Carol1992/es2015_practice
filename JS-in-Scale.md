# 大型Javascript最佳实践指南

### 扩展javascript应用
1. 写一个todo应用来衡量框架的可扩展性几乎是无用的，写todo应用主要是大致了解一个框架。
2. 商业模式：开源、订阅、许可证、消耗、广告
3. 通知系统，即发生通知信息给用户，主要的挑战是容量。
4. 杀手级功能：倾听用户的声音，满足扩展的需求，就可以演化出特有的功能。
5. 核心开发者与具备基本开发能力的开发者。你要努力成为核心开发者。
6. 当谈到javascript可扩展性的影响因素时，有三个主要领域需要关注：用户、功能、开发。
7. 大型javascript应用实际上相当于一系列组件之间的互相通信，将业务逻辑与组件解耦

### 组件之间的组合
1. 通用组件：模块、路由器、模型/集合、控制器/视图、模板。
2. 路由器组件中的URI模式：一种是监听localtion.hash改变事件，一种是使用浏览历史API。
3. 路由器组件中如何相应路由变化：一种是声明一个路由并绑定回调函数；一种是路由被激活时触发事件。
4. 在架构方面关于路由的考虑：设计一个全局单一路由，还是每个模块一个路由。
```js
// router.js
import Events from 'events.js';

export default class Router extends Events {
	constructor(routes){
		super();
		if(routes != null){
			for (let key of Object.keys(routes)){
				this.listen(key, routes[key]);
			}
		}
	}

	start(){
		window.addEventListener('hashchange',
			this.onHashChange.bind(this));
		this.onHashChange();
	}	

	onHashChange(){
		this.trigger(location.hash, location.hash);
	}
}

//main.js
import Router from 'router.js';
function logRoute(){
	console.log('${route}' activated);
}
var router = new Router({'#route1': logRoute});
router.listen('#route2', logRoute);
```
5. 模型/集合组件中，最好将诸如数据交换、API调用、事件生命周期的公用代码封装起来。
```js
class Model {
	constructor(first, last, age){
		this.first = first;
		this.last = last;
		this.age = age;
	}
}

//视图基类
class BaseView {
	name(){
		return '${this.model.first} ${this.model.last}';
	}
}

//扩展视图基类
class modelView extends BaseView {
	constructor(model){
		super();
		this.model = model;
	}
}

//使用参数扩展
class modelView2 extends BaseView {
	constructor(first, last, age){
		super();
		this.model = new Model(...arguments);
	}
}

var prop = ['carol', 'lynn', 25];
console.log('view1', new modelView(new Model(...prop)).name());
console.log('view2', new modelView2(...prop).name());
```
6. 控制器/视图组件中，任务是响应DOM事件和更新DOM
```js
import Events from 'Events.js';
class Model extends Events {
	constructor(enabled){
		super();
		//not not converts a non-boolean to a boolean, then inverts it
		this.enabled = !!enabled;
	}

	set enabled(enabled){
		this._enabled = enabled;
		this.trigger('enabled', enabled);
	}

	get enabled(enabled){
		return this._enabled;
	}

	class View(elt, model){
		model.listen('enabled', (enabled) => {
			elt.setAttribute('disabled', !enabled);
		});

		elt.addEventListener('click', () => {
			model.enabled = false;
		});
	}
}

new View(document.getElementById('set'), new Model());
```
7. 扩展通用组件：我们可以通过扩展框架中的通用视图组件来得到我们自己的通用版本的视图组件。应该避免扩展在三层以上，多于三层会带来可扩展性问题。
8. 有两种构建组件的方法，其一，可以扩展已有的库和框架，通过不断扩展实现特定功能；其二，通过给组件传参数，告诉组件如何工作。扩展相对于配置的优势是调用者不必关心如何配置。
9. 组件的代码放在一起，方便管理。
10. 扩展模型/集合
```js
class BaseModel {
	fetch(){
		return new Promise((resolve, reject) => {
			this.id = 1;
			this.name = 'carol';
			resolve(this);
		});
	}
}

class Model1 extends BaseModel {
	fetch(){
		return Promise.all({
			super.fetch();
			this.fetchSettings();
		});
	}

	fetchSettings() {
		return new Promise((resolve, reject) => {
			this.enabled = true;
			resolve(this);
		})
	}
}
new Model1().fetch().then((result) => {
	var [model] = result;
	console.log(model.id, model.name, model.enabled);
})
```
11. 解构组件
```js
class Renderer {
	constructor(renderer) {
		this.renderer = renderer;
	}

	render() {
		return this.renderer ? this.renderer(this) : '';
	}
}

class Feature {
	constructor(header, content, footer) {
		this.header = header;
		this.content = content;
		this.footer = footer;
	}

	render() {
		var header = this.header ? '${this.header.render()}\n' : '',
			content = this.content ? '${this.content.render()}\n' : '',
			footer = this.footer ? '${this.footer.render()}\n' : '';
		return '${header}${content}${footer}';
	}
}

var feature = new Feature(
	new Renderer(() => {
		return 'Header';
	}),
	new Renderer(() => {
		return 'Content';
	}),
	new Renderer(() => {
		return 'Footer';
	}),
)
```

### 组件之间的通信
1. 有多种通信模型可以用来实现组件间通信，最简单的就是方法调用或者说函数调用。
2. 通信模型：发布-订阅；命令-响应
3. 可以使用whlie循环模拟对按钮的快速重复点击。
4. 可追踪的组件通信
```js
//events.js

export default class Events {
	constructor(log){
		this.log = log;
		this.listeners = {};
	}

	trigger(name, data){
		if(name in this.listeners){
			var log = this.log;
			return this.listeners[name].map(function(callback){
				log && console.log('BEFORE', name);
				var result = callback(Object.assign({name: name}, data));
				log && console.log('AFTER', name);
				return result;
			});
		}
	}
}

//main.js
import Events from 'Events.js';

function callbackFirst(data){
	console.log('CALLBACK', data.name);
}

function callbackLast(data){
	setTimeout(function(){
		console.log('CALLBACK', data.name);
	}, 500);
}

var broker = new Events(true);
broker.listen('first', callbackFirst);
broker.listen('last', callbackLast);
broker.trigger('first');
broker.trigger('last');
```
5. 意外发生的优雅处理：try-throw-catch-finally

### 寻址和导航
1. 在javascript里实现路由有两种方法。第一种是利用基于hash的URI，这种URI以#字符开头；另一种不太常用的方法是利用浏览器的history API生成更多传统的URI。
2. 可以简单地把路由理解成一张映射表，它把一些路径、字符串、以及正则表达式的定义映射到回调函数。但是这个映射过程一定要足够块、容易预测，还要足够稳定。 
```js
//router.js
import events from 'events.js';

export default class Router {
	constructor(){
		this.routes = [];
	} 

	add(pattern, name) {
		this.routes.push({
			pattern: new RegExp('^' + pattern.replace(/:\w+/g, '(.*)')),
			name: name
		})
	}
}

start() {
	var onHashChange = () => {
		for(let route of this.routes) {
			let result = route.pattern.exec(location.hash.substr(1));
			if(result) {
				events.trigger('route:' + route.name, {values: result.splice(1)});
				break;
			}
		}
	};
	 window.addEventListener('hashchange', onHashChange);
	 onHashChange();
}

//model.js
export default class Model {
	constructor(pattern, id) {
		this.pattern = pattern;
		this.id = id;
	}

	get uri() {
		return '#'+ this.pattern.replace(/:\w+/, this.id);
	}
}

//user.js
import Model from 'model.js';

export default class User extends Model {
	static pattern() {
		return 'user/:id';
	}

	constructor(id) {
		super(User.pattern(), id);
	}
}

//group.js
import Model from 'model.js';

export default clss Group extends Model {
	static pattern() {
		return 'group/:id';
	}

	constructor(id) {
		super(Group.pattern(), id);
	}
}

//main.js
import Router from 'router.js';
import events from 'events.js';
import User from 'user.js';
import Group from 'group.js';

var router = new Router();
router.add(User.pattern(), 'user');
router.add(Group.pattern(), 'group');

events.listen('route:user', (data) => {
	console.log(`User $(data.values[0]) activated`);
});
events.listen('route:group', (data) => {
	console.log(`Group $(data.values[0]) activated`);
});

var user = new User(1);
document.querySelector('.user').href = user.uri;

var group = new Group(1);
document.querySelector('.group').href = group.uri;

router.start();
```

### 用户偏好和默认设置
1. 在设计大规模javascript系统时，主要关心的偏好类型有三种：地区、行为、外观。
2. 用户选择好地区、外观后，可以把偏好值存在cookie中，下一次浏览器加载应用时，可以记住用户的这些行为。如果是账户控制这些行为的话，可以通过在登陆后使用API接口获取该用户的行为偏好。这样的话用户无论在哪台电脑登陆都可以保持原有的偏好设置。

### 加载时间和响应速度

### 可移植性和测试

### 缩小规模

### 处理错误