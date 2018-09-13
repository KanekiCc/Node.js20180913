//应用级中间件
var express = require("express")
var app = express();
//没有挂载路径的中间件，应用的每个请求都会执行该中间件
app.use((req,res,next)=>{
    console.log('Time', Date.now());
    next()
});

//挂载至/user/:id的中间件，任何指向/user/:id的请求都会执行它
app.use('/user/:id',(req,res,next)=>{
    console.log('Request Type:', req.method);
    next()
});

//路由和句柄函数（中间件系统），处理指向/user/:id的GET请求
app.get('/user/:id',(req,res,next)=>{
    res.send('USER');
})


//下面例子展示了在一个挂载点装在一组中间件
//一个中间件栈，对任何指向/user/:id的HTTP请求打印出相关信息
app.use('/user/:id',(req,res,next)=>{
    console.log('Request URL:', req.originalUrl);
    next();
}),(req,res,next)=>{
    console.log('Request Type:', req.method);
    next();
};


// 一个中间件栈，处理指向 /user/:id 的 GET 请求
app.get('/user/:id', function (req, res, next) {
    console.log('ID:', req.params.id);
    next();
}, function (req, res, next) {
    res.send('User Info');
});

// 处理 /user/:id， 打印出用户 id
app.get('/user/:id', function (req, res, next) {
    res.end(req.params.id);
});


// 一个中间件栈，处理指向 /user/:id 的 GET 请求
app.get('/user/:id', function (req, res, next) {
    // 如果 user id 为 0, 跳到下一个路由
    if (req.params.id == 0) next('route');
    // 否则将控制权交给栈中下一个中间件
    else next(); //
}, function (req, res, next) {
    // 渲染常规页面
    res.render('regular');
});

// 处理 /user/:id， 渲染一个特殊页面
app.get('/user/:id', function (req, res, next) {
    res.render('special');
});


//路由级中间件
//路由级中间件和应用级中间件一样，只是他绑定的对象为express.Router()
var router = express.Router();
//上述在应用级创建的中间件系统，可通过如下代码改写为路由级：
var app = express();
var router = express.Router();
//没有挂载路径的中间件，通过该路由的每个请求都会执行中间件
router.use((req,res,next)=>{
    console.log('Time:', Date.now());
    next();
});

//一个中间件栈，显示任何指向/user/:id的 HTTP 请求的信息
router.get('/user/:id',(req,res,next)=>{
    console.log('Request URL:', req.originalUrl);
    next();
});

//一个中间件栈，处理指向/user/:id的GET请求
router.get('/user/:id',(req,res,next)=>{
    //如果user id 为0，跳到下一个路由
    if(req.params.id==0) next("route");
    //负责将控制权交给栈中下一个中间件
    else next();
}),function(req,res,next){
    //渲染常规页面
    res.render('regular');
};

//处理/user/:id,渲染一个特殊页面
router.get('/user/:id',(req,res,next)=>{
    console.log(req.params.id);
    res.render("special");
});

//将路由挂载至应用
app.use('/',router);





//错误处理中间件
//错误处理中间件和其他中间件定义类似，只是要使用4个参数，而不是三个
//其签名如下：（err,req,res,next）
app.use(function(err,req,res,next){
    console.error(err.stack);
    res.status(500).send('Something broke!');
});





//内置中间件
//(从 4.x 版本开始，, Express 已经不再依赖 Connect 了。除了 express.static, Express 以前内置的中间件现在已经全部单独作为模块安装使用了)
//下面示例使用了express。static中间件，其中的options对象经过了精心的设计
var options = {
    dotfiles:'ignore',
    etag: false,
    extensions:['htm','html'],
    Index:false,
    maxAge:"1d",
    redirect:false,
    setHeaders:function(res.path,stat){
    res.set("x-timestamp",Date.now());
    }
}
app.use(express.static('public',option));
//每个应用可有多个静态目录。
app.use(express.static('public'));
app.use(express.static('uploads'));
app.use(express.static('files'));





//第三方中间件
//下面的例子安装并加载了一个解析 cookie 的中间件： cookie-parser

//  $ npm install cookie-parser
var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');

// 加载用于解析 cookie 的中间件
app.use(cookieParser());

app.listen(3000)