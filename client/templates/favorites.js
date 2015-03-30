Template.header.helpers({
	hasFavorites: function() {
		var user = Meteor.user().profile;
		if( (user.favoriteCompanies && user.favoriteCompanies.length >0) ||(user.favoriteSalesPeople && user.favoriteSalesPeople.length >0) ) {
			return true;
		}
		else {
			return false;
		}
	}
});

Template.favorites.helpers({
	favoriteCompanies: function() {
		var user = Meteor.user().profile;
		if( (user.favoriteCompanies && user.favoriteCompanies.length >0)) {
			var companyIds = user.favoriteCompanies;
			
			var companies = Companies.find({_id: {$in: companyIds}});
			return companies;
				
		}
		else {
			return false;
		}
	},
	favoriteSalesPeople: function() {
		var user = Meteor.user().profile;
		if( (user.favoriteSalesPeople && user.favoriteSalesPeople.length >0)) {
			var salesIds = user.favoriteSalesPeople;
			var salespeople = Meteor.users.find({_id: {$in: salesIds}});
			console.log(salespeople);
			return salespeople;
				
		}
		else {
			return false;
		}
	}
});


