var express = require('express');
var router = express.Router();
var mysql = require("./mysql");

router.post('/getRequest', function (req, res, next) {

	var reqUserId = req.body.userId;
	var getRequest = "SELECT * FROM requests WHERE createdby = '"+reqUserId+"' AND deleteflag=0";
	console.log("query is :" +getRequest);
	
	mysql.fetchData(function(err, result){
		if(err){
			throw err;
		}
		else{
			if(result.length>0){
				console.log('Requests fethced');
				res.status(200).json({result});
				
			}
			else
			{
				console.log("No requests");
				res.status(400).json({message: "No requests"});
			}
		}
	},getRequest);
});

router.post('/createRequest', function (req, res, next) {
	
		var reqsubject = req.body.payload.subject;
		var reqdescription = req.body.payload.description;
		var reqassignedTo = req.body.payload.assignedTo;
		// var reqdepartment = req.body.payload.department;
		var generatedDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
		var reqcreatedby = req.body.userId;

		var createRequest = "INSERT INTO requests(description, assignedto, subject, createdby, generated_date, resolved_date) Values ('"+reqdescription+"','"+reqassignedTo+"','"+reqsubject+"','"+reqcreatedby+"', '"+generatedDate+"', '"+generatedDate+"')";
		console.log("query is :" +createRequest);
		
		mysql.fetchData(function(err, result){
			if(err){
				throw err;
			}
			else{
				if(err){
					throw err;
				}
				else{
					console.log('Request Created');
					res.status(200).json({message: "Request creation successful"});
				}
			}
		},createRequest);
	});

	router.post('/completeRequest', function (req, res, next) {
		
			var reqid = req.body.requestItem.requestid;
	
			var createRequest = "UPDATE requests SET status = 'RESOLVED' WHERE requestid= '"+reqid+"'";
			console.log("query is :" +createRequest);
			
			mysql.fetchData(function(err, result){
				if(err){
					throw err;
				}
				else{
					if(err){
						throw err;
					}
					else{
						console.log('Request Created');
						res.status(200).json({message: "Request creation successful"});
					}
				}
			},createRequest);
		});

	router.post('/getAssignedToMe', function (req, res, next) {
		
			var reqUserEmail = req.body.userId;
			// var reqUserEmail = "t@gmail.com";
			var getRequest = "SELECT * FROM requests WHERE assignedto = '"+reqUserEmail+"' AND deleteflag=0 AND status != 'resolved'";
			console.log("query is :" +getRequest);
			
			mysql.fetchData(function(err, result){
				if(err){
					throw err;
				}
				else{
					if(result.length>0){
						console.log('Requests fethced');
						res.status(200).json({result});
						
					}
					else
					{
						console.log("No requests");
						res.status(400).json({message: "No requests"});
					}
				}
			},getRequest);
		});

module.exports = router;