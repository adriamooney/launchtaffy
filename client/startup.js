Meteor.startup(function () {
	Meteor.call('getRootUrl', function(err, result) {
		Session.set('rootUrl', result);
   });

});