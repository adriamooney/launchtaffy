Template.login.events({
    'submit form': function(event, template){
        event.preventDefault();
        var emailVar = template.find('#login-email').value;
        var passwordVar = template.find('#login-password').value;
        Meteor.loginWithPassword(emailVar, passwordVar, function(err) {
        	if (err) {
	            // Inform the user that account creation failed
	            AppMessages.throw(err.reason, 'danger');
	       } 
           else {
            Router.go('/');
           }
        });
    }
});
//check here for more stuff to do. good article on how to set up custom accounts flow.  
//http://blog.benmcmahen.com/post/41741539120/building-a-customized-accounts-ui-for-meteor

Template.forgotPassword.events({
    'submit form': function(event, template) {
        event.preventDefault();
        var email = template.find('#forgot-email').value;
        console.log(email);
        Accounts.forgotPassword({email: email}, function(err) {
            if (err) {
                // Inform the user that account creation failed
                AppMessages.throw(err.reason, 'danger');
            } 
            else {
                 AppMessages.throw('An email has been sent to you with a link to reset your password.', 'success');
            }
        });
    }
});