Template.salespeople.helpers({
	salespeople: function() {
		console.log(Meteor.users.find({'profile.isActive': true}).count());
		//var users = Meteor.users.find({ $and: [ {'profile.userType': 'salesperson'}, {'profile.isActive': true}, {'emails.0.verified': true} ] } ); 
		var users = Meteor.users.find({ $and: [ {'profile.userType': 'salesperson'}, {'profile.isActive': true} ] } ); 

		console.log( users.count() );
		if (users.count() > 0) {
			return users;
		}
		else {
			return false;
		}

	}
	
});

Template.salespeopleItem.helpers({
	numSales: function() {
		var sales = Sales.find({$and: [ { salesPersonId: this._id}, { status: 'approved' } ] }).count();   
		if(sales === 1) {
			return sales +' sale';
		}
		else if(sales>1){
			return sales +' sales';
		}
		else {
			return false;
		}
		
	}
});

Template.salesProfile.helpers({
	salesPersonIsApproved: function() {
		var thisCompany = Meteor.user().profile.companyId;

		var companiesArr = this.profile.approvedCompanies;
		if(companiesArr) {

			if (_.contains(companiesArr, thisCompany)) {
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
		var thisUser = this._id;

		var usersArr = Meteor.user().profile.favoriteSalesPeople;
		if(usersArr) {

			if (_.contains(usersArr, thisUser)) {
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

Template.salesProfile.events({
	'submit #contactSalesPerson': function(event, template) {
		event.preventDefault();
		var senderId = Meteor.userId();
		console.log(senderId);
		var toId = this._id;
		var msg = template.find('#message').value;
		Meteor.call('sendMessage', senderId, toId, msg, function(err) {
			if(!err) {
				AppMessages.throw('your messages was sent', 'success');
			}
			else {
				AppMessages.throw(err.reason, 'danger');
			}
		});
	},
	'click #approve-salesprson': function(event, template) {
		event.preventDefault();
		var companyId = Meteor.user().profile.companyId;
		var company = Companies.findOne({_id: companyId});
		var companyName = company.name;

		var userId = this._id;
		var useremail = this.emails;
		if(!useremail) {
			useremail = this.profile.emailAddress;
		}
		else {
			useremail = this.emails[0].address;
		}


		if(companyId) {
			Meteor.call('approveSalesPerson', companyId, userId, function(err) {
				if(err) {
					AppMessages.throw(err.reason, 'danger');
				}
				else {
					AppMessages.throw('You have now approved this salesperson.', 'success');
					Meteor.call('sendEmail', useremail, 'LaunchTaffy <no-reply@launchtaffy.com>', 'You have been approved!', 'You have been approved by '+companyName, function(err) {
						if(err) {
							console.log(err);
						}
					});

				}
			});
		}
		else {
			AppMessages.throw('You must fill out your company profile first.', 'danger');
		}
		
	},
	'click #unapprove-salesprson': function(event, template) {
		event.preventDefault();
		var companyId = Meteor.user().profile.companyId;
		var company = Companies.findOne({_id: companyId});
		var companyName = company.name;

		var userId = this._id;
		var useremail = this.emails;
		if(!useremail) {
			useremail = this.profile.emailAddress;
		}
		else {
			useremail = this.emails[0].address;
		}

		if(companyId) {
			Meteor.call('removeSalesPerson', companyId, userId, function(err) {
				if(err) {
					AppMessages.throw(err.reason, 'danger');

				}
				else {
					AppMessages.throw('You have revoked approval this salesperson.', 'success');
					Meteor.call('sendEmail', useremail, 'LaunchTaffy <no-reply@launchtaffy.com>', 'Your approval has been revoked', 'Your approval to sell for '+companyName+' has been revoked.  You are no long authorized to sell for this company.', function(err) {
						if(err) {
							console.log(err);
						}
					});
				}
			});
		}
		else {
			AppMessages.throw('You must fill out your company profile first.', 'danger');
		}

	},
	'click #addToFavorites': function(event, template) {
		event.preventDefault();
		var id = this._id;
		Meteor.call('addToSalesPeopleFavorites', id, Meteor.userId(), function(err) {
			if(!err) {
				AppMessages.throw('Added to your favorites list!', 'success');
			}
		});
	}
});

Template.updateSalesForm.helpers({
	approvedCompanies: function() {
		var companiesArr = this.profile.approvedCompanies;
		if(companiesArr.length>0) {
			var ids = companiesArr;
			var companies = Companies.find({_id: {$in: ids}});
			return companies;
		}
		else {
			return false;
		}
		

	}

}); 