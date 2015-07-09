Meteor.startup(function () {
	Meteor.call('getRootUrl', function(err, result) {
		Session.set('rootUrl', result);
   });


	Uploader.finished = function(index, file_info) {

        var path = '/upload'+file_info.path

        var rootUrl = Session.get('rootUrl');

        var url = rootUrl+path;

        var user = Meteor.user();

        if(user.profile.userType == 'salesperson') {
        	Meteor.call('addLogoToUser', url, Meteor.userId());
        }

        if(user.profile.userType == 'company') {
        	var id = user.profile.companyId;
        	if(id) {
        		Meteor.call('addLogoToCompany', url, id);
        	}
        	else {
        		Meteor.call('addLogoToUser', url, Meteor.userId());
        	}
        	
        }


    }

});