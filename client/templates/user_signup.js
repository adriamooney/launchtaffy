Template.userSignup.events({
'submit form': function(event, template){
    event.preventDefault();
    var emailVar = event.target.email.value;
    var passwordVar = event.target.password.value;
    var username = event.target.username.value;


    Accounts.createUser({
        email: emailVar,
        password: passwordVar,
        username: username,
        profile: {userType: 'salesperson', isActive: 'true'}
    }, function() {
        Router.go('/');
    }); 
    }
});  

Template.companyUserSignup.events({
'submit form': function(event, template){
    event.preventDefault();
    var emailVar = event.target.email.value;
    var passwordVar = event.target.password.value;
    var username = event.target.username.value;


    Accounts.createUser({
        email: emailVar,
        password: passwordVar,
        username: username,
        profile: {userType: 'company', isActive:'true'}
    }, function() {
        Router.go('/');
    }); 
    }
});  



/*Template.userSignup.helpers({
  userJoinSchema: function() {
    return Schema.UserJoin;
  }
}); */