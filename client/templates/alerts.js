
AppMessages = {
  // Local (client-only) collection
  collection: new Mongo.Collection(null),

  throw: function(message, messageType) {
    AppMessages.collection.insert({message: message, messageType: messageType, seen: false})
  }
};

AppMessages.collection.allow({ //TODO: this needs to be locked down, this is dangerous
  insert: function () { return true; },
  update: function () { return true; },
  remove: function () { return true; }
});

Template.appMessages.helpers({
  appMessages: function() {
    return AppMessages.collection.find();
  }
});

Template.appMessagesButton.helpers({
  appMessages: function() {
    return AppMessages.collection.find();
  }
});

Template.appMessage.onRendered(function() {
  var message = this.data;
  Meteor.setTimeout(function () {
    //AppMessages.collection.remove(message._id);
    //Meteor.call('removeMsg', message._id);
    AppMessages.collection.remove(message._id);
  }, 6000);
});

Template.appMessageButton.onRendered(function() {
  var message = this.data;
  Meteor.setTimeout(function () {
    //AppMessages.collection.remove(message._id);
    //Meteor.call('removeMsg', message._id);
    AppMessages.collection.remove(message._id);
  }, 3000);
});


Template.linkedInCompanyMessages.helpers({
  /*error: function() {
     var error = ServerSession.get('linkedInCompanyError');
        if(error == '') {
          return false;
        }
        else {
          return error;
        }
  },
  success: function() {
    var success = ServerSession.get('linkedInCompanySuccess');
        if(success == '') {
          return false;
        }
        else {
          return success;
        }
  },
 /* messageType: function() {
     var success = ServerSession.get('linkedInCompanySuccess');
     var error = ServerSession.get('linkedInCompanyError');
     if(success != '') {
       return 'success'
     }
     if(error != '') {
      return 'danger'
     }
     else {
      return false;
     }
  }, 
  hideMessage: function() {
     var success = ServerSession.get('linkedInCompanySuccess');
     var error = ServerSession.get('linkedInCompanyError');
     if(success == '' && error == '') {
        return true;
     }
  },
  display: function() {
    var success = ServerSession.get('linkedInCompanySuccess');
     var error = ServerSession.get('linkedInCompanyError');
     console.log(error);
     console.log(success);
     if(success == '' && error == '') {
        return 'none';
     }
     else {
      return 'block';
     }
  }, */
  messages: function() {
    return LinkedInMessages.find();
  }
});

Template.linkedInCompanyMessage.onRendered(function() {
  //var message = $('#message-'+this._id);
  var message = this.data;

  Meteor.setTimeout(function () {
    //LinkedInMessages.remove(message._id);
    Meteor.call('removeLinkedInMsg', message._id);
  }, 3000);
});





