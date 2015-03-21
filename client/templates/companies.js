Template.companies.helpers({
	companies: function() {
		return Companies.find();
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
	}
});

