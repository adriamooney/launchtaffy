Template.salespeople.helpers({
	salespeople: function() {
		console.log(Meteor.users.find({}));
		return Meteor.users.find();
	}
});