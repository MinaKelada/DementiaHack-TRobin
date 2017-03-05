var db = require('../db.js');
var mongoose = require('mongoose')
var crypto = require('crypto'); // for passwords

var mongoCollection = "Task"; // change to required collection in database

var Task_Schema = new mongoose.Schema( {
  taskName: { type:String, required:true},
  teamid:{type:String, required:true},
  taskInstruction: { type:String, required:true},
  taskStartTime:{type:String, required:true},
  taskEndTime:{type:String, required:true},
  assigneeId:{type:String,required:true},
  comments:[
	{
		timeCreated:{type:String, required:true},
		commenterId:{type:Number,required:true},
		content:{type:String, required:true}
	}
  ],
  recurring:{type:String,required:true}
}, { collection: mongoCollection });

var Task = module.exports = mongoose.model('Task', Task_Schema);

module.exports.getAll = (callback,limit)=>{
	Task.find(callback).limit(limit);
};

module.exports.getOneById = (id,callback)=>{
	Task.findById({_id:id},callback);
}

module.exports.createTask = (newTask,callback)=>{
	Task.create(newTask,callback);
}

module.exports.editAllTask = (id,eTask,callback)=>{
	if(!(eTask.TaskName&&eTask.taskInstruction
	&&eTask.taskStartTime&&eTask.taskEndTime&&eTask.reoccuring&&eTask.assigneeId)){
		return err;
	}
	var query = {_id:id};
	Task.findByIdAndUpdate(query, 
	{$set:{
		taskName:eTask.TaskName,
		taskInstruction:eTask.taskInstruction,
		taskStartTime : eTask.taskStartTime,
		taskEndTime : eTask.taskEndTime,
		reoccuring:eTask.reoccuring,
		assigneeId:eTask.assigneeId
	}}
	,{},callback);
}
module.exports.editNameTask = (id,eTask,callback)=>{
	var query = {_id:id};
	Task.findByIdAndUpdate(query, 
	{$set:{
		taskName:eTask.TaskName
	}}
	,{},callback);
}
module.exports.editInstructionsTask = (id,eTask,callback)=>{
	var query = {_id:id};
	Task.findByIdAndUpdate(query, 
	{$set:{
		taskInstruction:eTask.taskInstruction
	}}
	,{},callback);
}
module.exports.editStartTask = (id,eTask,callback)=>{
	var query = {_id:id};
	Task.findByIdAndUpdate(query, 
	{$set:{
		taskStartTime : eTask.taskStartTime
	}}
	,{},callback);
}
module.exports.editEndTask = (id,eTask,callback)=>{
	var query = {_id:id};
	Task.findByIdAndUpdate(query, 
	{$set:{
		taskEndTime : eTask.taskEndTime
	}}
	,{},callback);
}
module.exports.editReoccuringTask = (id,eTask,callback)=>{
	var query = {_id:id};
	Task.findByIdAndUpdate(query, 
	{$set:{
		reoccuring:eTask.reoccuring
	}}
	,{},callback);
}
module.exports.editAssigneeTask = (id,eTask,callback)=>{
	var query = {_id:id};
	Task.findByIdAndUpdate(query, 
	{$set:{
		assigneeId:eTask.assigneeId
	}}
	,{},callback);
}

module.exports.getReoccuringDaily = (id, callback)=>{
	Task.find({'teamid':id, 'recurring':'Daily'},callback);
}
module.exports.getReoccuringWeekly = (id, callback)=>{
	Task.find({'teamid':id, 'recurring':'Weekly'},callback);
}