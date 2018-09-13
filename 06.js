/*
*
* 此案例讲解app.use 及默认路径*/
var express = require("express");
var app = express();

//如果路径里面没有任何东西时，那么默认的路径为“/”
//next()是一个执行函数

app.use((req,res,next)=>{
    res.send("data")
})

app.use((req,res,next)=>{
    console.log(new Date());
    next()
})

app.get("/admin",(req,res)=>{
    console.log(req.originalUrl); //输出所有路径地址
    console.log(req.baseUrl);    //nothing
    console.log(req.path);  //原始输出admin  原始路径
    res.end("data")
})
app.listen(3000)