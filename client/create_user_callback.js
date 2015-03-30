Accounts.createUser = _.wrap(Accounts.createUser, function(createUser) {

  // Store the original arguments
  var args = _.toArray(arguments).slice(1),
      user = args[0],
      origCallback = args[1];

  // Create a new callback function
  // Could also be defined elsewhere outside of this wrapped function
  // This is called on the client
  var newCallback = function(err) {
    if (err) {
      if(err.reason == 'Login forbidden') { //because createUser is called on the server, it tries to login right away, which we don't want since we are using sendVerificationEmail
        Router.go('/');
        AppMessages.throw('Account created. Check your email for a login verification link', 'success');
      }
      else {
        AppMessages.throw(err.reason, 'danger');
      }
    } else {
        Router.go('/');
        AppMessages.throw('Account created. Check your email for a login verification link', 'success');
    }
  };

  // Now call the original create user function with
  // the original user object plus the new callback
  createUser(user, newCallback);

});