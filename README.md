# es2015_practice
### 在浏览器执行es6代码，需先转为es5代码
1. 使用traceur,需要在html文件中引入3个js文件，比较简单，但每个有es6代码的页面都需要多加载3个文件
2. 安装babel-preset-es2015,在当前目录下新建.babelrc文件({"presets": ['es2015']}),使用babel buildfile.js -o sourcefile.js 将写有es6代码的文件转为es5代码的文件输出

### 在Node服务端执行es6代码
1. 先安装babel-node 和 babel-preset-es2015,在项目根目录下新建.babelrc文件({"presets": ['es2015']})，把babel加载为require命令的一个钩子，即在应用的入口脚本头部加入下面的语句：require("babel-node/register")。有了这句话后后面所有通过require命令加载的后缀名为.es6, .js, .jsx, .es 的脚本，都会先通过babel转码后再加载。
babel 默认不会转换Iterator, Generator, Set, Map, Promise, Proxy, Reflect, Symbol 等全局对象，以及一些定义在全局对象上的方法，如object.assign.如果你用到了这些功能，需要安装babel-polyfill模块，然后在所有脚本头部加上一行require('babel-polyfill')或import('babel-polyfill')
