var express = require('express');
var router = express.Router();
var Caregiver = require('../models/caregiver.js');
var bodyparser = require('body-parser');
var async = require('async');
var distance = require('google-distance');
exports.index = function(req, res){
  res.render('index', {title: 'Express' });
};

module.exports = router;
router.use(bodyparser.json());

/*router.route("/")
.get((req, res) => {

  Caregiver.find({}, (err, caregivers) => {

    console.log("error: " + err);
    console.log("caregiver: " + caregivers);

  });

});*/

router.route("/insert")
.get((req, res) => {

  var caregiver = new Caregiver({
    first_name: "test",
    last_name: "test",
    pcode: "test",
    attributes: [
      {name: "testattr"},
      {name: "testattr2"},
    ],
    forHire: false,
    language: "english"
  });

  caregiver.save((err, result) => {
  
    console.log(err);
    console.log(result);

  });

});

router.route('/').get((req,res)=>{
  res.json({'Working?':'working!'});
});

router.route('/Attributes').get((req,res)=>{
  Attributes.getAll((err,data)=>{
    if(err) return err;
    res.json(data);
  });
});
router.route('/Attributes').post((req,res)=>{
	var at = req.body;
	Attributes.addAttribute(at,(err,data)=>{
		if(err) return err;
		res.json(data);
	});
});
