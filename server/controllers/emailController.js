var Session = require('../models/SessionModel.js');
var User = require('../models/UserModel.js');
var mailer = require('nodemailer');

var transporter = mailer.createTransport({
	service: 'Gmail',
	auth: {
		user: 'devtestdr@gmail.com',
		pass: 'testthisdoe'
	}
});

exports.sendEmail = function(req, res) {
  Session.where({ id: req.body.sessionId }).fetch()
   .then(function(session){
    	User.where({ id: session.attributes.interviewerId }).fetch()
    	.then(function(user){
      console.log('USER------', user.attributes);
			 transporter.sendMail({
			          from: user.attributes.email,
			          to: req.body.receiver,
			          subject: req.body.sub,
			          text: req.body.notes
			        }, function(error){
			        	console.log(error)
			        });
    		
    	})
    })   
  }



