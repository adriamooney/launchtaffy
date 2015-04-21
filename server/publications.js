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

Meteor.publish("sales", function () {
	var user = this.userId;
	return Sales.find({salesPersonId: user}); 
});

Meteor.publish("companyTypeSales", function () {
	var user = this.userId;
	return Sales.find({companyUserId: user}); 
});

Meteor.publish('news', function(){
    return News.find();
});

Meteor.publish('threads', function(){
    return Threads.find();
});

Meteor.publish('linkedinmessages', function(){
    return LinkedInMessages.find();
});
