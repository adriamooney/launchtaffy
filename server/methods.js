Meteor.methods({
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
    Messages.insert({'message': msg, 'from': senderId, 'to': toId, 'status': 'unread', 'timeStamp': new Date(now - 7 * 3600 * 1000)} );
  },
  replyToMessage: function(id, senderId, toId, msg) {
    Messages.update( {_id: id}, {$push: {'replies': {'to': toId, 'status': 'unread', 'message': msg, 'from': senderId} }});
   // Messages.update( {_id: id}, {$set: {'status': 'unread'}});
   //TODO: add some sort of incrmented flag for new replies, so we can use it to get numNewMessages. this flag will get rest when readMessages is hit

  },
  deleteMessage: function(id) {
    Messages.remove(id);
  },
  archiveMessage: function(id) {
    Messages.update({_id:id}, {$set: {'status': 'archived'}});
  },
  unarchiveMessage: function(id) {
    Messages.update({_id:id}, {$set: {'status': 'read'}});
  },
  readMessages: function() {
     Messages.update({to: Meteor.userId()}, {$set: {'status': 'read'}}, { multi: true });

      Messages.find({'replies.status': 'unread'}).forEach( function(doc) {
            doc.replies.forEach(function(reply){
                console.log(doc._id);
               
                //this is not working!
                //TODO: INSTEAD OF THIS, JUST ADD SOMETHING AT THE MESSAGES LEVEL LIKE NUMBER OF NEW REPLIES, AND INCREMENT ON THAT
               Messages.update({_id: doc._id}, {$set: {'replies.$.status': 'read'}});
        });
        });


  },
  sendEmail: function (to, from, subject, text) {
    check([to, from, subject, text], [String]);

    // Let other method calls from the same client start running,
    // without waiting for the email sending to complete.
    this.unblock();
    return Meteor.Mandrill.send({
        to: to,
        from: from,
        subject: subject,
        html: text
        //text: text
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
  getLinkedCompanyProfile: function(companyName, id) {

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

          //var keywords = _.extend({}, keywordsArr);


          console.log(keywords);
          
          if(!err) {
            
            Companies.insert(
              {
                name: name, 
                description: description, 
                websiteUrl: websiteUrl,
                logoUrl: logoUrl,
                //keywords: [keywords],
                keywords: keywords,
                accountIsActive: true, 
                companyId: userId, 
                companyProfileStatus:1
              });

            //Companies.update({companyId: userId}, {$push: {keywords:keywords}});

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

