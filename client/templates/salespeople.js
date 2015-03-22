Template.salespeople.helpers({
	salespeople: function() {
		console.log(Meteor.users.find().count());
		return Meteor.users.find();
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
		});
	}
});