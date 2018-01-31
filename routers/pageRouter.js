var express = require('express');
var Map = require('../models/map.js');
var router = express.Router();

router.get('/index', (req, res) => {
	// console.log(req.cookies);
	res.render('index', {
		title: 'hello index',
		userInfo: req.cookies.userInfo && JSON.parse(req.cookies.userInfo)
		//如果找不到返回前面的空；找到了返回解析后的
	});
})

router.get('/login', (req, res) => {
	res.render('login', {
		title: 'hello login'		
	});
})

router.get('/reg', (req, res) => {
	res.render('reg', {
		title: 'hello reg'		
	});
})

router.get('/play', (req, res) => {
	isSkipLogin(req, res);
	Map.find({}).then((mapInfo) => {	//读取数据库中所有地图信息
		res.render('play', {
			title: 'hello play',
			list: mapInfo	
		});
	});
})

router.get('/info', (req, res) => {
	res.render('info', {
		title: 'hello info'		
	});info
})

function isSkipLogin(req, res){
	if(!req.cookies.userInfo){
		res.redirect('/index');
	}
}

module.exports = router;