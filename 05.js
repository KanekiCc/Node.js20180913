/*
* */
var express = require("express");
var app = express();

//在地址栏内无视大小写  /Ab /ab /AB ... 都可输出
app.get("/Ab",(req,res)=>{
    res.send("data")
});


app.get("/student/:id",(req,res)=>{
    var id = req.params.id;
    var reg = /^\d{5}$/.test(id);
    if(reg){
        res.send("学员ID"+id)
    }else{
        res.send("error")
    }
});


app.get("/:username/:uid",(req,res)=>{
    var username = req.params["username"];
    var uid = req.params["uid"];
    res.write(username)
    //如果写成send 会出现报错 "Can`t set headers after they are sent"
    res.end(uid)
})
app.listen(3000)
