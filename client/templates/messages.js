Template.messages.helpers({
	messagesToMe: function() {
		return Messages.find({to: Meteor.userId()}, {sort: {timeStamp: -1}});
	},
	messagesFromMe: function() {
		return Messages.find({from: Meteor.userId()}, {sort: {timeStamp: -1}});
	},
	fromId: function() {
		var fromId = this.from;
		var from =  Meteor.users.findOne({_id: fromId});
		var person = from.username;
		return person;
	},
	toId: function() {
		var toId = this.to;
		var to =  Meteor.users.findOne({_id: toId});
		var person = to.username;
		return person;
	}
});

Template.reply.events({
	'submit #replyToMessage': function(event, template) {
		event.preventDefault();
		var senderId = Meteor.userId();  //should be same as this.to

		//console.log(this);

		var toId = this.from;
		var user =  Meteor.users.findOne({_id: toId});
		var to = user.emails[0].address;

		var msg = template.find('#message').value;
		console.log(msg);
		if (msg != '') {
			Meteor.call('replyToMessage', this._id, senderId, toId, msg, function(err) {
				if(!err) {
					AppMessages.throw('your messages was sent', 'success');
					Meteor.call('sendEmail', to, 'noreply@meteor.com', 'You have a SalesCrowd Message', 'You have a SalesCrowd Message');
				}
				else {
					AppMessages.throw(err.reason, 'danger');
				}
			}); 
		}
		else {
			AppMessages.throw('You forgot to write a reply.', 'danger');
		}

		
	}
});