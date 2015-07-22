Template.referralPathReport.helpers({
	date: function() {
		//console.log(this.createdAt);
		var date = moment(this.createdAt).format('L');
		return date;
	},
	numSales: function() {
		var user = this.profile.userType;
		if(user == 'company') {
			var sales = Sales.find({$or: [{$and: [{companyId: this.profile.companyId},{'status': 'approved'}]}, {$and: [{salesPersonId: this._id},{'status': 'paid'}]}]} ).count();  
		}
		if(user == 'salesperson') {
			var sales = Sales.find({$or: [{$and: [{salesPersonId: this._id},{'status': 'approved'}]}, {$and: [{salesPersonId: this._id},{'status': 'paid'}]}]} ).count();  
		}


		if(sales === 1) {	
			return sales +' sale';
		}
		else if(sales>1){
			return sales +' sales';
		}
		else {
			return false;
		}
		
	},
	numLeads: function() {
		var user = this.profile.userType;
		if(user == 'company') {
			var leads = Leads.find({$or: [{$and: [{companyId: this.profile.companyId},{'status': 'approved'}]}, {$and: [{salesPersonId: this._id},{'status': 'paid'}]}]} ).count();   
		}
		if(user == 'salesperson') {
			var leads = Leads.find({$or: [{$and: [{salesPersonId: this._id},{'status': 'approved'}]}, {$and: [{salesPersonId: this._id},{'status': 'paid'}]}]} ).count();   

		}

		if(leads === 1) {
			return leads +' lead';
		}
		else if(leads>1){
			return leads +' leads';
		}
		else {
			return false;
		}
		
	}
});

/*Template.referralPathReport.onRendered(function () {
    console.log(this.data); // you should see your passage object in the console
}); */

