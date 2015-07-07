Template.dashboard.events({
    'click .logout': function(event){
        event.preventDefault();
        Meteor.logout();
    },
     'click #getCompanyInfo': function(event, template) {

        var val = template.find('#companyNameVal').value;

        //var reg = val.match(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
        //console.log(reg);
       // if(reg !== null) {
            Meteor.call("getLinkedCompanyProfile", val, function(err, result) {
               /* if(err) {
                    AppMessages.throw(err.reason, 'danger');

                }  */

               // else {
                    //AppMessages.throw('Company added successfully', 'success');
                    //Router.go('profile');
               // }
                console.log(result);
            }); 
       /* }
        else {
            AppMessages.throw('Oops, it appears you entered your company name incorrectly.', 'danger');
        } */

        
    }
});

Template.dashboard.onRendered(function () {
    var user = Meteor.userId();
    var referralPath = SessionStore.get('referralPath');
    var userType = SessionStore.get('userType');

    if(referralPath && !Meteor.user().profile.referralPath) {
        console.log(referralPath);
        Meteor.call('getReferralPathSession', referralPath, user);
    }
    if(userType && !Meteor.user().profile.userType) {
        console.log(userType);
        Meteor.call('getReferralPathSession', userType, user);
    }
});

Template.header.events({
    'click .logout': function(event){
        event.preventDefault();
        Meteor.logout();
        Router.go('/');
    }
});