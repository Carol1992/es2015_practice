# es2015_practice
### 在浏览器执行es6代码，需先转为es5代码
1. 使用traceur,需要在html文件中引入3个js文件，比较简单，但每个有es6代码的页面都需要多加载3个文件
2. 安装babel-preset-es2015,在当前目录下新建.babelrc文件({"presets": ['es2015']}),使用babel buildfile.js -o sourcefile.js 将写有es6代码的文件转为es5代码的文件输出

### 在Node服务端执行es6代码
1. 先安装babel-node 和 babel-preset-es2015,在项目根目录下新建.babelrc文件({"presets": ['es2015']})，把babel加载为require命令的一个钩子，即在应用的入口脚本头部加入下面的语句：require("babel-node/register")。有了这句话后后面所有通过require命令加载的后缀名为.es6, .js, .jsx, .es 的脚本，都会先通过babel转码后再加载。
babel 默认不会转换Iterator, Generator, Set, Map, Promise, Proxy, Reflect, Symbol 等全局对象，以及一些定义在全局对象上的方法，如object.assign.如果你用到了这些功能，需要安装babel-polyfill模块，然后在所有脚本头部加上一行require('babel-polyfill')或import('babel-polyfill')

### let 命令，所声明的变量只在let命令所在的代码块内有效
1. 在for循环中，适合使用let,以往我们使用var,在全局范围内都有效，当循环结束后，var定义的变量i并没有消失，而是泄露成了全局变量。
2. let不像var那样会发生变量提升现象，所以，变量一定要声明后才能使用，否则会报错。es6规定暂时性死区和不存在变量提升，主要是为了减少运行时错误。
3. es5只有全局作用域和函数作用域，但es6有块级作用域，es6允许块级作用域任意嵌套，但外层作用域无法读取内层作用域的变量，也无法调用内层作用域定义的函数，且内层作用域可以定义外层作用域的同名变量。

### const 命令，声明的变量的值不能改变，而且在声明时就应该赋值
1. 与let一样，const也不可重复声明变量
2. es只有2种声明变量的方法：var命令和function命令，es6 增加了let, const, class, import. 所以es6一共有6种声明变量的方法。
3. let, const, class 命令声明的全局变量不属于全局对象的属性。
4. 跨模块常量，使用export和import

### 变量的解构赋值
1. es6 允许按照一定模式，从数组和对象中提取值，对变量进行赋值（模式匹配），如果解构不成功，变量的值等于undefined。
2. 解构赋值允许指定默认值，ES6严格使用相等运算符判断一个位置是否有值，所以，如果一个数组成员不严格等于undefined，默认值是不会生效的。如果默认值是一个表达式，那么这个表达式是惰性求值的，即只有在用到的时候才会求值。
3. 对象的解构赋值：变量必须与属性同名，才能去到正确的值。内部机制：先找到同名属性，然后再赋值给对应的变量，真正被赋值的是后者，而不是前者。
4. 解构赋值的规则是，只要等号右边的值不是对象，就先将其转为对象。对于无法转为对象的则报错。

### 字符串的扩展
