var db = require('../db.js');
var mongoose = require('mongoose')
var crypto = require('crypto'); // for passwords
var Promise = require('bluebird');
mongoose.Promise = Promise;
var mongoCollection = "caregiver"; // change to required collection in database

var Caregiver_Schema = new mongoose.Schema( {
  first_name: { type:String, required:true},
  last_name: { type: String, required: true},
  pcode: { type: String, required: true},
  attributes: [
    {
      name: {type: String, required: true}
    }
  ],
  forHire: { type: String, required: true},
  language: { type: String, required: true},
  email:{type:String, required:true},
  teamid:{type:Number, required:false},
  rating:{type:Number, required:true}
}, { collection: mongoCollection });

var Caregiver = module.exports = mongoose.model(mongoCollection , Caregiver_Schema);

module.exports.getAll = (callback, limit)=>{
  Caregiver.find(callback).limit(limit);
};

module.exports.getAllHire = (callback, limit)=>{
  Caregiver.find({'forHire':'true'},callback);
};

module.exports.getOneById = (id,callback) =>{
  Caregiver.findById(id,callback);
}

module.exports.getOneByPostalCode = (postal, callback) =>{
  Caregiver.findOne({'pcode':postal}, callback);
}

module.exports.addCaregiver = (caregiver, callback) =>{
	Caregiver.create(caregiver,callback);
}

module.exports.setAttribute = (id,att,callback) =>{
	var query = {_id:id};
	Caregiver.findByIdAndUpdate(
	query,
	{$push:{"attributes":att}}
	,{/*safe:true, upsert:true*/},
	callback);
}
module.exports.changeAttribute = (id, attId, changedName, callback)=>{
	/*var originalCare = Caregiver.findById(id);
	var list = originalCare.attributes;
	var newList = list.filter((item)=>{
		return item.id !== attId;
	});
	var query = {_id:id};
	Caregiver.findByIdAndUpdate(query, );*/

}
module.exports.RemoveAttribute = (id,attId,callback) =>{
	var originalCare;
	Caregiver.findById(id,(err,data)=>{
	if (err) return err;
		originalCare = data;
		var list = originalCare.attributes;
		var newList = list.filter((item)=>{
			return item.id !== attId;
		});
		var query = {_id:id};
		Caregiver.findByIdAndUpdate(query, {$set:{attributes:newList}},{},callback);	
	}); 
}
module.exports.initAttribute = (id,callback) =>{
	var query = {_id:id};
	var update = {"attribute":[]};
	Caregiver.findByIdAndUpdate(
	query,
	update,
	{},
	callback
	)
}
module.exports.getHighestTeamId = (callback)=>{
	Caregiver.find(callback).sort({"teamid":-1}).limit(1)
}

module.exports.pushTeam = (id,teamid, callback)=>{
	var query = {_id:id};
	var update = {$set:{"teamid":teamid}};
	Caregiver.findByIdAndUpdate(query,update,{},callback);
}

module.exports.findTeamMembers = (teamId, callback)=>{
	Caregiver.find({"teamid":teamId},callback);
}