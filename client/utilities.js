 var isValidLength = function(val, field) {
    if (val.length >= 6) {
      return true;
    } else {
      AppMessages.throw('Field must be at least 6 characters', 'danger');
      return false; 
    } 
  }


  // trim helper
  var trimInput = function(val) {
    return val.replace(/^\s*|\s*$/g, "");
  }

  //var email = trimInput(email);

   //if (isValidLength(userPassword) // &amp;&amp; other validations) {
    // Then use the Meteor.createUser() function
  //}