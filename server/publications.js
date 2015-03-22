Meteor.publish('companies', function(){
    return Companies.find();
});

Meteor.publish("users", function () {
	return Meteor.users.find({});
  //return Meteor.users.find({'profile.userType': 'salesperson'});
});

Meteor.publish("messages", function () {
	return Messages.find({});
});