Template.dashboard.events({
    'click .logout': function(event){
        event.preventDefault();
        Meteor.logout();
    },
     'click #getCompanyInfo': function(event, template) {

        var val = template.find('#companyNameVal').value;

        var reg = val.match(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
        console.log(reg);
        if(reg !== null) {
            Meteor.call("getLinkedCompanyProfile", val, function(err, result) {
                if(err) {
                    AppMessages.throw(err.reason, 'danger');
                }
            
            }); 
        }
        else {
            AppMessages.throw('Oops, it appears you entered your company name incorrectly.', 'danger');
        }

        
    }
});

Template.header.events({
    'click .logout': function(event){
        event.preventDefault();
        Meteor.logout();
        Router.go('/');
    }
});

Template.dashboard.helpers({
	emptyProfile: function() {
		var profileStatus = Meteor.user().profile.profileStatus;
		if (profileStatus == 0) {
			return true;
		}
	}
});