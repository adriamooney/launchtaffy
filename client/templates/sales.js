Template.addSale.helpers({
	billingOptions: function() {
		return [
	        {label: "monthly", value: 'monthly'},
	        {label: "annually", value: 'annually'},
	        {label: "one-time", value: 'one-time'}
    	];
	},
	//TODO: this only works if currently loggedin user is salesperson. 
	//we also need a page for companies to view all of their sales. probably need to make another route or subscription
	approvedCompaniesNames: function() {
		var companiesArr = Meteor.user().profile.approvedCompanies;
		var user = Meteor.user();
		if(companiesArr.length>0) {
			var ids = companiesArr;
			var companies = Companies.find({_id: {$in: ids}}, {fields: {name:1, _id:1}});
			approvedCompaniesArr = [];
			//var name = _.pluck Companies.find().fetch(), 'name';
			companies.forEach(function(doc){  //cursor.forEach
			  approvedCompaniesArr.push({label: doc.name, value: doc._id });
			});

			return approvedCompaniesArr;
		}
		else {
			return false;
		}
	},
	salesPersonFullName: function() {
		var fName = Meteor.user().profile.firstName;
		var lName = Meteor.user().profile.lastName;
		return fName+ ' '+lName;
	}
});

/*Template.sales.helpers({
	sales: function() {
		var user = Meteor.userId();
		return Sales.find({salesPersonId: user}); 
	},
	companyTypeSales: function() {
		var user = Meteor.userId();
		return Sales.find({companyUserId: user}); 
	}
}) */
