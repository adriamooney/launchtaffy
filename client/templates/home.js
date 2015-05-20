/*Template.home.created = function() {
  if (Accounts._verifyEmailToken) {
    Accounts.verifyEmail(Accounts._verifyEmailToken, function(err) {
      if (err != null) {
        if (err.message = 'Verify email link expired [403]') {
          console.log('Sorry this verification link has expired.')
        }
      } else {
        console.log('Thank you! Your email address has been confirmed.')
      }
    });
  }
}; */

Template.unloggedinHome.events({
  'click #company-signup': function(e) {
    //analytics.track('click-company-signup');
    ServerSession.set('userType', 'company');
    e.preventDefault();
    Meteor.loginWithLinkedin({}, function (err) {
            if (err){
              console.log('ERROR: ' + err); //error handling
            } else {
              console.log('NO ERROR ON LOGIN'); //show an alert
            }
        });

  },
  'click #sales-signup': function(e) {
    //analytics.track('click-sales-signup');
    ServerSession.set('userType', 'salesperson');
    e.preventDefault();
    Meteor.loginWithLinkedin({}, function (err) {
            if (err){
              console.log('ERROR: ' + err); //error handling
            } else {
              console.log('NO ERROR ON LOGIN'); //show an alert
            }
        });
  }

});

Template.companyLanding.events({
  'click #company-signup': function(e) {
    //analytics.track('click-company-signup');
    ServerSession.set('userType', 'company');
    e.preventDefault();
    Meteor.loginWithLinkedin({}, function (err) {
            if (err){
              console.log('ERROR: ' + err); //error handling
            } else {
              console.log('NO ERROR ON LOGIN'); //show an alert
            }
        });

  }
});

Template.salesLandingWithForm.events({
  'click #sales-signup': function(e) {
    //analytics.track('click-sales-signup');
    ServerSession.set('userType', 'salesperson');
    e.preventDefault();
    Meteor.loginWithLinkedin({}, function (err) {
            if (err){
              console.log('ERROR: ' + err); //error handling
            } else {
              console.log('NO ERROR ON LOGIN'); //show an alert
            }
        });
  }
});

Template.salesLanding.events({
  'click #sales-signup': function(e) {
    //analytics.track('click-sales-signup');
    ServerSession.set('userType', 'salesperson');
    e.preventDefault();
    Meteor.loginWithLinkedin({}, function (err) {
            if (err){
              console.log('ERROR: ' + err); //error handling
            } else {
              console.log('NO ERROR ON LOGIN'); //show an alert
            }
        });
  }
});