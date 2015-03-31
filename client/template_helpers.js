/*Template.registerHelper('isSalesPerson', function() {
	var user = Meteor.user();
	if(user) {
		var userType =  user.profile.userType;
		if (userType == 'salesperson') {
			return true;
		}
	}
		
});
 */
/*Template.registerHelper('isCompany', function() {

		var user = Meteor.user();
		if(user) {
			var userType =  user.profile.userType;
			if (userType == 'company') {
				return true;
			}
		}
}); */

/*Template.registerHelper('userType', function() {

	if (Meteor.user()) {
		return Meteor.user().profile.userType;
	}
		
}); */

/*Template.registerHelper('thisCompany', function() {

	if (Meteor.user()) {

		var userId = Meteor.userId();

		if(userId == companyId) {
			var company = Companies.findOne({companyId: userId});
			return company;
		}
	}
		
});  */

Template.registerHelper('currentUserIsCompany', function() {
	var user = Meteor.user().profile.userType;
	if (user == 'company') {
		return true;
	}
	else {
		return false;
	}
});

Template.registerHelper('currentUserIsSales', function() {
	var user = Meteor.user().profile.userType;
	if (user == 'salesperson') {
		return true;
	}
	else {
		return false;
	}
});

Template.registerHelper('noUserType', function() {
	var userType = Meteor.user().profile.userType;
	if (userType == 'other') {
		return true
	}
	else {
		return false;
	}
});

Template.registerHelper('userHasCompany', function() {
	var userType = Meteor.user().profile.userType;
	if (userType == 'company') {
		var id = Meteor.userId();
		var company = Companies.findOne({companyId: id});  //TODO: check to see if this returns anything or not.

		if(company) {
			return true;
		}
		else {
			return false;
		}
	}
	else {
		return false;
	}
});


