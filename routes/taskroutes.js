var express = require('express');
var router = express.Router();
var Task = require('../models/task.js');
var bodyparser = require('body-parser');
var async = require('async');
var distance = require('google-distance');
exports.index = function(req, res){
  res.render('index', {title: 'Express' });
};

module.exports = router;
router.use(bodyparser.json());

router.route('/').get(
	(req,res)=>{
		Task.getAll((err,data)=>{
			if(err) return err;
			res.json(data);
		});
	}
);
router.route('/One').get(
	(req,res)=>{
		var id = req.query.taskId;
		Task.getOneById(id,(err,data)=>{
			if(err) return err;
			res.json(data);
		});
	}
);

router.route('/Daily').get(
	(req,res)=>{
		var id = req.query.teamId;
		Task.getReoccuringDaily(id,(err,data)=>{
			if(err) return err;
			res.json(data);
		});
	}
);
router.route('/Weekly').get(
	(req,res)=>{
		var id = req.query.teamId;
		Task.getReoccuringWeekly(id,(err,data)=>{
			if(err) return err;
			res.json(data);
		});
	}
);
router.route('/').post(
	(req,res)=>{
		var newTask = req.body;
		Task.createTask(newTask,(err,data)=>{
			if(err) return console.log(err);
			res.json(data);
		});
});
router.route('/').put(
	(req,res)=>{
		var id = req.query.taskId;
		var editTask = req.body;
		Task.editAllTask(id,editTask,(err,data)=>{
			if(err) console.log(err);
			res.json(data);
		});
});
router.route('/Name').put(
	(req,res)=>{
		var id = req.query.taskId;
		var editTask = req.body;
		Task.editNameTask(id,editTask,(err,data)=>{
			if(err) console.log(err);
			res.json(data);
		});
});
router.route('/Start').put(
	(req,res)=>{
		var id = req.query.taskId;
		var editTask = req.body;
		Task.editStartTask(id,editTask,(err,data)=>{
			if(err) console.log(err);
			res.json(data);
		});
});
router.route('/End').put(
	(req,res)=>{
		var id = req.query.taskId;
		var editTask = req.body;
		Task.editEndTask(id,editTask,(err,data)=>{
			if(err) console.log(err);
			res.json(data);
		});
});
router.route('/End').put(
	(req,res)=>{
		var id = req.query.taskId;
		var editTask = req.body;
		Task.editInstructionsTask(id,editTask,(err,data)=>{
			if(err) console.log(err);
			res.json(data);
		});
});
router.route('/Reoccuring').put(
	(req,res)=>{
		var id = req.query.taskId;
		var editTask = req.body;
		Task.editReoccuringTask(id,editTask,(err,data)=>{
			if(err) console.log(err);
			res.json(data);
		});
});
router.route('/Assignee').put(
	(req,res)=>{
		var id = req.query.taskId;
		var editTask = req.body;
		Task.editReoccuringTask(id,editTask,(err,data)=>{
			if(err) console.log(err);
			res.json(data);
		});
});