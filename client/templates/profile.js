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
			//console.log(userType);
			//console.log(this._id);
			//console.log(user._id);
			if (userType == 'company' && (user._id == this._id))  {
				//console.log('mycompany');
				return true;
			}
		}
	},
	isMySalesProfile: function() {
		var user = Meteor.user();
		if(user) {
			var userType =  user.profile.userType;
			if (userType == 'salesperson' && (user._id == this._id))  {
				//console.log('mysales');
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
		//console.log(this);
		return this.profile.userType;
	}

});

Template.updateSalesForm.events({
	'submit form': function(event, template) {
		event.preventDefault();

		var profileStatus;

		if (template.find('#bio').value == '') {  //TODO: flesh this out later so profile can be done by a %
			profileStatus = 0;
		}
		else {
			profileStatus = 1
		}


		var userData = {
			//fullName: template.find('#fullName').value,
			//"profile.pictureUrl": template.find('#pictureUrl').value,
			"profile.website": template.find('#website').value,
			"profile.bio": template.find('#bio').value,
			"profile.firstName": template.find('#firstName').value,
			"profile.lastName": template.find('#lastName').value,
			"profile.headline": template.find('#headline').value,
			"profile.keywords": template.find('#keywords').value,
			"profile.userType": 'salesperson',
			"profile.isActive": true,//make this an option this later so user can cancel
			"profile.profileStatus": profileStatus  

		}


		Meteor.call('updateSalesUser', Meteor.userId(), userData, function(err) {

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

/*Template.updateSalesForm.helpers({
	keywords: function() {
		if(this.profile.keywords) {
			return this.profile.keywords;
		}
		else {
			var keywordsArr = this.profile.skills.values;
			if(keywordsArr) {
				var newArr = [];
				for(var i=0; i< keywordsArr.length; i++) {
					newArr.push(keywordsArr[i].skill.name);
				}
				return newArr.toString();
			}
			else {
				return '';
			}
		}
		
	}
}); */

Template.userTypeSwitcher.events({
	'click #switchUserType': function() {
		var id = Meteor.userId();
		var userType = Meteor.user().profile.userType;
		if (userType == 'salesperson') {
			var newUserType = 'company';
		}
		else if (userType == 'company') {
			var newUserType = 'salesperson';
		}
		Meteor.call('switchUserType', id, newUserType);
	}
});


Template.chooseUserType.events({
	'click #chooseCompany': function(event, template) {
		Meteor.users.update({_id: Meteor.userId()}, {$set: {'profile.userType': 'company'}});
	},
	'click #chooseSalesperson': function(event, template) {
		Meteor.users.update({_id: Meteor.userId()}, {$set: {'profile.userType': 'salesperson'}});
	}
});



