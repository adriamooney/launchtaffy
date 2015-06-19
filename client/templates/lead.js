Template.addLead.helpers({
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

Template.companyTypeLeads.helpers({
	companyTypeLeads: function() {
		var user = Meteor.userId();
		var leads= Leads.find({companyUserId: user}); 
		if(leads.count() > 0) {
			return leads;
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
	            		if(value == 'approved' || value=='paid') {
	            			label = 'success';
	            		}
	            		if(value == 'rejected' || value=='dispute') {
	            			label = 'danger';
	            		}

	    				return new Spacebars.SafeString('<a href="/lead/'+object._id+'"><span class="label label-'+label+'">'+value+ '</span></a>' ); 
	    			}
	             },
	            { key: 'salesPersonName', label: 'Sales Person Name' },
	 			{ key: 'leadCompanyName', label: 'Lead Company Name' },
	    		{ key: 'leadEmail', label: 'Lead Email' },
	    		{ key: 'leadPhone', label: 'Lead Phone' },
	    		{ key: 'details', label: 'Details' }

            ]
        }; 
    }
});

Template.companyTypeLeadsWidget.helpers({
	leads: function() {
		var user = Meteor.userId();
		console.log(user);
		var leads = Leads.find({$and: [ { companyUserId: user }, { status: 'pending' } ] }, {sort: {timeStamp: -1}});
		console.log(leads.count());
		if(leads.count() > 0) {
			return leads;
		}
		else {
			return false;
		}
	},
	settings: function () {

        return {
            rowsPerPage: 10,
            showFilter: false,
            fields: [
	            { key: 'status', label: 'Status',
	            	fn: function(value,object) {
	    				return new Spacebars.SafeString('<a href="/lead/'+object._id+'"><span class="label label-info">'+value+ '</span></a>'); 
	    			}
	        	},
	 			{ key: 'leadCompanyName', label: 'Lead Company Name' },
	 			{ key: 'salesPersonName', label: 'Sales Person Name', fn: function(value, object) {
	 					return new Spacebars.SafeString('<a href="/profile/'+object.salesPersonId+'">'+value+'</a>');
	 				} 
	 			}

            ]
        }; 
    }

});

Template.salesTypeLeadsWidget.helpers({
	leads: function() {
		var user = Meteor.userId();
		var leads = Leads.find({$and: [ { salesPersonId: user }, { status: 'pending' } ] }, {sort: {timeStamp: -1}});


		if(leads.count() > 0) {
			return leads;
		}
		else {
			return false;
		}
	},
	settings: function () {

        return {
            rowsPerPage: 10,
            showFilter: false,
            fields: [
	            { key: 'status', label: 'Status',
	            	fn: function(value,object) {
	            		var label;
	            		if(value == 'pending') {
	            			label = 'info';
	            		}
	            		if(value == 'approved' || value == 'paid') {
	            			label = 'success';
	            		}
	            		if(value == 'rejected' || value == 'dispute') {
	            			label = 'danger';
	            		}

	    				return new Spacebars.SafeString('<span class="label label-'+label+'">'+value+ '</span>'); 
	    			}
	        	},
	            { key: 'companyName', label: 'Company Name', fn: function(value, object) {
	 					return new Spacebars.SafeString('<a href="/company/'+object.companyId+'">'+value+'</a>');
	 				} 
	 			},
	 			{ key: 'leadCompanyName', label: 'Lead Company Name' }

            ]
        }; 
    }

});

Template.salesTypeLeads.helpers({
	salesTypeLeads: function() {
		var user = Meteor.userId();
		var leads = Leads.find({salesPersonId: user}); 
		if(leads.count() > 0) {
			return leads;
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
	            		if(value == 'approved' || value== 'paid') {
	            			label = 'success';
	            		}
	            		if(value == 'rejected' || value== 'dispute') {
	            			label = 'danger';
	            		}

	    				//return new Spacebars.SafeString('<span class="label label-'+label+'">'+value+ '</span>'); 
	    				return new Spacebars.SafeString('<a href="/lead/'+object._id+'"><span class="label label-'+label+'">'+value+ '</span></a>' ); 

	    			}
	        	},
	            { key: 'companyName', label: 'Company Name' },
	 			{ key: 'leadCompanyName', label: 'Lead Company Name' },
	    		{ key: 'leadEmail', label: 'Lead Email' },
	    		{ key: 'leadPhone', label: 'Lead Phone' },
	    		{ key: 'details', label: 'Details' }

            ]
        }; 
    }
});

Template.lead.events({
	'click #approveSale': function(event, template) {
		var self = this;
		Meteor.call('updateLeadStatus', this._id, 'approved', function(err){
			if(!err) {
				AppMessages.throw('Lead approved!', 'success');
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

				Meteor.call('sendEmail', userEmail, 'LaunchTaffy <no-reply@launchtaffy.com>', 'Your lead has been approved!', salesPerson+', <br />your lead has been approved. <br /><a href="'+rootUrl+'/lead/'+self._id+'">Click here</a> to review the lead'); 

			}
		});

	},
	'click #rejectSale': function(event, template) {
		var self = this;
		Meteor.call('updateLeadStatus', this._id, 'rejected', function(err){
			if(!err) {
				AppMessages.throw('Lead rejected!', 'success');
				var salesPersonId = self.salesPersonId;
				//console.log(self);
				var user = Meteor.users.findOne({_id: salesPersonId});
				//console.log(user);

				if(!user.emails) {
			        var userEmail = user.profile.emailAddress;
			     }
			     else {
			        var userEmail = user.emails[0].address;
			    }
      			var salesPerson = self.salesPersonName;

      			var rootUrl = Session.get('rootUrl');

				Meteor.call('sendEmail', userEmail, 'LaunchTaffy <no-reply@launchtaffy.com>', 'Your lead has been rejected', salesPerson+', <br />your lead has been rejected. <br /><a href="'+rootUrl+'/lead/'+self._id+'">Click here</a> to review the lead'); 

			}
		});
	},
	'click #paidSale': function() {
		var self = this;
		Meteor.call('updateLeadStatus', this._id, 'paid', function(err){
			if(!err) {
				AppMessages.throw('Lead marked as paid!', 'success');
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

				Meteor.call('sendEmail', userEmail, 'LaunchTaffy <no-reply@launchtaffy.com>', salesPerson+' has marked a recent lead as paid', salesPerson+' has marked a recent lead as paid, indicating your payment has been received.<br /><a href="'+rootUrl+'/lead/'+self._id+'">Click here</a> to review the lead.'); 

			}
		});
	}
});

Template.lead.helpers({
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
