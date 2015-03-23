Template.companies.helpers({
	companies: function() {
		return Companies.find();
	}
});

Template.company.helpers({
	thisCompany: function() {
		if (Meteor.user()) {

			var userId = Meteor.userId();

			if(userId == this.companyId) {
				var company = Companies.findOne({companyId: userId});
				console.log(company);
				return company;
			}
		}
	}
});

Template.company.events({
	'submit #contactCompany': function(event, template) {
		event.preventDefault();
		var senderId = Meteor.userId();
		console.log(senderId);
		var toId = this.companyId;
		var msg = template.find('#message').value;
		Meteor.call('sendMessage', senderId, toId, msg, function(err) {
			if(!err) {
				AppMessages.throw('your messages was sent', 'success');
			}
			else {
				AppMessages.throw(err.reason, 'danger');
			}
		});
	}
});


