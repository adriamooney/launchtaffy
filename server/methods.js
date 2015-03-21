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
          } else {
            // Success. Account has been created and the user
            // has logged in successfully. 
            console.log('success');
          }

        });
  },
  updateSalesUser: function(id, profile) {
    Meteor.users.update( {_id: id}, {$set: {profile: profile}});
  }
});

