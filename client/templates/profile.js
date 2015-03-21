Template.profile.helpers({
	companyProfile: function() {
		var userId = Meteor.userId();
		console.log(userId);
		var company = Companies.findOne({companyId: userId});
		console.log(company);
		if(company) {
			return true;
		}
		else {
			return false;
		}
	}


});

Template.salesProfile.events({
	'submit form': function(event, template) {
		event.preventDefault();

		console.log('submitted');
		var profile = {
			fullName: template.find('#fullName').value,
			website: template.find('#website').value,
			bio: template.find('#bio').value,
			userType: 'salesperson'
		}
		Meteor.call('updateSalesUser', Meteor.userId(), profile);
	}
});