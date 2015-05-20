Template.header.events({
	'click #inbox': function() {
	   Meteor.call('readMessages');
	},
	'click #linkedInLoginHeader': function(e){
		e.preventDefault();
		Meteor.loginWithLinkedin({}, function (err) {
            if (err){
              console.log('ERROR: ' + err); //error handling
            } else {
              console.log('NO ERROR ON LOGIN'); //show an alert
            }
        });
	}
});