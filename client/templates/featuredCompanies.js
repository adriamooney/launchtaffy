Template.addFeaturedCompanies.events({
	'submit form': function(e, template) {

		e.preventDefault();
		var id = template.find('#addfeaturedCompany').value;
		Meteor.call('addFeaturedCompanies', id, function(err) {
			if(!err) {
				AppMessages.throw('added featured company', 'success');
				$('#addfeaturedCompany').val('');
			}
		});
	},
	'click #remove': function(e, template) {
		e.preventDefault();
		var id = template.find('#addfeaturedCompany').value;
		Meteor.call('removeFeaturedCompanies', id, function(err) {
			if(!err) {
				AppMessages.throw('removed featured company', 'success');
				$('#addfeaturedCompany').val('');
			}
		});
	}
});

Template.featuredCompanies.helpers({
	featuredCompanies: function() {
		var company = FeaturedCompanies.find();
		var companyArr = [];
		company.forEach(function (company) {
			var id = company.companyId;
		  	companyArr.push(id);
		});
		var featuredCompany = Companies.find({_id: {$in: companyArr}}).fetch();
		if(featuredCompany) {

			return featuredCompany;
		} 

		
	}
});

Template.featuredCompaniesWidget.helpers({
	featuredCompanies: function() {
		var company = FeaturedCompanies.find();
		
		var companyArr = [];
		company.forEach(function (company) {

			var id = company.companyId;
		  	companyArr.push(id);
		});
		//console.log(companyArr);
		var featuredCompany = Companies.find({_id: {$in: companyArr}}, {fields: {'name':1, _id:1, 'description': 1, 'logoUrl': 1, 'logo': 1}}).fetch();
		
		if(featuredCompany) {
			//console.log(featuredCompany);
			return featuredCompany;
		} 

		
	},
	descriptionTruncated: function() {
		//console.log(this.description);

		var description = s.prune(this.description, 150, "...");
		return description;
	}
});

Template.featuredCompaniesWidget.onRendered(function () {
    $('#featuredCompaniesWidget').slick({
      arrows: false,
      dots:false,
      infinite: true,
	  slidesToShow: 1,
	  slidesToScroll: 1,
	  autoplay:true,
	  speed: 700,
	  fade: true,
	  cssEase: 'linear'
    });

});


