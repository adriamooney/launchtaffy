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

Template.registerHelper("currentYear", function(param, arr) {
    var currYear = moment(new Date()).year();
    return currYear;
});

Template.registerHelper("equals_or", function(param, arr) {
   arr = arr.split(",");
   if (arr.indexOf(param) !== -1) {
      return true;
   } 
   else {
     return false;
   }
});