//基本路由示例
var express = require("express");
var app = express();
app.get("/",(req,res)=>{
    res.send("Hello World!")
});


//路由方法
//路由方法源于 HTTP 请求方法，和 express 实例相关联。

//下面这个例子展示了为应用跟路径定义的 GET 和 POST 请求：

// GET method route
app.get('/', function (req, res) {
    res.send('GET request to the homepage');
});

// POST method route
app.post('/', function (req, res) {
    res.send('POST request to the homepage');
});

app.all('/secret',(req,res,next)=>{
    console.log("Accessing the secret section...");
    next();//pass the control to next handeler
});


//使用字符串的路由路径示例：

//匹配根路径的请求
app.get("/",(req,res)=>{
    res.send("root")
});
//匹配  /about路径请求
app.get("/about",(req,res)=>{
    res.send("about")
})
//匹配 /random路径请求
app.get('/random.text', function (req, res) {
    res.send('random.text');
});


//使用字符串模式的路由路径示例：

// 匹配 acd 和 abcd
app.get('/ab?cd', function(req, res) {
    res.send('ab?cd');
});

// 匹配 abcd、abbcd、abbbcd等
app.get('/ab+cd', function(req, res) {
    res.send('ab+cd');
});

// 匹配 abcd、abxcd、abRABDOMcd、ab123cd等
app.get('/ab*cd', function(req, res) {
    res.send('ab*cd');
});

// 匹配 /abe 和 /abcde
app.get('/ab(cd)?e', function(req, res) {
    res.send('ab(cd)?e');
});



//使用正则表达式的路由路径示例：

// 匹配任何路径中含有 a 的路径：
app.get(/a/, function(req, res) {
    res.send('/a/');
});

// 匹配 butterfly、dragonfly，不匹配 butterflyman、dragonfly man等
app.get(/.*fly$/, function(req, res) {
    res.send('/.*fly$/');
});


//路由句柄  可以为请求处理提供多个回调函数，行为类似中间件
//使用一个回调函数处理路由：
app.get('/example/a', function (req, res) {
    res.send('Hello from A!');
});

//使用多个回调函数处理路由（记得指定 next 对象）：
app.get('/example/b', function (req, res, next) {
    console.log('response will be sent by the next function ...');
    next();
}, function (req, res) {
    res.send('Hello from B!');
});

//使用回调函数数组处理路由：
var cb0 = function (req, res, next) {
    console.log('CB0');
    next();
};

var cb1 = function (req, res, next) {
    console.log('CB1');
    next();
};

var cb2 = function (req, res) {
    res.send('Hello from C!');
};

app.get('/example/c', [cb0, cb1, cb2]);

//混合使用函数和函数数组处理路由：
var cb0 = function (req, res, next) {
    console.log('CB0');
    next();
};

var cb1 = function (req, res, next) {
    console.log('CB1');
    next();
};

app.get('/example/d', [cb0, cb1], function (req, res, next) {
    console.log('response will be sent by the next function ...');
    next();
}, function (req, res) {
    res.send('Hello from D!');
});


app.listen(3000);



//响应方法

//res.download()	//提示下载文件。
//res.end()	//终结响应处理流程。
//res.json()	//发送一个 JSON 格式的响应。
//res.jsonp()	//发送一个支持 JSONP 的 JSON 格式的响应。
//res.redirect()	//重定向请求。
//res.render()	//渲染视图模板。
//res.send()	//发送各种类型的响应。
//res.sendFile	//以八位字节流的形式发送文件。
//res.sendStatus()	//设置响应状态代码，并将其以字符串形式作为响应体的一部分发送。





//app.route()
//可使用 app.route() 创建路由路径的链式路由句柄。
// 由于路径在一个地方指定，这样做有助于创建模块化的路由，而且减少了代码冗余和拼写错误。

//下面这个示例程序使用 app.route() 定义了链式路由句柄。

app.route('/book')
    .get(function(req, res) {
        res.send('Get a random book');
    })
    .post(function(req, res) {
        res.send('Add a book');
    })
    .put(function(req, res) {
        res.send('Update the book');
    });


//express.Router
//可使用 express.Router 类创建模块化、可挂载的路由句柄。
// Router 实例是一个完整的中间件和路由系统，因此常称其为一个 “mini-app”。

//下面的实例程序创建了一个路由模块，并加载了一个中间件，定义了一些路由，并且将它们挂载至应用的路径上。

//在 app 目录下创建名为 birds.js 的文件，内容如下：

var express = require('express');
var router = express.Router();

// 该路由使用的中间件
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});
// 定义网站主页的路由
router.get('/', function(req, res) {
    res.send('Birds home page');
});
// 定义 about 页面的路由
router.get('/about', function(req, res) {
    res.send('About birds');
});

module.exports = router;
//然后在应用中加载路由模块：

var birds = require('./birds')
...
app.use('/birds', birds);

//应用即可处理发自 /birds 和 /birds/about 的请求，并且调用为该路由指定的 timeLog 中间件。