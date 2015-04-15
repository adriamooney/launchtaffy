AutoForm.hooks({
  insertCompanyForm: {

    // Called when any submit operation succeeds
    onSuccess: function(formType, result) {
      //console.log(result);
      var company = Companies.findOne({_id: result});
      //var email = company.email;

      Meteor.users.update({_id: company.companyId}, {$set: {'profile.companyId': result}});


    }
  },
  updateCompanyForm: {
    onSuccess: function(formType, result) {
    var companyProfileStatus;

    var id = this.docId;
    var company = Companies.findOne({_id: id});
    company.companyResources;
    if(company.companyResources) {
      companyProfileStatus = 1;
    }
    else {
      companyProfileStatus = 0;
    }

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
      console.log(cId);

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
      var sale = Sales.findOne({_id: result});
      var companyUserId = sale.companyUserId;
      var companyUser = Meteor.users.findOne({_id: companyUserId});
      var companyName = sale.companyName;

      if(!companyUser.emails) {
        var userEmail = companyUser.profile.emailAddress;
      }
      else {
        var userEmail = companyUser.emails[0].address;
      }
      var salesPerson = sale.salesPersonName;

      Meteor.call('sendEmail', userEmail, 'LaunchTaffy <no-reply@launchtaffy.com>', salesPerson+' got a new sale!', salesPerson+' got a new sale!<br /> <a href="http://localhost:3000/sale/'+result+'">Click here</a> to review and approve the sale', function(err) {
        if(!err) {
            AppMessages.throw('Message sent to '+companyName+' that you got a sale!', 'success');
        }
        else {
          console.log(err.reason);
        }
      }); 


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

