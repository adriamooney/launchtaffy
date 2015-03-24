Template.dashboard.events({
    'click .logout': function(event){
        event.preventDefault();
        Meteor.logout();
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