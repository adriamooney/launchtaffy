Meteor.publish('companies', function(){
    return Companies.find();
});

Meteor.publish("users", function () {
	return Meteor.users.find({}, {fields: {emails: 1, profile: 1}});
  //return Meteor.users.find({'profile.userType': 'salesperson'});
});

Meteor.publish("messages", function () {
	return Messages.find({});
});

Meteor.publish("sales", function () {
	var user = this.userId;
	return Sales.find({salesPersonId: user}, {fields: {emails: 1, profile: 1}}); 
});

Meteor.publish("leads", function () {
	var user = this.userId;
	return Leads.find({}); 
});

Meteor.publish("companyTypeSales", function () {
	var user = this.userId;
	return Sales.find({companyUserId: user}, {fields: {emails: 1, profile: 1}}); 
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

Meteor.publish('quiz', function(){
    return Quiz.find();
});
