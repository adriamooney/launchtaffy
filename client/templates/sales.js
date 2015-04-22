Template.addSale.helpers({
	billingOptions: function() {
		return [
	        {label: "monthly", value: 'monthly'},
	        {label: "annually", value: 'annually'},
	        {label: "one-time", value: 'one-time'}
    	];
	},
	timeStamp: function() {
		var now = new Date().getTime();
		return new Date(now - 7 * 3600 * 1000);
	},
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

Template.companyTypeSales.helpers({
	companyTypeSales: function() {
		var user = Meteor.userId();
		var sales= Sales.find({companyUserId: user}); 
		if(sales.count() > 0) {
			return sales;
		}
		else {
			return false;
		}
	},
    settings: function () {

        return {
            rowsPerPage: 10,
            showFilter: true,
            fields: [
	            { key: 'status', label: 'Status',
	            	fn: function(value,object) {
	            		var label;
	            		if(value == 'pending') {
	            			label = 'info';
	            		}
	            		else if(value == 'approved' || value=='paid') {
	            			label = 'success';
	            		}

	    				return new Spacebars.SafeString('<a href="/sale/'+object._id+'"><span class="label label-'+label+'">'+value+ '</span></a>' ); 
	    			}
	             },
	            { key: 'salesPersonName', label: 'Sales Person Name' },
	 			{ key: 'leadCompanyName', label: 'Lead Company Name' },
	    		{ key: 'leadEmail', label: 'Lead Email' },
	    		{ key: 'leadPhone', label: 'Lead Phone' },
	    		{ key: 'productName', label: 'Product Name' },
	    		{ key: 'productPrice', label: 'Product Price',
	    			fn: function(value,object) {
	    				return new Spacebars.SafeString('$'+object.productPrice +'/'+object.productBillingFrequency); 
	    			}
	    		 }

            ]
        }; 
    }
});

Template.companyTypeSalesWidget.helpers({
	sales: function() {
		var user = Meteor.userId();
		var sales = Sales.find({$and: [ { companyUserId: user }, { status: 'pending' } ] }, {sort: {timeStamp: -1}});
		if(sales.count() > 0) {
			return sales;
		}
		else {
			return false;
		}
	},
	settings: function () {

        return {
            rowsPerPage: 10,
            showFilter: true,
            fields: [
	            { key: 'status', label: 'Status',
	            	fn: function(value,object) {
	    				return new Spacebars.SafeString('<a href="/sale/'+object._id+'"><span class="label label-info">'+value+ '</span></a>'); 
	    			}
	        	},
	 			{ key: 'leadCompanyName', label: 'Lead Company Name' },
	 			{ key: 'salesPersonName', label: 'Sales Person Name' }

            ]
        }; 
    }

});

Template.salesTypeSalesWidget.helpers({
	sales: function() {
		var user = Meteor.userId();
		var sales = Sales.find({$and: [ { salesPersonId: user }, { status: 'pending' } ] }, {sort: {timeStamp: -1}});


		if(sales.count() > 0) {
			return sales;
		}
		else {
			return false;
		}
	},
	settings: function () {

        return {
            rowsPerPage: 10,
            showFilter: true,
            fields: [
	            { key: 'status', label: 'Status',
	            	fn: function(value,object) {
	            		var label;
	            		if(value == 'pending') {
	            			label = 'info';
	            		}
	            		else if(value == 'approved' || value == 'paid') {
	            			label = 'success';
	            		}

	    				return new Spacebars.SafeString('<span class="label label-'+label+'">'+value+ '</span>'); 
	    			}
	        	},
	            { key: 'companyName', label: 'Company Name' },
	 			{ key: 'leadCompanyName', label: 'Lead Company Name' },
	    		{ key: 'productPrice', label: 'Product Price',
	    			fn: function(value,object) {
	    				return new Spacebars.SafeString('$'+object.productPrice +'/'+object.productBillingFrequency); 
	    			}
	    		 }

            ]
        }; 
    }

});

Template.salesTypeSales.helpers({
	salesTypeSales: function() {
		var user = Meteor.userId();
		var sales = Sales.find({salesPersonId: user}); 
		if(sales.count() > 0) {
			return sales;
		}
	},
    settings: function () {

        return {
            rowsPerPage: 10,
            showFilter: true,
            fields: [
	            { key: 'status', label: 'Status',
	            	fn: function(value,object) {
	            		var label;
	            		if(value == 'pending') {
	            			label = 'info';
	            		}
	            		else if(value == 'approved' || value== 'paid') {
	            			label = 'success';
	            		}
	    				//return new Spacebars.SafeString('<span class="label label-'+label+'">'+value+ '</span>'); 
	    				return new Spacebars.SafeString('<a href="/sale/'+object._id+'"><span class="label label-'+label+'">'+value+ '</span></a>' ); 

	    			}
	        	},
	            { key: 'companyName', label: 'Company Name' },
	 			{ key: 'leadCompanyName', label: 'Lead Company Name' },
	    		{ key: 'leadEmail', label: 'Lead Email' },
	    		{ key: 'leadPhone', label: 'Lead Phone' },
	    		{ key: 'productName', label: 'Product Name' },
	    		{ key: 'productPrice', label: 'Product Price',
	    			fn: function(value,object) {
	    				return new Spacebars.SafeString('$'+object.productPrice +'/'+object.productBillingFrequency); 
	    			}
	    		 }

            ]
        }; 
    }
});

Template.sale.events({
	'click #approveSale': function(event, template) {
		var self = this;
		Meteor.call('updateSaleStatus', this._id, 'approved', function(err){
			if(!err) {
				AppMessages.throw('Sale approved!', 'success');
				var salesPersonId = self.salesPersonId;
				console.log(self);
				var user = Meteor.users.findOne({_id: salesPersonId});
				console.log(user);

				if(!user.emails) {
			        var userEmail = user.profile.emailAddress;
			     }
			     else {
			        var userEmail = user.emails[0].address;
			    }
      			var salesPerson = self.salesPersonName;

      			var rootUrl = Session.get('rootUrl');

				Meteor.call('sendEmail', userEmail, 'LaunchTaffy <no-reply@launchtaffy.com>', 'Your sale has been approved!', salesPerson+', <br />your sale has been approved. <br /><a href="'+rootUrl+'/sale/'+self._id+'">Click here</a> to review the sale'); 

			}
		});

	},
	'click #paidSale': function() {
		var self = this;
		Meteor.call('updateSaleStatus', this._id, 'paid', function(err){
			if(!err) {
				AppMessages.throw('Sale marked as paid!', 'success');
				var companyUserId = self.companyUserId;

				var user = Meteor.users.findOne({_id: companyUserId});

				if(!user.emails) {
			        var userEmail = user.profile.emailAddress;
			     }
			     else {
			        var userEmail = user.emails[0].address;
			    }
      			var salesPerson = self.salesPersonName;

      			var rootUrl = Session.get('rootUrl');

				Meteor.call('sendEmail', userEmail, 'LaunchTaffy <no-reply@launchtaffy.com>', salesPerson+' has marked a recent sale as paid', salesPerson+' has marked a recent sale as paid, indicating your payment has been received.<br /><a href="'+rootUrl+'/sale/'+self._id+'">Click here</a> to review the sale.'); 

			}
		});
	}
});

Template.sale.helpers({
	statusIs: function(status) {
    	return this.status === status;
  	},
  	statusLabel: function() {
  		if(this.status == 'pending') {
  			return 'info';
  		}
  		else if(this.status == 'approved' || this.status == 'paid') {
  			return 'success';
  		}
  		else if(this.status == 'rejected' || this.status == 'dispute') {
  			return 'danger';
  		}
  		else {
  			return 'default';
  		}
  	}

});

/*
	"leadCompanyName" : "jengasoft",
	"leadName" : "jan",
	"leadEmail" : "jan@jengasoft.com",
	"leadPhone" : "123-456-3245",
	"productName" : "jengastuff",
	"productPrice" : "788.54",
	"productBillingFrequency" : "annually",
	"companyId" : "xcRYJGKcqXHRud9o7",
	"salesPersonId" : "EAswGjBn3ZMjh7ku3",
	"salesPersonName" : "Adria Mooney",
	"status" : "pending",
	"companyName" : "acme",
	"companyUserId" : "FSiKQ2rie3psHHHkM" */

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
