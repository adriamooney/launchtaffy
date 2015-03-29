Package.describe({
  name: 'adriamooney:accounts-linkedin',
  summary: "Accounts service for LinkedIn accounts",
  version: "0.1.1"
});

Package.onUse(function(api) {
  api.versionsFrom('1.0.4')

  api.use('accounts-base', ['client', 'server']);
  api.imply('accounts-base', ['client', 'server']);

  api.use('accounts-oauth', ['client', 'server']);
  api.use('adriamooney:linkedin@0.1.1', ['client', 'server']);

  api.addFiles(['linkedin_login_button.css'], 'client');
  api.addFiles('linkedin_common.js', ['client', 'server']);
  api.addFiles('linkedin_server.js', 'server');
  api.addFiles('linkedin_client.js', 'client');
});


