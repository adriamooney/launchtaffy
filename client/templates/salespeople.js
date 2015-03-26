Template.salespeople.helpers({
	salespeople: function() {
		console.log(Meteor.users.find({'profile.isActive': true}).count());
		var users = Meteor.users.find({ $and: [ {'profile.userType': 'salesperson'}, {'profile.isActive': true}, {'emails.0.verified': true} ] } ); 
		
		console.log( users.count() );
		if (users.count() > 0) {
			return users;
		}
		else {
			return false;
		}

	}
});

Template.salesProfile.events({
	'submit #contactSalesPerson': function(event, template) {
		event.preventDefault();
		var senderId = Meteor.userId();
		console.log(senderId);
		var toId = this._id;
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