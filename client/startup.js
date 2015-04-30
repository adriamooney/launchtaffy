Meteor.startup(function () {
	Meteor.call('getRootUrl', function(err, result) {
		Session.set('rootUrl', result);
   });

	if (Meteor.settings.public.ga) {
	  ga('create', Meteor.settings.public.ga, 'auto');
	  ga('send', 'pageview');
	}

});