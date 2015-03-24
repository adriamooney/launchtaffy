AutoForm.hooks({
  insertCompanyForm: {

    // Called when any submit operation succeeds
    onSuccess: function(formType, result) {
      //console.log(result);
      var company = Companies.findOne({_id: result});
      //var email = company.email;

      Meteor.users.update({_id: company.companyId}, {$set: {'profile.companyId': result}});

      //Router.go('/');

      //console.log(email);
      //Accounts.createUser({email:email, password: 'password', profile: {companyId: result, userType: 'company'} });
      
      //Meteor.call('createNewCompanyUser', email, result);
       //Accounts.sendEnrollmentEmail(result); //needs to be called from server. make a method for this
    }
  },
  updateCompanyForm: {
      onSuccess: function(formType, result) {
        console.log(result);

      }

  }/*,
  userSignup: {
    onSubmit: function (insertDoc, updateDoc, currentDoc) {

     // var email = insertDoc.emails[0].address;
      console.log(insertDoc);


      Accounts.createUser({
        email: insertDoc.email,
        password: insertDoc.password
      });  


      this.done();

      return false;
    }

  }  */

});

