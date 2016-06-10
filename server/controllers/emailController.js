var mailer = require('nodemailer');
var transporter = mailer.createTransport({
	service: 'Gmail',
	auth: {
		user: 'devtestdr@gmail.com',
		pass: 'testthisdoe'
	}
});

exports.sendEmail = function(req , res){
 transporter.sendMail({
          from: req.body.sender,
          to: req.body.receiver,
          subject: req.body.sub,
          text: req.body.notes
        }, function(error){
        	console.log(error)
        });
}
