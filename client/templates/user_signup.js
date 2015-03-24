Template.userSignup.events({
'submit form': function(event, template){
    event.preventDefault();
    var emailVar = event.target.email.value;
    var passwordVar = event.target.password.value;
    var username = event.target.username.value;
    //TODO: NEEDS VALIDATION

    Accounts.createUser({
        email: emailVar,
        password: passwordVar,
        username: username,
        profile: {userType: 'salesperson', isActive: 'true', profileStatus: 0}
    }, function(err) {
        if (err) {
            // Inform the user that account creation failed
            AppMessages.throw(err.reason, 'danger');
          } else {
            // Success. Account has been created and the user
            // has logged in successfully. 
            AppMessages.throw('Account created', 'success');
            Router.go('/');
          }
        
    }); 
    }
});  

Template.companyUserSignup.events({
'submit form': function(event, template){
    event.preventDefault();
    var emailVar = event.target.email.value;
    var passwordVar = event.target.password.value;
    var username = event.target.username.value;
    //TODO: NEEDS VALIDATION

    Accounts.createUser({
        email: emailVar,
        password: passwordVar,
        username: username,
        profile: {userType: 'company', isActive:'true', profileStatus: 0}
    }, function(err) {
        if (err) {
            // Inform the user that account creation failed
            AppMessages.throw(err.reason, 'danger');
          } else {
            // Success. Account has been created and the user
            // has logged in successfully. 
            AppMessages.throw('Account created', 'success');
            Router.go('/');
          }
    }); 
    }
});  



/*Template.userSignup.helpers({
  userJoinSchema: function() {
    return Schema.UserJoin;
  }
}); */