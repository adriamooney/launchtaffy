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
		var reviewerId = this.commenterId;
		var reviewer = Meteor.users.findOne({_id: reviewerId});
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
		var reviewerId = this.commenterId;
		var reviewer = Meteor.users.findOne({_id: reviewerId});
		if(reviewer.profile.userType == 'company') {
			var companyId = reviewer._id;
			var company = Company.findOne({_id: companyId});
			return company.logoUrl;
		}
		else {
			return reviewer.profile.pictureUrl;
		}
	}
});


Template.reviewItem.onRendered(function () {

	var rating = this.data.rating;

	$('#starRating-'+this.data._id).raty({
	  halfShow : true,
	  hints: ["bad", "poor", "average", "good", "excellent"],
      starHalf: 'fa fa-star-half-o',
      starOff: 'fa fa-star-o',
      starOn: 'fa fa-star',
      readOnly: true,
      starType : 'i',
	  score    : rating
	}); 
});


