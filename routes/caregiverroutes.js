var express = require('express');
var router = express.Router();
var Caregiver = require('../models/caregiver.js');
var bodyparser = require('body-parser');
var async = require('async');
var distance = require('google-distance');
var nodemailer = require('nodemailer');
var Promise = require('bluebird');

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


router.route('/filter').get((req,res)=>{
  var userId = req.query.userId;
  var maxDistance = req.query.dis;
  if(!maxDistance) maxDistance = 50
  maxDistance *= 1000;
  if(!userId){
	  res.json({"Error":"Please Enter User Id in URL"})
  }
  var attributeArr = req.query.attributes;
  var currentUser;
  var allUsers;
  var usersInRange = [];
  var validUsers = [];
  new Promise((resolve,reject)=>{
    Caregiver.findById(userId,(err,data)=>{
      if(err) return err;
      currentUser = data;
      resolve();
    })//end of find current user;
    .then(()=>{
      new Promise((resolve,reject)=>{
        Caregiver.getAllHire((err,data)=>{
          if(err) return err;
          allUsers = data;
          resolve();
        });//end of caregiver get all
      })//nested promise -_-
      .then(()=>{
        async.each(allUsers,(allUsersResult,asyncCallback)=>{
          distance.get({
            origin:currentUser.pcode,
            destination:allUsersResult.pcode
          },(err,data)=>{
            if(data.distanceValue < maxDistance){
              var j = {};
              j.pcode = allUsersResult.pcode;
              j.distance = data.distanceValue;
              j.first_name = allUsersResult.first_name;
              j.last_name = allUsersResult.last_name;
			  j.attributes = allUsersResult.attributes;
              usersInRange.push(j);
            }
            asyncCallback();
          });//end of distance.get
        }, (err,asyncResult)=>{
          res.json(usersInRange);
        });//end of distance async.each
      })//getting distances
    })//end of getting all user data;
  });//end of outer promise
});//end of filteredCaregiver route

router.route('/').get((req,res)=>{
	Caregiver.getAll((err,data)=>{
		if(err) return err;
		res.json(data);
	});
}).post((req,res)=>{
	var newCare = req.body;
	Caregiver.addCaregiver(newCare,(err,data)=>{
		if(err) return err;
		res.json(data);
	});
});
router.route('/One').get((req,res)=>{
	var id = req.query.userId;
	Caregiver.getOneById(id,(err,data)=>{
		if(err) return err;
		res.json(data);
	});
}).post((req,res)=>{
	var newCare = req.body;
	Caregiver.addCaregiver(newCare,(err,data)=>{
		if(err) return err;
		res.json(data);
	});
});
router.route("/PushAttribute").put((req,res)=>{
		var id = req.query.userId;
		Caregiver.setAttribute(id, {name:req.query.att}, (err,data)=>{
			if(err) return err;
			res.json(data);
		});
});
router.route("/ChangeAttribute").put((req,res)=>{
		var id = req.query.userId;
		var attId = req.query.attId;
		var attName = req.query.attName;
		Caregiver.changeAttribute(id,attId,attName,(err,data)=>{
			console.log(err);
			console.log(data);
			if(err) return err;
			res.json(data);
		});
});
router.route("/RemoveAttribute").put((req,res)=>{
		var id = req.query.userId;
		var attId = req.query.attId;
		Caregiver.RemoveAttribute(id, attId, (err,data)=>{
			if(err) return err;
			res.json(data);
		});
});
router.route("/initAttribute").put((req,res)=>{
	var id = req.query.userId;
	Caregiver.initAttribute(id,(err,data)=>{
		if(err) console.log(err);
		res.json(data);
	});
});
router.route("/maxTeamId").get((req,res)=>{
	Caregiver.getHighestTeamId((err,data)=>{
		if(err) return console.log(err);
		console.log(data);
		res.json(data);
	});
	
});
router.route("/sendInvite").get((req,res)=>{
	var inviteeId = req.query.inviteeId;
	var inviterId = req.query.inviterId;
	var currentUser;
	var inviteeUser;
	new Promise((resolve,reject)=>{
		Caregiver.getOneById(inviterId,(err,data)=>{
			if (err) return console.log(err);
			currentUser = data;
			resolve();
		});
	}).then(()=>{
			new Promise((resolve,reject)=>{
				Caregiver.getOneById(inviteeId,(err,data)=>{
					if(err) return console.log(err);
					inviteeUser = data;
					console.log(inviteeUser);
					resolve();
				});
			})	.then(()=>{
		console.log(currentUser);
		console.log(inviteeUser);
		var transporter = nodemailer.createTransport({
			service:"gmail",
			auth:{
				user:"glitchedbrownie@gmail.com",
				pass:"NotAGreatPass13"
		}});
		var mailOptions = {
			from:currentUser.email,
			to:inviteeUser.email,
			subject:"Team Invite",
			Text: "You've been invited to a team",
			html:'<a href="http://bolgarov.zapto.org:11038/api/caregiver">click</a>'
		};
		transporter.sendMail(mailOptions,(err,info)=>{
			if(err) return console.log(err);
			console.log("Message Sent From: " + currentUser.email + " to " + inviteeUser.email);
			res.json({'Sent':'Mail'});
		});
	});
	})

});

router.route('/createTeam').put((req,res)=>{
	var primaryId = req.query.pId;
	var secondaryId = req.query.sId;
	var primaryCare;
	var secondaryCare;
	new Promise((resolve,reject)=>{
		Caregiver.findById(primaryId,(err,data)=>{
			if(err) return err;
			primaryCare = data;
			resolve();
		});
	})//end of outer promise
	.then(()=>{
		new Promise((resolve,reject)=>{
			Caregiver.findById(secondaryId,(err,data)=>{
				if(err) return err;
				secondaryCare = data;
				resolve();
			});
		})//inner promise
		.then(()=>{
			console.log(primaryCare);
			console.log(secondaryCare);
			if(primaryCare.teamid){
				console.log("entered");
				Caregiver.pushTeam(secondaryCare._id,primaryCare.teamid,(err,data)=>{
					if(err) return console.log(err);
					res.json(data);
				});
			}
			else{
				var newTeamId;
				new Promise((resolve,reject)=>{
					
				});
			}
		})//then responsible for checking
	});//first then getting second care
	
});

router.route('/getTeamList').get((req,res)=>{
	var userId = req.query.userId;
	var care;
	new Promise((resolve,reject)=>{
		Caregiver.findById(userId,(err,data)=>{
			if(err) return err;
			care = data;
			resolve();
		});
	}).then(()=>{
		Caregiver.findTeamMembers(care.teamid, (err,data)=>{
			if(err)return err;
			res.json(data);
		});
	});
	
});