Template.header.events({
	'click #inbox': function() {
	   Meteor.call('readMessages');
	}
});