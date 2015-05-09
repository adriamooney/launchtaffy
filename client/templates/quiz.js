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
		//Meteor.call('updateQuiz', this._id, name, 'boo', ['c','d'], 1);

		$('.quiz-question').each(function() {
			var question = $(this).val();
			var answers = $(this).closest('.question-group').find('.quiz-answer').get();
			var answersArr = [];

			$(answers).each(function(index, iterator) {
				answersArr.push($(iterator).val());
			});

			//TODO: need to get the index of the radio that's checked and pass that along.
			//do a loop of each question and submit the question and answers 

			console.log(answersArr);
			//Meteor.call('updateQuiz', this._id, name, question, ['c','d'], 1);

		});

		

		//updateQuiz: function(id, question, answers, correct) {
	},
	'click #add-answer': function() {
		//Meteor.call('addQuizAnswer' )
	},
	'click #add-question': function() {
		var id = this._id;
		console.log(id);
		Meteor.call('addQuizQuestion', id);
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

