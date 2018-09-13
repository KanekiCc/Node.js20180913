/*
* express 加载 ejs
* */

var express = require("express");
var app = express();
//设置模板引擎    放置模板的文件夹必须为views
app.set("view engine","ejs")
app.get("/",(req,res)=>{
    res.render("new",{  //new  渲染模板
        news:[ //news  渲染的数据
            {"title":"首页"},
            {"title":"关于"},
            {"title":"新闻"}
        ]
    })

}).listen(3000)