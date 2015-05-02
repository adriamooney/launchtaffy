Template.companyUserProfile.helpers({
	company: function() {
		var userId = this._id;
		var company = Companies.findOne({companyId: userId});
		return company;
	}
});