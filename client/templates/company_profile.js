Template.companyUserProfile.helpers({
	thisCompany: function() {
		if (Meteor.user()) {

			var userId = Meteor.userId();

			if(userId == this._id) {
				var company = Companies.findOne({companyId: userId});
				console.log(company);
				return company;
			}
		}
	},
	company: function() {
		var userId = this._id;
		var company = Companies.findOne({companyId: userId});
		return company;
	},
	companyApproved: function() { 
		var userId = this._id;
		var company = Companies.findOne({companyId: userId});
		//console.log(company);
		var companiesArr = Meteor.user().profile.approvedCompanies;

		if(companiesArr && companiesArr.length>0) {
			//console.log(companiesArr);
			var isInCompany;
			var companies = Companies.find({_id: {$in: companiesArr}});
			companies.forEach(function(doc){  //cursor.forEach
				//console.log(doc._id);
				//console.log(company);
				  if(doc._id == company._id) {
				  	isInCompany = true;
				  }
			});
			if( isInCompany == true) {
				return true;
			}
		}

		else {
			return false;
		}
	},
	companyResources: function() { 
		var userId = this._id;
		var company = Companies.findOne({companyId: userId});
		if(company.companyResources) {
			var arr = _.values(company.companyResources);
			return arr;
		}
		else {
			return false;
		}
	},
	showPrivate: function() {  
		var userId = this._id;
		var company = Companies.findOne({companyId: userId});

		var userCompaniesArr = Meteor.user().profile.approvedCompanies;

		if(userCompaniesArr) {
			if (_.contains(userCompaniesArr, company._id)) {
				return true;
			}
			else {
				return false;
			}
		}
		else {
			return false;
		}
	},
	isFavorite: function() {
		//var thisCompany = this._id;

		var userId = this._id;
		var company = Companies.findOne({companyId: userId});

		var companiesArr = Meteor.user().profile.favoriteCompanies;
		if(companiesArr) {

			if (_.contains(companiesArr, company._id)) {
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
});

Template.companyUserProfile.events({
'click #addToCompanyFavorites': function(event, template) {
		event.preventDefault();

		var userId = this._id;
		var company = Companies.findOne({companyId: userId});
		var companyId = company._id;

		Meteor.call('addToCompanyFavorites', companyId, Meteor.userId(), function(err) {
			if(!err) {
				AppMessages.throw('Added to your favorites list!', 'success');
			}
		});
	},
	'submit #contactCompany': function(event, template) {
		event.preventDefault();
		var senderId = Meteor.userId();
		console.log(senderId);

		var toId = this._id;

		var msg = template.find('#message').value;

		var user =  Meteor.users.findOne({_id: toId});

		var to = user.emails;
		if(!to) {
			to = user.profile.emailAddress;
		}
		else {
			to = user.emails[0].address;
		}

		var emailFrom =  Meteor.users.findOne({_id: senderId});
		if(emailFrom.profile.userType == 'company') {
			var companyId = emailFrom.profile.companyId;
			var company = Companies.findOne({_id: companyId});
			var person = company.name;
		}
		else {
			var person = emailFrom.profile.firstName+' '+ emailFrom.profile.lastName;
		}


		if (msg != '') {

			Meteor.call('sendMessage', senderId, toId, msg, function(err, result) {
				if(!err) {
					console.log(result);
					var rootUrl = Session.get('rootUrl');
					var cleanmsg = msg.replace(/'/g, '&lsquo;');
					AppMessages.throw('your messages was sent', 'success');
					Meteor.call('sendEmail', to, 'LaunchTaffy <no-reply@launchtaffy.com>', 'You have a LaunchTaffy Message', 'You have a LaunchTaffy Message from '+person+':<br /><br />'+cleanmsg+'<br /><br /><a href="'+rootUrl+'/message/'+result+'">Reply</a>', 'You have a LaunchTaffy Message. Log in and check your inbox.');
					Session.set('buttonClicked', false);
					template.find('#message').value = '';
				}
				else {
					AppMessages.throw(err.reason, 'danger');
					Session.set('buttonClicked', false);
				}
			});
		}

		else {
			AppMessages.throw('You forgot to write a message.', 'danger');
		}

	}

});



// need companyResources, showPrivate, companyApproved, isFavorite

//check companyApproved and addtoFavorites methods