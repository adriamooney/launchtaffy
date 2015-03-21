Template.salespeople.helpers({
	salespeople: function() {
		console.log(Meteor.users.find().count());
		return Meteor.users.find();
	}
});