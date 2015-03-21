Template.userSignup.events({
'submit form': function(event, template){
    event.preventDefault();
    var emailVar = event.target.email.value;
    var passwordVar = event.target.password.value;


    Accounts.createUser({
        email: emailVar,
        password: passwordVar,
        profile: {userType: 'salesperson'}
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


    Accounts.createUser({
        email: emailVar,
        password: passwordVar,
        profile: {userType: 'company'}
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