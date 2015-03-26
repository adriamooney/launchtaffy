Template.profile.helpers({
	companyProfile: function() {
		var userId = Meteor.userId();
		//console.log(userId);
		var company = Companies.findOne({companyId: userId});
		//console.log(company);
		if(company) {
			return true;
		}
		else {
			return false;
		}
	},
	isMyCompany: function() {
		var user = Meteor.user();
		if(user) {
			var userType =  user.profile.userType;
			console.log(userType);
			console.log(this._id);
			console.log(user._id);
			if (userType == 'company' && (user._id == this._id))  {
				console.log('mycompany');
				return true;
			}
		}
	},
	isMySalesProfile: function() {
		var user = Meteor.user();
		if(user) {
			var userType =  user.profile.userType;
			if (userType == 'salesperson' && (user._id == this._id))  {
				console.log('mysales');
				return true;
			}
		}

	},
	isSalesPerson: function() {
		//var user = Meteor.user();
		var user = this;
		if(user) {
			var userType =  user.profile.userType;
			if (userType == 'salesperson') {
				return true;
			}
		}
	},
	isCompany: function() {
		//console.log(this.profile.use
		var user = this;
		if(user) {
			var userType =  user.profile.userType;
			if (userType == 'company') {
				return true;
			}
		}
	},
	userType: function() {
		console.log(this);
		return this.profile.userType;
	}

		


});

Template.updateSalesForm.events({
	'submit form': function(event, template) {
		event.preventDefault();

		console.log('submitted');
		var profileStatus;

		if (template.find('#bio').value == '') {  //TODO: flesh this out later so profile can be done by a %
			profileStatus = 0;
		}
		else {
			profileStatus = 1
		}

		var profile = {
			//fullName: template.find('#fullName').value,
			website: template.find('#website').value,
			bio: template.find('#bio').value,
			userType: 'salesperson',
			isActive: true,//make this an option this later so user can cancel
			profileStatus: profileStatus  

		}


		Meteor.call('updateSalesUser', Meteor.userId(), profile, function(err) {

        	if (err) {
            // Inform the user that account creation failed
	            AppMessages.throw(err.reason, 'danger');
	          } else {
	            // Success. Account has been created and the user
	            // has logged in successfully. 
	            AppMessages.throw('Profile updated.', 'success');
	            //.go('/');
	          }
		});
	}
});