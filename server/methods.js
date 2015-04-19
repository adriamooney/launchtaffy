Meteor.methods({
  getRootUrl: function(){
    var rootUrl = process.env.ROOT_URL;
    return rootUrl;
  },
	sendInitialEmail: function(result) {
		return Accounts.sendEnrollmentEmail(result);
	},
  createNewSalesUser: function(email, password, username) {
  		//check(doc, Schema.User);
  	   Accounts.createUser({email: email, password : password, username: username, profile: {userType: 'salesperson', isActive: true, profileStatus: 0}});
  }, 
  createNewCompanyUser: function(email, password, username) {
    Accounts.createUser({email: email, password : password, username: username, profile: {userType: 'company', isActive: true, profileStatus: 0}});
  },
  updateSalesUser: function(id, userData) {
    Meteor.users.update( {_id: id}, {$set: userData});
  },
  //TODO: updateCompanyUser
  sendMessage: function(senderId, toId, msg) {
    //senderId, companyId, msg
    var now = new Date().getTime();

    var thread = Threads.insert({'from': senderId, 'to': toId, 'status': 'active', timeStamp: new Date(now - 7 * 3600 * 1000)}, function(err,doc) {
      Messages.insert({'threadId': doc, 'message': msg, 'from': senderId, 'to': toId, 'status': 'unread', 'timeStamp': new Date(now - 7 * 3600 * 1000)} );
    });

    return thread;
  },
  //TODO: updates this stuff for new threads/message architecture
  //also need to update helper function and templates
  replyToMessage: function(id, senderId, toId, msg, threadId) {
   // Messages.update( {_id: id}, {$push: {'replies': {'to': toId, 'status': 'unread', 'message': msg, 'from': senderId} }});
    var now = new Date().getTime();
    Messages.insert({'threadId': threadId, 'message': msg, 'from': senderId, 'to': toId, 'status': 'unread', 'timeStamp': new Date(now - 7 * 3600 * 1000)} );
    Threads.update({_id: threadId}, {$set:{'timeStamp': new Date(now - 7 * 3600 * 1000)}})
  },
  deleteMessage: function(id) {
    Threads.remove({_id:id});
    Messages.remove({threadId: id}); 
  },
  archiveMessage: function(id) {
    Threads.update({_id:id}, {$set: {'status': 'archived'}});
    Messages.update({threadId: id}, {$set: {'status': 'archived'}}, { multi: true });
  },
  unarchiveMessage: function(id) {
    Threads.update({_id:id}, {$set: {'status': 'active'}});
    Messages.update({threadId: id}, {$set: {'status': 'read'}}, { multi: true });
  },
  readMessages: function() {
     Messages.update({to: Meteor.userId()}, {$set: {'status': 'read'}}, { multi: true } );
     //Messages.update({'replies.to': Meteor.userId()}, {$set: {'newReplies': 0}}, { multi: true });
  },
  sendEmail: function (to, from, subject, html, text) {
    check([to, from, subject, html], [String]);

    // Let other method calls from the same client start running,
    // without waiting for the email sending to complete.
    this.unblock();
    return Meteor.Mandrill.send({
        to: to,
        from: from,
        subject: subject,
        html: html,
        text: text
    });

    /*Email.send({
      to: to,
      from: from,
      subject: subject,
      text: text
    }); */
  },
  approveSalesPerson: function(companyId, userId) {
    //Meteor.users.update({_id: userId}, {$addToSet: {'profile.approvedCompanies': {'company': companyId
    Meteor.users.update({_id: userId}, {$addToSet: {'profile.approvedCompanies': companyId}}); 
    Meteor.users.update({_id: this.userId}, {$addToSet: {'profile.approvedSalesPeople': userId}});  
  },
  removeSalesPerson: function(companyId, userId) {
   // Meteor.users.update({_id: userId}, {$pull: {'profile.approvedCompanies': {'company': companyId}}});
    Meteor.users.update({_id: userId}, {$pull: {'profile.approvedCompanies': companyId}});
    Meteor.users.update({_id: this.userId}, {$pull: {'profile.approvedSalesPeople': userId}}); 
  },
  updateSaleStatus: function(saleId, status) {
    Sales.update({_id: saleId}, {$set: {'status': status}});
  },
  addToCompanyFavorites: function(companyId, userId) {
    Meteor.users.update({_id: userId}, {$addToSet: {'profile.favoriteCompanies': companyId}});
  },
  removeFromCompanyFavorites: function(companyId, userId) {
    Meteor.users.update({_id: userId}, {$pull: {'profile.favoriteCompanies': companyId}});
  },
  addToSalesPeopleFavorites: function(salesId, userId) {
    Meteor.users.update({_id: userId}, {$addToSet: {'profile.favoriteSalesPeople': salesId}});
  },
  removeFromSalesPeopleFavorites: function(salesId, userId) {
    Meteor.users.update({_id: userId}, {$pull: {'profile.favoriteSalesPeople': salesId}});
  },
  lastLogin: function(id) {
    var now = new Date().getTime();
    Meteor.users.update({ _id: id }, {
        $set: { 'profile.lastActiveOn': new Date(now - 7 * 3600 * 1000) }
      }); 
  },
  getLinkedCompanyProfile: function(companyName, id) {

      if( Meteor.user().services.linkedin.accessToken) {
        var accessToken = Meteor.user().services.linkedin.accessToken;
        var linkedin = Linkedin().init(accessToken);
        var userId = this.userId;
        var self = this;
        linkedin.companies.name(companyName, Meteor.bindEnvironment(function(err, company) {
    // Here you go
        //console.log(company);
          var name = company.name;
          var description = company.description;
          var websiteUrl=company.websiteUrl;
          var logoUrl= company.logoUrl;
          var keywordsArr = company.specialties.values;
          var keywords = keywordsArr.toString();

          var userId = self.userId;

          //var keywords = _.extend({}, keywordsArr);


          console.log(keywords);
          
          if(!err) {
            
           Companies.insert({
                name: name, 
                description: description, 
                websiteUrl: websiteUrl,
                logoUrl: logoUrl,
                //keywords: [keywords],
                keywords: keywords,
                accountIsActive: true, 
                companyId: userId, 
                companyProfileStatus:0,
                timeStamp: new Date(),
              }, function(err,doc) {
                Meteor.users.update({_id: userId}, {$set: {'profile.companyId': doc}});
              });


          } 

        }));
      }

  },
  updateLinkedCompanyProfile: function(companyName, id) {

    if( Meteor.user().services.linkedin.accessToken) {
        var accessToken = Meteor.user().services.linkedin.accessToken;
        var linkedin = Linkedin().init(accessToken);
        var userId = this.userId;
        linkedin.companies.name(companyName, Meteor.bindEnvironment(function(err, company) {
    // Here you go
        //console.log(company);
          var name = company.name;
          var description = company.description;
          var websiteUrl=company.websiteUrl;
          var logoUrl= company.logoUrl;
          var keywordsArr = company.specialties.values;
          var keywords = keywordsArr.toString();
          
          if(!err) {
            

            Companies.update({companyId: id}, {$set: {
              name: name, 
              description: description,
              websiteUrl: websiteUrl,
              logoUrl: logoUrl,
              keywords: keywords
            }});


          }

        }));
      }

  }

});

