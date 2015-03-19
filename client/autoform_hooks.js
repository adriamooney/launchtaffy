AutoForm.hooks({
  insertCompanyForm: {

    // Called when any submit operation succeeds
    onSuccess: function(formType, result) {
      //console.log(result);
      var company = Companies.findOne({_id: result});
      var email = company.email;

      //console.log(email);
      Accounts.createUser({email:email, password: 'password', profile: {companyId: result} });
      
      //Meteor.call('sendInitialEmail', result);
       //Accounts.sendEnrollmentEmail(result); //needs to be called from server. make a method for this

    }
  }
});