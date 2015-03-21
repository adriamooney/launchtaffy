Meteor.publish('companies', function(){
    return Companies.find();
});

Meteor.publish("salespeople", function () {
  return Meteor.users.find({}, {fields: {emails: 1, profile: 1}});
});