Template.messages.helpers({
	messages: function() {
		return Messages.find({to: Meteor.userId()});
	},
	fromId: function() {
		var fromId = this.from;
		var from =  Meteor.users.findOne({_id: fromId});
		var person = from.username;
		return person;
	}
});

Template.reply.events({
	'submit #replyToMessage': function(event, template) {
		event.preventDefault();
		var senderId = Meteor.userId();  //should be same as this.to

		console.log(this);

		var toId = this.from;

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