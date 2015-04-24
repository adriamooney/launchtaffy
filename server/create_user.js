Accounts.onCreateUser(function(options, user) {

  /*if (user.services.linkedin) {
      var email = user.services.linkedin.emailAddress;
      Meteor.users.update({_id: user._id}, { $addToSet: { 'emails.address': {'address': email, 'verified': true} }});
  } */
    var linkedin = user.services.linkedin;
    if(linkedin) {
      var email = user.services.linkedin.emailAddress;
    }

    if (user.emails) {
      var accountEmail = user.emails[0].address;
      console.log(accountEmail);
    }
    

    if(accountEmail) {//if already signed up with linkedin signup form, this prevent account signup
      var emailAlreadyExist = Meteor.users.find({"profile.emailAddress": accountEmail}, {limit: 1}).count()>0
      console.log(emailAlreadyExist);
      if(emailAlreadyExist === true) {
          throw new Meteor.Error(403, "Email already registered");
      }
    }
    

    if(email) {  //if already signed up with account signup form, this prevent linkedin signup
        var emailAlreadyExist = Meteor.users.find({"emails.address": email}, {limit: 1}).count()>0

        console.log(emailAlreadyExist);

      if(emailAlreadyExist === true) {
          throw new Meteor.Error(403, "Email already registered");
      }
    }


    if(!options.profile) {
      options.profile = {};
    }

    var userType = ServerSession.get('userType');
    //console.log(profile);
    if(userType) {
      options.profile.userType = userType;
    }
    options.profile.isActive = true;
    options.profile.profileStatus = 0;

    if (options.profile) {
        user.profile = options.profile;
    }

    // we wait for Meteor to create the user before sending an email
   /* Meteor.setTimeout(function() {
      Accounts.sendVerificationEmail(user._id);
    }, 2 * 1000); */

  return user;
});

// (server-side) called whenever a login is attempted
Accounts.validateLoginAttempt(function(attempt){
  if (attempt.user && attempt.user.emails && !attempt.user.emails[0].verified ) {
    console.log('email not verified');

    return false; // the login is aborted
  }
  return true;
}); 


Accounts.config({sendVerificationEmail: true});


Accounts.onLogin(function(options) {
    //var user = Meteor.userId();
    //Router.go('/dashboard/');  //does this cause the problem of redirecting on refresh?
   console.log('hi');

});


