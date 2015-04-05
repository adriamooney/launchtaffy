Template.allnews.helpers({
	news: function() {
		return News.find({'isActive':true});
	}
});

Template.editnews.helpers({
	news: function() {
		return News.find({});
	}
});