Router.configure({
  layoutTemplate: 'layout',  //main layout (header, footer stuff that doesn't change). contains yield helper where dynamic content goes into based on route
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  yieldTemplates: {
  	'sidebar': {to: 'sidebar'}
  },
  //wait for the data to be rendered before showing the layout
  waitOn: function() { 
  	return [Meteor.subscribe('companies'), Meteor.subscribe('users'), Meteor.subscribe('messages'), Meteor.subscribe('sales'), Meteor.subscribe('companyTypeSales'), Meteor.subscribe('news'), Meteor.subscribe('threads')];
  	//return [Meteor.subscribe('accountplans')];
  	//return Meteor.subscribe('companies');

	}
  //told the router to use the layout template layout.html as the default layout for all routes
});

Router.route('/', {
    name: 'home',
    layoutTemplate:'homepageLayout'
});


Router.route('/dashboard', {
    name: 'dashboard'
});

Router.route('/forgot-password/', {
  name: 'forgotPassword'
});

Router.route('/sales/signup/', {
    name: 'salesSignup',
    after: function () {
        ServerSession.set('userType', 'salesperson');
        Accounts.onLogin(function() {
          Router.go('/');
        });
    }
});

Router.route('/company/signup/', {
    name: 'companySignup',
    after: function () {
        ServerSession.set('userType', 'company');
        Accounts.onLogin(function() {
          Router.go('/');
        });
    }
});

Router.route('/companies/', {
    name: 'companies'
});

Router.route('/salespeople/', {
    name: 'salespeople'
});

Router.route('/messages/', {
    name: 'messages'
});

Router.route('/news/', {
    name: 'news'
});

Router.route('/news/:_id', {
    name: 'updateNews',
    data: function() {
        return News.findOne(this.params._id);
    }
});

Router.route('/favorites/:_id', {
    name: 'favorites',
    data: function() {
        return Meteor.users.findOne(this.params._id);
    }
});

Router.route('/sales/:_id', {
    name: 'sales',
    data: function() {
        return Meteor.users.findOne(this.params._id);
    }
});

Router.route('/sale/:_id', {
    name: 'sale',
    data: function() {
        return Sales.findOne(this.params._id);
    }
});

Router.route('/login/', {
    name: 'login',
    after: function () {
      ServerSession.set('userType', 'other');
    }
});


Router.route('/company/:_id', {
    name: 'company',
    data: function() {
        return Companies.findOne(this.params._id);
    }
});

Router.route('/profile/:_id', {
    name: 'profile',
    data: function() {
        return Meteor.users.findOne(this.params._id);
    }
});




