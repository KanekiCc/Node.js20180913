//在 Express 中使用模板引擎
var express = require('express');
var app = express();
//app.set('views','./views');
app.set('view engine','jade');
app.listen(3000)
