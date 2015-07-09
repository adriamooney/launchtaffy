 Template.salespeople.helpers({
	salespeople: function() {
		//console.log(Meteor.users.find({'profile.isActive': true}).count());
		//var users = Meteor.users.find({ $and: [ {'profile.userType': 'salesperson'}, {'profile.isActive': true}, {'emails.0.verified': true} ] } ); 
		var users = Meteor.users.find({ $and: [ {'profile.userType': 'salesperson'}, {'profile.isActive': true} ] } ); 

		//console.log( users.count() );

		if (users.count() > 0) {
			return users;
		}
		else {
			return false;
		}

	}
	
});

/*Template.salespeople.onRendered(function () {
	 var $container = $('.grid');

	  $container.imagesLoaded( function(){
	    $container.masonry({
	      itemSelector : '.grid-item'
	    });
	  });

}); */

Template.salespeopleItem.helpers({
	numSales: function() {
		var sales = Sales.find({$or: [{$and: [{salesPersonId: this._id},{'status': 'approved'}]}, {$and: [{salesPersonId: this._id},{'status': 'paid'}]}]} ).count();  
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
		var leads = Leads.find({$or: [{$and: [{salesPersonId: this._id},{'status': 'approved'}]}, {$and: [{salesPersonId: this._id},{'status': 'paid'}]}]} ).count();   
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
	buttonClicked: function() {
		return Session.get('buttonClicked');
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
		Session.set('buttonClicked', true);
		var senderId = Meteor.userId();
		//console.log(senderId);
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
					//console.log(result);
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
					var rootUrl = Session.get('rootUrl');
					AppMessages.throw('You have now approved this salesperson.', 'success');
					Meteor.call('sendEmail', useremail, 'LaunchTaffy <no-reply@launchtaffy.com>', 'You have been approved!', 'You have been approved by '+companyName+'<br /><br /><a href="'+rootUrl+'/company/'+company._id+'">View Company</a>', function(err) {
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
					var rootUrl = Session.get('rootUrl');
					AppMessages.throw('You have revoked approval this salesperson.', 'success');
					Meteor.call('sendEmail', useremail, 'LaunchTaffy <no-reply@launchtaffy.com>', 'Your approval has been revoked', 'Your approval to sell for '+companyName+' has been revoked.  You are no long authorized to sell for <a href="'+rootUrl+'/company/'+company._id+'">'+company.name+'</a>.', function(err) {
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

Template.salesProfile.onRendered(function () {
	
	var userId = this.data._id;

	var reviews = Reviews.find({userId: userId });

	var arr = [];
	
	reviews.forEach(function(doc){  //cursor.forEach
		arr.push(doc.rating);

	});

	function arrayAverage(arr) {
      return _.reduce(arr, function(memo, num) {
        return memo + num;
      }, 0) / (arr.length === 0 ? 1 : arr.length);
    }


	$('#averageScore').raty({
	  halfShow : true,
	  hints: ["bad", "poor", "average", "good", "excellent"],
      starHalf: 'fa fa-star-half-o',
      starOff: 'fa fa-star-o',
      starOn: 'fa fa-star',
      readOnly: true,
      starType : 'i',
	  score    : arrayAverage(arr)
	});
});

Template.updateSalesForm.helpers({
	approvedCompanies: function() {
		var companiesArr = this.profile.approvedCompanies;
		if(companiesArr && companiesArr.length>0) {
			var ids = companiesArr;
			var companies = Companies.find({_id: {$in: ids}});
			return companies;
		}
		else {
			return false;
		}
		

	}

}); 


Template.salespeopleItem.onRendered(function () {
	var userId = this.data._id;

	//console.log(this);

	var reviews = Reviews.find({userId: userId });

	var arr = [];
	
	reviews.forEach(function(doc){  //cursor.forEach
		arr.push(doc.rating);

	});

	function arrayAverage(arr) {
      return _.reduce(arr, function(memo, num) {
        return memo + num;
      }, 0) / (arr.length === 0 ? 1 : arr.length);
    }

	$('#averageScore-'+userId).raty({
	  halfShow : true,
	  hints: ["bad", "poor", "average", "good", "excellent"],
      starHalf: 'fa fa-star-half-o',
      starOff: 'fa fa-star-o',
      starOn: 'fa fa-star',
      readOnly: true,
      starType : 'i',
	  score    : arrayAverage(arr)
	});
});
