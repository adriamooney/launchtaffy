Meteor.startup(function () {

/*Accounts.onCreateUser(function(options, user) {
  var userId = user._id;

  Accounts.sendEnrollmentEmail(userId);  //should only do this for companies

  return user;
});
*/

    UploadServer.init({
        tmpDir: process.env.PWD + '/.uploads/tmp',
        uploadDir: process.env.PWD + '/.uploads/',
        maxPostSize: 120000000, // max post size: 120 MB
        maxFileSize:  100000, // max post size: 100 KB
        mimeTypes: {
            "jpeg": "image/jpeg",
            "jpg": "image/jpeg",
            "png": "image/png",
            "gif": "image/gif"
        },
        acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i,
        checkCreateDirectories: true //create the directories for you
    });

    // By default, the email is sent from no-reply@meteor.com. If you wish to receive email from users asking for help with their account, be sure to set this to an email address that you can receive email at.
    Accounts.emailTemplates.from = 'LaunchTaffy <no-reply@launchtaffy.com>';

    // The public name of your application. Defaults to the DNS name of the application (eg: awesome.meteor.com).
    Accounts.emailTemplates.siteName = 'LaunchTaffy';

    // A Function that takes a user object and returns a String for the subject line of the email.
    Accounts.emailTemplates.verifyEmail.subject = function(user) {
    return 'Confirm Your Email Address';
    };

    // A Function that takes a user object and a url, and returns the body text for the email.
    // Note: if you need to return HTML instead, use Accounts.emailTemplates.verifyEmail.html
    Accounts.emailTemplates.verifyEmail.text = function(user, url) {
    return 'click on the following link to verify your email address: ' + url;
    };
});
