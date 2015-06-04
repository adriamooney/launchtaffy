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

Template.registerHelper('currentUserIsCompany', function() {   //TODO: these functions can be combined to use an argument  http://meteorcapture.com/spacebars/
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
		var company = Companies.findOne({companyId: id});  

		if(company) {
			return true;
		}
		else {
			return false;
		}
	}
	else {
		return true;
	}
});

Template.registerHelper('anyMessages', function() {
	var messages =  Messages.find({$or: [{from: Meteor.userId()},{to: Meteor.userId()}]}, {sort: {timeStamp: -1}});
	if (messages.count() > 0) {
		return true;
	}
	else {
		return false;
	}
});

Template.registerHelper('numNewMessages', function() {
	var messages = Messages.find({$and: [{to: Meteor.userId()},{'status': 'unread'}]});


	if (messages.count() > 0 ) {
		return messages.count();
	}
	else {
		return false;
	}
});

Template.registerHelper('approvedCompanies', function() {
	var companiesArr = Meteor.user().profile.approvedCompanies;
	if(companiesArr && companiesArr.length>0) {
		var ids = companiesArr;
		var companies = Companies.find({_id: {$in: ids}});
		return companies;
	}
	else {
		return false;
	}
	
});

Template.registerHelper('approvedSalesPeople', function() {

	var salesPeopleArr = Meteor.user().profile.approvedSalesPeople;
	if(salesPeopleArr && salesPeopleArr.length>0) {
		var salespeople = Meteor.users.find({_id: {$in: salesPeopleArr}});
		return salespeople; 
	}
	
	else {
		return false;
	}

});

Template.registerHelper('emptyCompanyProfile', function() {
    if(Meteor.user()) {

	    var userId = Meteor.userId();
	    var userType = Meteor.user().profile.userType;

	    var myCompany = Companies.findOne({'companyId': userId});
	    if(userType == 'company') {
	    	if(myCompany) {
		        if (myCompany.companyProfileStatus == 0 ) {
		            return true;
		        }
		    }
	        else {
	            return false;
	        }
	    }
	    else {
	        return false;
	    }
	}
	else {
		return false;
	}
});

Template.registerHelper('emptySalesProfile', function() {
	
	
	if(Meteor.user()) {
		var profileStatus = Meteor.user().profile.profileStatus;
		var userType = Meteor.user().profile.userType;
			if(userType == 'salesperson') {
			if (profileStatus == 0) {
				return true;
			}
			else {
				return false;
			}
		}
		else {
			return false;
		}
	}
	else {
		return false;
	}
	
	

});

Template.registerHelper('email', function() {
	var user = Meteor.user();
    if(!user.emails) {
        var userEmail = user.profile.emailAddress;
     }
     else {
        var userEmail = user.emails[0].address;
    }
    return userEmail;
});

Template.registerHelper('newDate', function() {
	return new Date();
});


