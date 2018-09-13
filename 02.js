var express = require("express");
var app = express();
//app.get(/^\/student\/([\d]{3})$/,(req,res)=>{
//    console.log(req.params);
//    res.send("学生的Id"+req.params[0])
//}).listen(3000)

//params 截取参数
//app.get("/teacher/:gonghao",function(req,res){
//    res.send("老师的工号是"+req.params.gonghao)
//}).listen(3000)


app.get("/teacher/:aa",(req,res)=>{
    res.send("老师的工号是"+req.params.aa)
}).listen(3000)