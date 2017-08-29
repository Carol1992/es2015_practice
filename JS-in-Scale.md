# 大型Javascript最佳实践指南

### 扩展javascript应用
1. 写一个todo应用来衡量框架的可扩展性几乎是无用的，写todo应用主要是大致了解一个框架。
2. 商业模式：开源、订阅、许可证、消耗、广告
3. 通知系统，即发生通知信息给用户，主要的挑战是容量。
4. 杀手级功能：倾听用户的声音，满足扩展的需求，就可以演化出特有的功能。
5. 核心开发者与具备基本开发能力的开发者。你要努力成为核心开发者。
6. 当谈到javascript可扩展性的影响因素时，有三个主要领域需要关注：用户、功能、开发。
7. 大型javascript应用实际上相当于一系列组件之间的互相通信，将业务逻辑与组件解耦

### 组件之间的组合和组件之间的通信
1. 通用组件：模块、路由器、模型/集合、控制器/视图、模板。
2. 路由器组件中的URI模式：一种是监听localtion.hash改变事件，一种是使用浏览历史API。
3. 路由器组件中如何相应路由变化：一种是声明一个路由并绑定回调函数；一种是路由被激活时触发事件。
4. 在架构方面关于路由的考虑：设计一个全局单一路由，还是每个模块一个路由。
```js
// router.js
import Events from 'events.js'

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
import Router from 'router.js'
function logRoute(){
	console.log('${route}' activated);
}
var router = new Router({'#route1': logRoute});
router.listen('#route2', logRoute);
```