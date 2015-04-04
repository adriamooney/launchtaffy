AutoForm.hooks({
  insertCompanyForm: {

    // Called when any submit operation succeeds
    onSuccess: function(formType, result) {
      //console.log(result);
      var company = Companies.findOne({_id: result});
      //var email = company.email;

      Meteor.users.update({_id: company.companyId}, {$set: {'profile.companyId': result, 'profile.profileStatus': 1}});

      //Router.go('/');

      //console.log(email);
      //Accounts.createUser({email:email, password: 'password', profile: {companyId: result, userType: 'company'} });
      
      //Meteor.call('createNewCompanyUser', email, result);
       //Accounts.sendEnrollmentEmail(result); //needs to be called from server. make a method for this
    }
  },
  updateCompanyForm: {
    onSuccess: function(formType, result) {
    var companyProfileStatus;

    //TODO: this is not needed. probably doesn't work anyway:

      if (this.template.find('#name').value == '') {  //TODO: flesh this out later so profile can be done by a %
        companyProfileStatus = 0;
      }
      else {
        companyProfileStatus = 1;
      } 
      var id = this.docId;

      Companies.update({_id: id}, {$set: {companyProfileStatus: companyProfileStatus}}); 


    }
  },
  addSaleForm: {
    before: {
    // Replace `formType` with the form `type` attribute to which this hook applies
    insert: function(doc, result) {
      // Potentially alter the doc


      var companyName = this.template.$('#companyId option:selected').text();
      var cId = this.template.find('#companyId').value;

      var company = Companies.findOne({_id: cId});
      var companyUserId = company.companyId;


     // doc = _.extend(doc, { companyName: companyName });
      doc.companyName = companyName;
      doc.companyUserId = companyUserId;

      this.result(doc);  //why isn't this working?
      return doc;

      // Then return it or pass it to this.result()
      //return doc; (synchronous)
      //return false; (synchronous, cancel)
      //this.result(doc); (asynchronous)
      //this.result(false); (asynchronous, cancel)
      }
    },
    after: {
    //Send email here
      insert: function(error, result) {
        console.log(result);
      }
    },
    onSuccess: function(formType, result) {
      console.log(result);

      //TODO: SEND EMAIL TO email associated with companyUserId.  provide a way for them to approve the sale,
      // which will change status to 'approved';
    }
  }
/*  updateCompanyForm: {
      onSuccess: function(formType, result) {
        console.log(this.docId);

      }

  }*//*, 
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

