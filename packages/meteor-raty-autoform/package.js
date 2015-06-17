Package.describe({
  name: 'adriamooney:raty-autoform',
  version: '0.0.1',
  summary: 'AutoForm input type for Raty, a jQuery star rating form control',
  //git: 'https://github.com/andreivolt/meteor-autoform-raty',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0');

  api.use([
    'aldeed:autoform@5.0.0',
    'coffeescript',
    'mquandalle:jade@0.4.1',
    'templating'
  ]);

  api.addFiles([
    'raty/lib/fonts/raty.eot',
    'raty/lib/fonts/raty.svg',
    'raty/lib/fonts/raty.ttf',
    'raty/lib/fonts/raty.woff',
    'raty/lib/images/cancel-off.png',
    'raty/lib/images/cancel-on.png',
    'raty/lib/images/star-half.png',
    'raty/lib/images/star-off.png',
    'raty/lib/images/star-on.png',
    'raty/lib/jquery.raty.css',
    'raty/lib/jquery.raty.js',
    'raty/lib/jquery.raty.css',
    'raty/lib/jquery.raty.js',
    'main.jade',
    'main.coffee'
  ], 'client');
});
