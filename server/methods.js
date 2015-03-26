Meteor.methods({
	sendInitialEmail: function(result) {
		return Accounts.sendEnrollmentEmail(result);
	},
	/*createNewCompanyUser: function (email,result) {
    // i recommend to create user with initial password otherwise it will be empty string
   // Meteor.call("validateEmail", email);  TODO: make this method
    var userId = Accounts.createUser({email:email, password: 'password', profile: {companyId: result, userType: 'company'} });

    Accounts.sendEnrollmentEmail(userId);
  }, */
  createNewSalesUser: function(email, password, username) {
  		//check(doc, Schema.User);
  	   Accounts.createUser({email: email, password : password, username: username, profile: {userType: 'salesperson', isActive: true, profileStatus: 0}});
  }, 
  createNewCompanyUser: function(email, password, username) {
    Accounts.createUser({email: email, password : password, username: username, profile: {userType: 'company', isActive: true, profileStatus: 0}});
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
  deleteMessage: function(id) {
    Messages.remove(id);
  },
  archiveMessage: function(id) {
    Messages.update({_id:id}, {$set: {'status': 'archived'}});
  },
  unarchiveMessage: function(id) {
    Messages.update({_id:id}, {$set: {'status': 'read'}});
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

