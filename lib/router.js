Router.configure({
  layoutTemplate: 'layout',  //main layout (header, footer stuff that doesn't change). contains yield helper where dynamic content goes into based on route
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  //trackPageView: true,
  //wait for the data to be rendered before showing the layout
  waitOn: function() { 
  	return [Meteor.subscribe('companies'), Meteor.subscribe('users'), Meteor.subscribe('messages'), Meteor.subscribe('sales'), Meteor.subscribe('companyTypeSales'), Meteor.subscribe('news'), Meteor.subscribe('threads')];

	},
  action: function () {
        if (this.ready()){
            this.render();
        }
        else
            this.render('loading');
  }
  //told the router to use the layout template layout.html as the default layout for all routes
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

Router.route('/sales/landing/', {
    name: 'salesLanding',
    layoutTemplate:'homepageLayout'
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

Router.route('/company/landing/', {
    name: 'companyLanding',
    layoutTemplate:'homepageLayout'
});

Router.route('/message/:_id', {
    name: 'thread',
    data: function() {
        return Threads.findOne(this.params._id);
    }
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

Router.route('/sale/:_id', {
    name: 'sale',
    data: function() {
        return Sales.findOne(this.params._id);
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
    },
    waitOn: function() {
      return Meteor.subscribe('linkedinmessages');
    }
});

Router.route('/contact/', {
    name: 'contact'
});

Router.route('/forgot-password/', {
  name: 'forgotPassword'
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

Router.route('/sales/', {
    name: 'sales',
   /* data: function() {
        return Meteor.users.findOne(this.params._id);
    } */
});

Router.route('/login/', {
    name: 'login',
    after: function () {
      ServerSession.set('userType', 'other');
    }
});

Router.route('/terms/', {
    name: 'terms'
});

Router.route('/privacy/', {
    name: 'privacy'
});

Router.route('/dashboard/', {
    name: 'dashboard',
    waitOn: function() {
      return Meteor.subscribe('linkedinmessages');
    }
});

Router.route('/', {
    name: 'home',
    layoutTemplate:'homepageLayout'
});

var requireLogin = function() {
  if(! Meteor.user()) {
    if(Meteor.loggingIn()) {
      this.render(this.loadingTemplate);
    }
    else {
      this.render('accessDenied');
    }
  } else {
    this.next(); //this is iron router language
  }
}


Router.onBeforeAction(requireLogin, {except: ['home', 'login', 'companySignup', 'salesSignup', 'terms', 'privacy', 'salesLanding', 'companyLanding', 'contact']});

Router.onBeforeAction('dataNotFound', {only: ['profile', 'sale', 'sales', 'favorites', 'company']});



