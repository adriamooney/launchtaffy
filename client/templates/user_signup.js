Template.userSignup.events({
'submit form': function(event, template){
    event.preventDefault();
    var emailVar = event.target.email.value;
    var passwordVar = event.target.password.value;
    var username = event.target.username.value;
    //TODO: NEEDS VALIDATION

    Meteor.call('createNewSalesUser', emailVar, passwordVar, username, function(error, result) {
          if (error) {
            // Inform the user that account creation failed
            AppMessages.throw(error.reason, 'danger');
          } else {
            // Success. Account has been created and the user
            // has logged in successfully. 
            AppMessages.throw('Account created. Check your email for a login verification link', 'success');
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
    Meteor.call('createNewCompanyUser', emailVar, passwordVar, username, function(error, result) {
          if (error) {
            // Inform the user that account creation failed
            AppMessages.throw(error.reason, 'danger');
          } else {
            // Success. Account has been created and the user
            // has logged in successfully. 
            AppMessages.throw('Account created. Check your email for a login verification link', 'success');
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