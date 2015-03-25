Template.login.events({
    'submit form': function(event, template){
        event.preventDefault();
        var emailVar = template.find('#login-email').value;
        var passwordVar = template.find('#login-password').value;
        Meteor.loginWithPassword(emailVar, passwordVar, function(err) {
        	console.log(err);
        	if (err) {
	            // Inform the user that account creation failed
	            AppMessages.throw(err.reason, 'danger');
	          } 
        });
    },
    'click #forgot-password': function(event, template) {
        e.preventDefault();
        //TODO: all this stuff
        /*Accounts.forgotPassword(email, function(err) {

        }); */
    } 
});