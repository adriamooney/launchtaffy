Template.messages.helpers({
	messagesToMe: function() {
		//return Messages.find({$and: [{to: Meteor.userId()},{status: 'unread'}]}, {sort: {timeStamp: -1}});

		return Messages.find({$or: [{$and: [{to: Meteor.userId()},{'status': 'unread'}]}, {$and: [{to: Meteor.userId()},{'status': 'read'}]}]},  {sort: {timeStamp: -1}});
	},
	messagesFromMe: function() {
		return Messages.find({$or: [{$and: [{from: Meteor.userId()},{'status': 'unread'}]}, {$and: [{from: Meteor.userId()},{'status': 'read'}]}]},  {sort: {timeStamp: -1}});
		//return Messages.find({$and: [{from: Meteor.userId()},{status: 'unread'}]}, {sort: {timeStamp: -1}});
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

Template.searchBox.helpers({
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

Template.messages.events({
	'click .delete-msg': function(event, template) {
		event.preventDefault();
		Meteor.call('deleteMessage', this._id, function() {
			AppMessages.throw('Message deleted', 'success');
		});
	},
	'click .archive-msg': function(event, template) {
		event.preventDefault();
		Meteor.call('archiveMessage', this._id, function() {
			AppMessages.throw('Message archived', 'success');
		});
	},
	'click .unarchive-msg': function(event, template) {
		event.preventDefault();
		Meteor.call('unarchiveMessage', this._id, function() {
			AppMessages.throw('Message unarchived', 'success');
		});

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