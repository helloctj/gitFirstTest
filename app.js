var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var pageRouter = require('./routers/pageRouter.js');
var apiRouter = require('./routers/apiRouter.js');
var adminRouter = require('./routers/adminRouter.js');

var app = express();

app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

app.set('views', './views');
app.set('view engine', 'ejs');

app.use('/', pageRouter);
app.use('/api', apiRouter);
app.use('/admin', adminRouter);

app.use((req, res) => {
	res.redirect('/index');
})

mongoose.connect('mongodb://localhost:27017/wabao', (err) => {
	if(err){
		console.log('数据库连接失败');
	}else{
		console.log('数据库连接成功');

		app.listen(3000, 'localhost', (err) => {
			if(err){
				console.log('服务未开启');
			}else{
				console.log('服务已开启');
			}
		})
	}
})
