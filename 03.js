/*
* 静态资源目录  static  public
* */
var express = require("express");
var app = express();
app.use("/",express.static("./public"));  //静态资源加载    默认index.html
app.listen(3000);

