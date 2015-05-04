Template.contactForm.events({
	'submit form': function(event, template) {
		event.preventDefault();
		Session.set('buttonClicked', true);
		var user = Meteor.user();
		if(user) {
			if(!user.emails) {
		        var userEmail = user.profile.emailAddress;
		    }
		     else {
		        var userEmail = user.emails[0].address;
		    }
		}
		else {
			var userEmail = template.find('#email').value;
		}

		console.log(userEmail);

		var subject = template.find('#subject').value;
		var msg = template.find('#message').value;
		var html = msg;
		if(user) {
			var label =' #'+ $('#contactType').val();
		}
		else {
			var label = ' #company_lead';
		}
		

		if (subject != '' && msg != '') {

			Meteor.call('sendEmail', 'adriamooney1+0hvfgipstdp9djry6ujn@boards.trello.com', 'LaunchTaffy <no-reply@launchtaffy.com>', subject+label+' '+userEmail, html, html, function(err) {
				if(!err) {
					AppMessages.throw('your messages was sent. We will be in touch as soon as possible.', 'success');
					Session.set('buttonClicked', false);
					Meteor.call('sendEmail', userEmail, 'LaunchTaffy <no-reply@launchtaffy.com>', 'Your message to LaunchTaffy', 'Your message to LaunchTaffy has been received.  We will get back to you as soon as possible.');
				}
				else {
					AppMessages.throw(err.reason, 'danger');
					Session.set('buttonClicked', false);
				}
			});
		}
		else {
			AppMessages.throw('Please fill out both subject and message','danger');
			Session.set('buttonClicked', false);
		}
		if(!user && template.find('#email').value == '') {
			AppMessages.throw('Please fill out your email','danger');
			Session.set('buttonClicked', false);
		}



	    //sendEmail: function (to, from, subject, html, text) {

	}
});

Template.contactForm.helpers({
	buttonClicked: function() {
		return Session.get('buttonClicked');
	}
});
