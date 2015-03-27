Template.salespeople.helpers({
	salespeople: function() {
		console.log(Meteor.users.find({'profile.isActive': true}).count());
		var users = Meteor.users.find({ $and: [ {'profile.userType': 'salesperson'}, {'profile.isActive': true}, {'emails.0.verified': true} ] } ); 
		
		console.log( users.count() );
		if (users.count() > 0) {
			return users;
		}
		else {
			return false;
		}

	}
});

Template.salesProfile.helpers({
	salesPersonIsApproved: function() {
		var thisCompany = Meteor.user().profile.companyId;
		console.log(thisCompany);
		var companiesArr = this.profile.approvedCompanies;
		console.log(companiesArr[0]);

		if (_.contains(companiesArr, thisCompany)) {
			return true;
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
		//console.log(companyId);
		var userId = this._id;
		//console.log(userId);
		if(companyId) {
			Meteor.call('approveSalesPerson', companyId, userId, function(err) {
				if(err) {
					AppMessages.throw(err.reason, 'danger');
				}
				else {
					AppMessages.throw('You have now approved this salesperson.', 'success');
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
		var userId = this._id;
		if(companyId) {
			Meteor.call('removeSalesPerson', companyId, userId, function(err) {
				if(err) {
					AppMessages.throw(err.reason, 'danger');

				}
				else {
					AppMessages.throw('You have revoked approval this salesperson.', 'success');
				}
			});
		}
		else {
			AppMessages.throw('You must fill out your company profile first.', 'danger');
		}

	}
});

Template.updateSalesForm.helpers({
	approvedCompanies: function() {
		var companiesArr = this.profile.approvedCompanies;

		var ids = companiesArr;
		console.log(ids);

		var companies = Companies.find({_id: {$in: ids}});
		console.log(companies);
		return companies;

	}

}); 