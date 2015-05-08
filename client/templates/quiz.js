Template.newQuiz.events({
	/*'click #add-answer': function(e) {
		e.preventDefault();
		Session.set('newAnswer', 'newAnswer');
		console.log(Session.get('newAnswer'));
	} */
	'click #add-quiz': function() {
		Meteor.call('newQuiz');
	},
	'submit #quizForm': function(e, template) {
		e.preventDefault();
		var name = template.find('#quizTitle').value;
		Meteor.call('updateQuiz', this._id, name, 'boo', ['c','d'], 1);

		//updateQuiz: function(id, question, answers, correct) {
	}
});

Template.newQuiz.helpers({
	/*getQuizAnswer: function() {
		var a = Session.get('newAnswer');
		
		if (a == 'newAnswer') {
			console.log(a);
			
			return a;
		}
	}, */
	quizzes: function() {
		var quiz = Quiz.find({companyUserId: Meteor.userId()});
		if(quiz.count() > 0) {
			return quiz;
		}
		else {
			return false;
		}
		
	}
});

