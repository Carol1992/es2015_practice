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
1. JavaScript允许采用\uxxxx形式表示一个字符，其中xxxx表示字符的码点，但是这种表示法只限于\u0000-\uFFFF之间的字符，超出这个范围的必须用2个双字节的形式表示。ES6做了改进，只需要将码点放入大括号就能正确解读，即大括号表示法与四字节的UTF-16编码是等价的。
2. JavaScript内部，字符以UTF-16的格式储存，每个字符固定为2字节。对于那些需要4个字节储存的字符，JavaScript会认为他们是2个字符。
3. es6提供了codePointAt 方法，能够正确处理4字字节储存的字符，返回一个字符的码点。该方法是测试一个字符由2个字节还是4个字节组成的最简单方法。
4. 从码点返回对应字符：string.fromCodePoint()
5. es6为字符串添加了遍历接口，可以对字符串使用for...of遍历循环。
6. 除了用indexOf方法来确定一个字符串是否包含在另一个字符串中，es6还提供了includes(), startsWith(), endsWith().新增的方法都支持第2个参数，表示开始搜索的位置。但endsWith针对前n个字符，其他两个方法针对从第n个位置到字符串结束的字符。
7. repeat():'x'.repeat(3); //'xxx'
8. 模板字符串是增强版的字符串，用反引号表示，可以在字符串中嵌入变量；如果在模板字符串中需要使用反引号，则在其前面要加上反斜杠转义
9. 标签模板可以紧跟在一个函数后面，该函数被调用来处理这个模板字符串，这个被称作标签模板功能。

### 正则的扩展

### 数值的扩展
1. ES6提供了二进制和八进制数值的写法，分别用前缀0b(0B)和0o(0O)表示，如果要将其转化为十进制数值，要用Number方法。
2. Number.isFinite()和Number.isNaN()与传统的全局方法isFinite()和isNaN()的区别在于，传统方法先调用Number()将非数值转为数值，再进行判断。而新方法只对数值有效，对于非数值一律返回false.
3. Number.parseInt()和Number.parseFloat()与传统的全局方法parseInt()和parseFloat()一样。
4. Number.isInteger()用来判断一个值是否为整数。
5. es6在Number对象上新增了一个极小的常量——Number.EPSILON,目的在于为浮点数计算设置一个误差范围。
6. JavaScript能够准确表示的整数范围在-2的53次方和2的53次方之间，不包含端点，超过这个范围就无法精确表示。Number.isSafeInteger()用来判断一个整数是否落在这个范围内。验证运算结果是否落在安全整数范围内，应该验证每个参与运算的值。
7. Math.trunc()方法用于去除一个数的小数部分，返回整数部分；对于非数值，会先将其转为数值，对于空值或无法截取整数的值，会返回NaN.
8. Math.sign()方法用于判断一个数是正数、负数、0，除了返回+1, -1, 0,-0,其余返回NaN。
9. Math.cbrt()用于计算一个数的立方根；Math.clz32()返回一个数的32位无符号整数形式有多少个前导0.

### 数组的扩展

### 函数的扩展

### 对象的扩展
