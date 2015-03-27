Meteor.methods({
	sendInitialEmail: function(result) {
		return Accounts.sendEnrollmentEmail(result);
	},
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
  },
  approveSalesPerson: function(companyId, userId) {
    //Meteor.users.update({_id: userId}, {$addToSet: {'profile.approvedCompanies': {'company': companyId
    Meteor.users.update({_id: userId}, {$addToSet: {'profile.approvedCompanies': companyId}});  
  },
  removeSalesPerson: function(companyId, userId) {
   // Meteor.users.update({_id: userId}, {$pull: {'profile.approvedCompanies': {'company': companyId}}});
   Meteor.users.update({_id: userId}, {$pull: {'profile.approvedCompanies': companyId}});
  }
});

