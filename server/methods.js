Meteor.methods({
	sendInitialEmail: function(result) {
		return Accounts.sendEnrollmentEmail(result);
	},
	createNewCompanyUser: function (email,result) {
    // i recommend to create user with initial password otherwise it will be empty string
   // Meteor.call("validateEmail", email);  TODO: make this method
    var userId = Accounts.createUser({email:email, password: 'password', profile: {companyId: result, userType: 'company'} });

    Accounts.sendEnrollmentEmail(userId);
  },
  createNewSalesUser: function(doc) {
  		check(doc, Schema.User);

  		var email = doc.email;
  		var password = doc.password;

  		Accounts.createUser({email: email, password : password}, function(err){
          if (err) {
            // Inform the user that account creation failed
            console.log(err);
            AppMessages.throw(err.reason, 'danger');
          } else {
            // Success. Account has been created and the user
            // has logged in successfully. 
            AppMessages.throw('New user created', 'success');
            console.log('success');
          }

        });
  },
  updateSalesUser: function(id, profile) {
    Meteor.users.update( {_id: id}, {$set: {profile: profile}});
  },
  sendMessage: function(senderId, toId, msg) {
    //senderId, companyId, msg
    var now = new Date().getTime();
    Messages.insert({'message': msg, 'from': senderId, 'to': toId, 'status': 'unread', 'timeStamp': new Date(now - 7 * 3600 * 1000)} );
  },
  replyToMessage: function(id, senderId, toId, msg) {
    Messages.update( {_id: id}, {$push: {'replies': {'to': toId, 'status': 'unread', 'message': msg, 'from': senderId} }});
  },
  sendEmail: function (to, from, subject, text) {
    check([to, from, subject, text], [String]);

    // Let other method calls from the same client start running,
    // without waiting for the email sending to complete.
    this.unblock();
    return Meteor.Mandrill.send({
        to: to,
        from: from,
        subject: subject,
        text: text
    });

    /*Email.send({
      to: to,
      from: from,
      subject: subject,
      text: text
    }); */
  }
});

