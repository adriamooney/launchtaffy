if (!Meteor.users.findOne({'profile.emailAddress': 'adriamooney+sales1@gmail.com'})) {
	Meteor.users.insert({
		profile: {
			"firstName" : "Sally",
			"headline" : "I can close any sale!",
			"lastName" : "McSeller",
			"emailAddress" : "adriamooney+sales1@gmail.com",
			"pictureUrl" : "https://media.licdn.com/mpr/mprx/0_Tw3KHRunjIr4FPHo_mh_HZgvxu5qL9Ho_EzfHMpe87lXVt0EDSAyQJeQlXLIQAd68eimFOaKTKDH",
			"publicProfileUrl" : "https://www.linkedin.com/in/adriamooney",
			"skills" : {
				"_total" : 3,
				"values" : [
					{
						"id" : 23,
						"skill" : {
							"name" : "sales"
						}
					},
					{
						"id" : 24,
						"skill" : {
							"name" : "software"
						}
					},
					{
						"id" : 25,
						"skill" : {
							"name" : "lead generation"
						}
					}

				]
			},
			"userType" : "salesperson",
			"isActive" : true,
			"profileStatus" : 0
		}
	});
}

if (!Meteor.users.findOne({'profile.emailAddress': 'adriamooney+company1@gmail.com'})) {
	var companyId = Meteor.users.insert({
		profile: {
			"firstName" : "George",
			"headline" : "I am a company",
			"lastName" : "McCompany",
			"emailAddress" : "adriamooney+company1@gmail.com",
			"pictureUrl" : "https://media.licdn.com/mpr/mprx/0_Tw3KHRunjIr4FPHo_mh_HZgvxu5qL9Ho_EzfHMpe87lXVt0EDSAyQJeQlXLIQAd68eimFOaKTKDH",
			"publicProfileUrl" : "https://www.linkedin.com/in/adriamooney",
			"skills" : {
				"_total" : 3,
				"values" : [
					{
						"id" : 23,
						"skill" : {
							"name" : "sales"
						}
					},
					{
						"id" : 24,
						"skill" : {
							"name" : "software"
						}
					},
					{
						"id" : 25,
						"skill" : {
							"name" : "lead generation"
						}
					}

				]
			},
			"userType" : "company",
			"isActive" : true,
			"profileStatus" : 0
		}
	});
}


