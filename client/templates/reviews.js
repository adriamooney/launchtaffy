Template.salesReviewForm.helpers({
	
	ratyOptions: function() {
		return {
	      	half     : true,
	      	hints: ["bad", "poor", "average", "good", "excellent"],
	      	starHalf: 'fa fa-star-half-o',
      		starOff: 'fa fa-star-o',
      		starOn: 'fa fa-star',
      		starType : 'i',
	     
	    }
	}
});

Template.companyReviewForm.helpers({
	
	ratyOptions: function() {
		return {
	      	half     : true,
	      	hints: ["bad", "poor", "average", "good", "excellent"],
	      	starHalf: 'fa fa-star-half-o',
      		starOff: 'fa fa-star-o',
      		starOn: 'fa fa-star',
      		starType : 'i',
	     
	    }
	}
});

Template.reviewItem.helpers({
	reviewerName: function() {
		console.log(this);
		var reviewerId = this.commenterId;
		console.log(reviewerId);
		var reviewer = Meteor.users.findOne({_id: reviewerId});
		console.log(reviewer.profile.firstName);
		if(reviewer.profile.userType == 'company') {
			var companyId = reviewer._id;
			var company = Company.findOne({_id: companyId});
			return company.name;
		}
		else {
			return reviewer.profile.firstName +' '+ reviewer.profile.lastName;
		}
	},
	reviewerImg: function() {
		console.log(this);
	}
});


