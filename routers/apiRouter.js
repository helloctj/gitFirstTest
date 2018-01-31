var express = require('express');
var User = require('../models/user.js');
var Map = require('../models/map.js');
var router = express.Router();

router.post('/reg', (req, res) => {
	// console.log(req.body);
	var username = req.body.username;
	var password = req.body.password;
	var repassword = req.body.repassword;

	if(username === ''){
		res.send('<script>alert("用户名不能为空！");history.back();</script>');
	}else if(password === '' || repassword === ''){
		res.send('<script>alert("密码不能为空！");history.back();</script>');
	}else if(password !== repassword){
		res.send('<script>alert("两次密码输入不一致");history.back();</script>');
	}

	User.findOne({
		username: username
	}).then((userInfo) => {
		if(userInfo){
			res.send('<script>alert("用户名已被注册！");history.back();</script>');
		}else{
			new User({
				username: username,
				password: password
			}).save().then(() => {
				res.send('<script>alert("注册成功");location.href = "/login";</script>');
			});
		}
	})
})

router.post('/login', (req, res) => {
	var username = req.body.username;
	var password = req.body.password;

	if(username === ''){
		res.send('<script>alert("请输入用户名！");history.back();</script>');
	}else if(password === ''){
		res.send('<script>alert("请输入密码！");history.back();</script>');
	}

	User.findOne({
		username: username,
		password: password
	}).then((userInfo) => {
		if(userInfo){
			var date = new Date();
			date.setDate(date.getDate() + 3);

			res.cookie('userInfo', JSON.stringify({
				_id: userInfo._id
				// _id: userInfo._id.toString()//是个对象
			}), {expires: date});

			res.send('<script>alert("登录成功");location.href = "/index";</script>');
		}else{
			res.send('<script>alert("登录失败！");history.back();</script>');
		}
	})
})

router.post('/createMap', (req, res) => {
	//创建地图
	var count = req.body.count;
			//	req.query.count 通常适用于get请求
	Map.remove({}).then(() => {
		//每次创建地图前要清空地图数据
		for(var i = 0 ; i < count ; i++){
			new Map({
				isCheck: false
			}).save();
		}	
		//创建地图成功，给后台一个反馈信息
		res.send(JSON.stringify({
			code: "0"
		}));
	});	

})

router.get('/winning', (req, res) => {
	//中奖
	var _id = req.query._id;
	Map.update({_id: _id}, {$set: {isCheck: true}}).then(() => {
		res.send(JSON.stringify({
			code: "0"
		}));
	});
})

module.exports = router;