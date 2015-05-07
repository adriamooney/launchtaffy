Template.newQuiz.events({
	'click #add-answer': function(e) {
		e.preventDefault();
		Session.set('newAnswer', 'newAnswer');
		console.log(Session.get('newAnswer'));
	}
});

Template.newQuiz.helpers({
	getQuizAnswer: function() {
		var a = Session.get('newAnswer');
		
		if (a == 'newAnswer') {
			console.log(a);
			
			return a;
		}
	}
});

//TODO:  make it so you click a button that adds a new quiz, which enters it into the database.  
//then add answers can just update the database instead of using this session thing.