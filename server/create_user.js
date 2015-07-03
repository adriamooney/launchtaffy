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
      //options.profile.emailAddress = accountEmail;  //this causes an error
      //console.log(accountEmail);
    }
    

    if(accountEmail) {//if already signed up with linkedin signup form, this prevent account signup
      var emailAlreadyExist = Meteor.users.find({"profile.emailAddress": accountEmail}, {limit: 1}).count()>0
      //console.log(emailAlreadyExist);
      if(emailAlreadyExist === true) {
          throw new Meteor.Error(403, "Email already registered");
      }
    }


    if(email) {  //if already signed up with account signup form, this prevent linkedin signup
        var emailAlreadyExist = Meteor.users.find({"emails.address": email}, {limit: 1}).count()>0

        //console.log(emailAlreadyExist);

      if(emailAlreadyExist === true) {
          throw new Meteor.Error(403, "Email already registered");
      }
    }


    if(!options.profile) {
      options.profile = {};
    }

    var userType = ServerSession.get('userType');
   
   

    if(userType) {
      options.profile.userType = userType;
    }
    options.profile.isActive = true;
    options.profile.profileStatus = 0;
    
    /*if(referralPath) {
      options.profile.referralPath = referralPath;
    } */



    //welcome email:

    //this stuff will not work anymore if you add facebook login too:
    //sets emails.address to be consistent with linkedin 'profile.emailAddress'
    var userEmail = options.profile.emailAddress;
    if (!options.profile.emailAddress) {
      var userEmail = user.emails[0].address;
      options.profile.emailAddress = userEmail;
    }

    var salesMsg = "<p>Thank you for signing up for LaunchTaffy.</p> <p>We're just getting started, and we're so happy to have you as one of our founding members.</p><h4>You're probably wondering, 'What next?'</h4> <p><strong>Polish Your Profile</strong>: Sales is about great impressions, and your first sale will be convincing companies you are qualified to represent them. Make sure your profile is well-written, outlining professional accomplishments, key client relationships and areas of specialization.</p><h4>LaunchTaffy will be successful by making you successful.</h4><p> Let us know how we can make you more successful by <b><a href='"+process.env.ROOT_URL+"/contact/'>contacting us directly</a></b> with your ideas and feedback.</p><p>We can't wait to see you get your first sales and will be in touch with updates soon.</p><p>Sincerely,<br />LaunchTaffy</p>";

    var companyMsg = "<p>Thank you for signing up for LaunchTaffy. We can't wait to help you get your first sales.</p><h4>You're probably wondering, 'What next?'</h4><ul><li><strong>Provide Sales Collateral</strong>: On your company page, include links to marketing material, demos of your product, specification documents and pricing information.</li><li><strong>Outline Your Compensation Model</strong>: If you haven't quite figured out how to compensate for selling your product, now is the time to do so. Be sure to think through the details of what is appropriate. Answer questions such as, 'Do I want sales? Or do I want leads? What is each of those worth to my business?'</li></ul><h4>LaunchTaffy will be successful by making you successful.</h4><p>LaunchTaffy's goal is to make you successful during the critical early phase of your business. </p><p>If you have ideas or feedback, please <b><a href='"+process.env.ROOT_URL+"/contact/'>contact us</a></b>.</p><p>Sincerely,<br />LaunchTaffy</p>";

    var genericMsg = "<p>Thank you for singing up for LaunchTaffy. We can't wait to help you get your first sales on LaunchTaffy.</p> <h4>You're probably wondering, 'What next?'</h4> <p>We're just getting started, and we're so happy to have you as one of our founding members. We're busy building new features and getting companies and sales professionals on board. </p><p> In the mean time, get your profile ready and we'll be in contact with you about important updates.</p><p> Let us know how we can make you more successful by <b><a href='"+process.env.ROOT_URL+"/contact/'>contacting us</a></b>.</p><p>Sincerely,<br />LaunchTaffy</p>"; 

    if(userType == 'salesperson') {
      Meteor.call('sendEmail', userEmail, 'LaunchTaffy <no-reply@launchtaffy.com>', 'Welcome to LaunchTaffy - Your Ticket to More Sales!', salesMsg);

      Meteor.call('sendEmail', 'contact@launchtaffy.com', 'LaunchTaffy <no-reply@launchtaffy.com>', 'New Sales Professional Signed Up', 'New Sales Professional, '+userEmail+' signed up');

    }
    else if(userType == 'company') {
      Meteor.call('sendEmail', userEmail, 'LaunchTaffy <no-reply@launchtaffy.com>', 'Welcome to LaunchTaffy - Your Ticket to More Sales!', companyMsg);

      Meteor.call('sendEmail', 'contact@launchtaffy.com', 'LaunchTaffy <no-reply@launchtaffy.com>', 'New Company Signed Up', 'New Company, '+userEmail+' signed up');
    }
    else {
      Meteor.call('sendEmail', userEmail, 'LaunchTaffy <no-reply@launchtaffy.com>', 'Welcome to LaunchTaffy - Your Ticket to More Sales!', genericMsg);

      Meteor.call('sendEmail', 'contact@launchtaffy.com', 'LaunchTaffy <no-reply@launchtaffy.com>', 'New User Signed Up', 'New User, '+userEmail+' signed up');
    }  


    if (options.profile) {
        user.profile = options.profile;
    }

    //ServerSession.set('referralPath', '');

    // we wait for Meteor to create the user before sending an email
   /* Meteor.setTimeout(function() {
      Accounts.sendVerificationEmail(user._id);
    }, 2 * 1000); */

  return user;
});

// (server-side) called whenever a login is attempted
Accounts.validateLoginAttempt(function(attempt){
  if (attempt.user && attempt.user.emails && !attempt.user.emails[0].verified ) {
    //console.log('email not verified');

    return false; // the login is aborted
  }
  return true;
}); 


Accounts.config({sendVerificationEmail: true});


