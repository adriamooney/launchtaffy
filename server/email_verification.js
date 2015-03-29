Accounts.onCreateUser(function(options, user) {

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
    Meteor.setTimeout(function() {
      Accounts.sendVerificationEmail(user._id);
    }, 2 * 1000);

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

