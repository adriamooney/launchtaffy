Template.addFeaturedSalesPeople.events({
	'submit form': function(e, template) {

		e.preventDefault();
		var id = template.find('#addfeaturedSalesPerson').value;
		Meteor.call('addFeaturedSalesPeople', id, function(err) {
			if(!err) {
				AppMessages.throw('added featured sales professional', 'success');
				$('#addfeaturedSalesPerson').val('');
			}
		});
	},
	'click #remove': function(e, template) {
		e.preventDefault();
		var id = template.find('#addfeaturedSalesPerson').value;
		Meteor.call('removeFeaturedSalesPeople', id, function(err) {
			if(!err) {
				AppMessages.throw('removed featured sales professional', 'success');
				$('#addfeaturedSalesPerson').val('');
			}
		});
	}
});

Template.featuredSalesPeople.helpers({
	featuredSalesPeople: function() {
		var people = FeaturedSalesPeople.find();
		var peopleArr = [];
		people.forEach(function (person) {
			var id = person.userId;
		  	peopleArr.push(id);
		});
		var featuredPeople = Meteor.users.find({_id: {$in: peopleArr}}).fetch();
		if(featuredPeople) {

			return featuredPeople;
		} 

		
	}
});

Template.featuredSalesPeopleWidget.helpers({
	featuredSalesPeople: function() {
		var people = FeaturedSalesPeople.find();
		var peopleArr = [];
		people.forEach(function (person) {
			var id = person.userId;
		  	peopleArr.push(id);
		});
		var featuredPeople = Meteor.users.find({_id: {$in: peopleArr}}, {fields: {'profile.firstName':1,'profile.lastName':1, _id:1, 'profile.pictureUrl':1, 'profile.headline': 1}}).fetch();
		if(featuredPeople) {

			return featuredPeople;
		} 

		
	},
	lastName:function() {
		var lastName = this.profile.lastName;
		console.log(this);
		var b = lastName.slice(0,1);
		return b+'.';
	}
});

Template.featuredSalesPeopleWidget.onRendered(function () {
    $('#featuredSalesWidget').slick({
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


