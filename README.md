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
1. Array.from()用于将类似数组的对象和可遍历的对象转为真正的数组，只要是部署了Iterator接口的数据结构都可以使用。
2. 扩展运算符(...)也可以将某些数据结构转为数组。
3. 任何有length属性的对象，都可以通过Array.from()转为数组，而这种情况扩展运算符无法转换。
4. Array.from()还可以接受第二个参数，作用类似于数组的map方法，用来对每个元素进行处理，将处理后的值放入原数组。
5. Array.of()用于将一组值转换为数组；总是返回参数值组成的数组，如果没有参数，则返回一个空数组。
6. find()/findIndex()找出第一个符合条件的数组成员，没有符合则返回undefined/找出第一个符合条件的数组成员的位置，没有符合则返回-1
7. fill()用于空数组的初始化非常方便，可以接受第二个和第三个参数，用于指定填充的起始位置和结束位置。
8. 数组实例的entries(), keys(), values(), includes();
9. 数组的空位是指数组的某一个位置没有任何值，es6明确将空位转为undefined
10. 数组推导，需要注意的是，新数组会立即在内存中生成，如果原数组很大将非常耗内存。

### 函数的扩展
1. 函数参数的默认值，通常情况下，定义了默认值的参数应该是函数的最后一个参数，如果不是最后一个参数，实际上这个参数是无法忽略的。
2. 函数的length属性，指定默认值后，length属性将返回没有指定默认值的参数的个数。
3. rest参数(形式为“...变量名”)，用于获取函数的多余参数，这样就不需要使用arguments对象了。rest参数搭配的变量是一个数组，该变量将多余的参数放入其中。rest参数只能是最后一个参数，否则会报错。
4. 扩展运算符(...)好比rest参数的逆运算，将一个数组转为用逗号分隔的参数序列。所以不需要apply方法将数组转为函数的参数了。如果将扩展运算符用于数组赋值，则只能放在参数的最后一位，否则会报错。任何类似数组的对象都可以用扩展运算符转为真正的数组。
5. 函数的name属性返回该函数的函数名，如果将一个匿名函数赋值给一个变量，es5的name属性会返回空字符串，而es6的name属性会返回函数名。
6. 箭头函数：函数体内的this对象就是定义时所在的对象，而不是使用时所在的对象。不可以当做构造函数。不可以使用arguments对象，不可以使用yield命令。由于没有this，当然也就不能用call(),apply(),bind()这些方法去改变this的指向。
7. this:如果是普通函数，执行时this应该指向全局对象，但是箭头函数导致this总是指向函数所在的对象。因为箭头函数根本没有自己的this，导致内层的this就是外层代码块的this.
8. 除了this，以下3个变量在箭头函数中也是不存在的，分别指向外层的对应变量：arguments, super, new.target
9. 尾调用：尾调用是指某个函数的最后一步调用另一个函数。尾调用不一定出现在函数尾部，只要是最后一步操作即可。
10. 尾调用优化：函数调用会在内存形成一个调用记录，又称调用帧，保存调用位置和内部变量等信息，所有的调用帧就形成一个调用栈。尾调用优化就是只保留内层函数的调用帧。
11. 尾递归：函数调用自身称为递归，如果尾调用自身就称为尾递归，递归非常耗内存，因为需要同时保存成千上百个调用帧，很容易发生栈溢出错误(stack overflow).尾递归的实现往往需要改写递归函数，确保最后一步只调用自身，做到这一点的方法，就是把所有用到的内部变量改写成函数的参数。

### 对象的扩展
