Template.companies.helpers({
	companies: function() {
		var companies = Companies.find({accountIsActive: true});
		if(companies.count() > 0) {
			return companies;
		}
		else {
			return false;
		}
	}
});

Template.company.helpers({
	thisCompany: function() {
		if (Meteor.user()) {

			var userId = Meteor.userId();

			if(userId == this.companyId) {
				var company = Companies.findOne({companyId: userId});
				console.log(company);
				return company;
			}
		}
	},
	companyResources: function() {
		if(this.companyResources) {
			var arr = _.values(this.companyResources);
			return arr;
		}
		else {
			return false;
		}
	},
	showPrivate: function() {
		var company = this._id;
		var userCompaniesArr = Meteor.user().profile.approvedCompanies;
		if(userCompaniesArr) {
			if (_.contains(userCompaniesArr, company)) {
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
		var thisCompany = this._id;

		var companiesArr = Meteor.user().profile.favoriteCompanies;
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
	}
});

Template.updateCompanyFormOnProfile.helpers({ //probably could be moved to a generic helper function
	usersCompany: function() {
		var userId = Meteor.userId();
		var company = Companies.findOne({companyId: userId});
		return company;
	}
	
});

Template.companyProfile.helpers({
	logoAtts: function () {
		var userId = Meteor.userId();
		var company = Companies.findOne({companyId: userId});
		var logoUrl = company.logoUrl;
		var logoAlt = company.name+' logo';
	    return {
	      src: logoUrl,
	      alt: logoAlt
	    }
  	}
});



Template.company.events({
	'submit #contactCompany': function(event, template) {
		event.preventDefault();
		var senderId = Meteor.userId();
		console.log(senderId);
		var toId = this.companyId;
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
	'click #addToCompanyFavorites': function(event, template) {
		event.preventDefault();
		var companyId = this._id;
		Meteor.call('addToCompanyFavorites', companyId, Meteor.userId(), function(err) {
			if(!err) {
				AppMessages.throw('Added to your favorites list!', 'success');
			}
		});
	}
	
});

Template.getLinkedinInfo.events({
	'click #getCompanyInfo': function(event, template) {
		var val = template.find('#companyNameVal').value;

		Meteor.call("getLinkedCompanyProfile", val, function(err, result) {
			if(err) {
				AppMessages.throw(err.reason, 'danger');
			}
		
		});

		//TODO: this one will work for initial insert only.  need a different event for update

	},
	'click #updateCompanyInfo': function(event, template) {
		var val = template.find('#companyNameVal').value;
		var id = Meteor.userId();
		Meteor.call("updateLinkedCompanyProfile", val, id, function(err, result) {
			if(err) {
				AppMessages.throw(err.reason, 'danger');
			}
		
		});
	}
});

