var subscriptions = new SubsManager();

Router.configure({
  layoutTemplate: 'layout',  //main layout (header, footer stuff that doesn't change). contains yield helper where dynamic content goes into based on route
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
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
        SessionStore.set('userType', 'salesperson');
        Accounts.onLogin(function() {
          Router.go('/dashboard/');
        });
    }
});

Router.route('/sales/landing/', {
    name: 'salesLanding',
    layoutTemplate:'homepageLayout',
    after: function () {
        ServerSession.set('userType', 'salesperson');
        Accounts.onLogin(function() {
          Router.go('/dashboard/');
        });
    }
});

Router.route('/sales/:id/l/', {
    name: 'salesLandingWithForm',
    layoutTemplate:'homepageLayout',
    waitOn:function() {
        return [subscriptions.subscribe('featuredCompanies'), subscriptions.subscribe('companies')];
    },
    after: function () {
        ServerSession.set('userType', 'salesperson');
        var path = Router.current().location.get().path;
        var pathArr = path.split('/');
        //var loc = pathArr[1]+'-'+pathArr[2];
        var loc = pathArr[2];
        //Session.set('referralPath', loc);
        SessionStore.set('referralPath', loc);

        Accounts.onLogin(function() {
          Router.go('/dashboard/');
          //ServerSession.set('referralPath', '');
        });

    }
});

Router.route('/sales/:id/lv2/', {
    name: 'salesLandingV2',
    layoutTemplate:'landingLayout',
    waitOn:function() {
        return [subscriptions.subscribe('featuredCompanies'), subscriptions.subscribe('companies')];
    },
    after: function () {
        ServerSession.set('userType', 'salesperson');
        var path = Router.current().location.get().path;
        var pathArr = path.split('/');
        //var loc = pathArr[1]+'-'+pathArr[2];
        var loc = pathArr[2];
        SessionStore.set('referralPath', loc);

        Accounts.onLogin(function() {
          Router.go('/dashboard/');
        });

    }
});

Router.route('/company/signup/', {
    name: 'companySignup',
    after: function () {
        ServerSession.set('userType', 'company');
        Accounts.onLogin(function() {
          Router.go('/dashboard/');
        });
    }
});

Router.route('/company/landing/', {
    name: 'companyLanding',
    layoutTemplate:'homepageLayout',
    waitOn:function() {
        return [subscriptions.subscribe('featuredSalesPeople'), subscriptions.subscribe('users')];
    },
    after: function () {
        ServerSession.set('userType', 'company');
        Accounts.onLogin(function() {
          Router.go('/dashboard/');
        });
    }
});

Router.route('/company/:id/ref/', {
    name: 'companyLandingReferral',
    layoutTemplate:'landingLayout',
    waitOn:function() {
        return [subscriptions.subscribe('featuredSalesPeople'), subscriptions.subscribe('users')];
    },
    after: function () {
        ServerSession.set('userType', 'company');

        var path = Router.current().location.get().path;
        var pathArr = path.split('/');
        var loc = pathArr[2];
        SessionStore.set('referralPath', loc);

        Accounts.onLogin(function() {
          Router.go('/dashboard/');
        });
    }
});

Router.route('/message/:_id', {
    name: 'thread',
    data: function() {
        return Threads.findOne(this.params._id);
    },
    //wait for the data to be rendered before showing the layout
    waitOn: function() { 
      return [subscriptions.subscribe('companies'), subscriptions.subscribe('users'), subscriptions.subscribe('messages'), subscriptions.subscribe('sales'), subscriptions.subscribe('companyTypeSales'), Meteor.subscribe('news'), subscriptions.subscribe('threads'), subscriptions.subscribe('leads')];

    }
});

Router.route('/affiliate-report/:_id', {
    name: 'referralPathReport',
    data: function() {
        var referralPath = this.params._id;
        return Meteor.users.find({'profile.referralPath':referralPath}, {sort: {createdAt: -1}});
    },
    waitOn: function() { 
      return [subscriptions.subscribe('users'), subscriptions.subscribe('leads'), subscriptions.subscribe('sales')];

    }
});

Router.route('/news/:_id', {
    name: 'updateNews',
    data: function() {
        return News.findOne(this.params._id);
    },
    waitOn: function() { 
      return Meteor.subscribe('news');

    }
});

Router.route('/favorites/:_id', {
    name: 'favorites',
    data: function() {
        return Meteor.users.findOne(this.params._id);
    },
    waitOn: function() { 
      return [subscriptions.subscribe('companies'), subscriptions.subscribe('users'), subscriptions.subscribe('messages'), subscriptions.subscribe('sales'), subscriptions.subscribe('companyTypeSales'), subscriptions.subscribe('threads'), subscriptions.subscribe('leads')];

    }
});

Router.route('/sale/:_id', {
    name: 'sale',
    data: function() {
        return Sales.findOne(this.params._id);
    },
    waitOn: function() { 
      return [subscriptions.subscribe('companies'), subscriptions.subscribe('users'), subscriptions.subscribe('messages'), subscriptions.subscribe('sales'), subscriptions.subscribe('companyTypeSales'), subscriptions.subscribe('threads'), subscriptions.subscribe('leads')];

    }
});

Router.route('/lead/:_id', {
    name: 'lead',
    data: function() {
        return Leads.findOne(this.params._id);
    },
    waitOn: function() { 
      return [subscriptions.subscribe('companies'), subscriptions.subscribe('users'), subscriptions.subscribe('messages'), subscriptions.subscribe('sales'), subscriptions.subscribe('companyTypeSales'), subscriptions.subscribe('threads'), subscriptions.subscribe('leads')];

    }
});

Router.route('/company/:_id', {
    name: 'company',
    data: function() {
        return Companies.findOne(this.params._id);
    },
    waitOn: function() { 
      return [subscriptions.subscribe('companies'), subscriptions.subscribe('users'), subscriptions.subscribe('messages'), subscriptions.subscribe('sales'), subscriptions.subscribe('companyTypeSales'), subscriptions.subscribe('threads'), subscriptions.subscribe('leads'), subscriptions.subscribe('quiz'), subscriptions.subscribe('reviews')];

    }
});

Router.route('/profile/:_id', {
    name: 'profile',
    data: function() {
        return Meteor.users.findOne(this.params._id);
    },
    waitOn: function() { 
      return [subscriptions.subscribe('companies'), subscriptions.subscribe('users'), subscriptions.subscribe('messages'), subscriptions.subscribe('sales'), subscriptions.subscribe('companyTypeSales'), subscriptions.subscribe('threads'), subscriptions.subscribe('leads'), subscriptions.subscribe('quiz'), subscriptions.subscribe('reviews')];

    }
});

Router.route('/leads-offer/', {
    name: 'leadsOffer'
});

Router.route('/contact/', {
    name: 'contact',
    waitOn: function() {
      return subscriptions.subscribe('companies');
    }
});

Router.route('/forgot-password/', {
  name: 'forgotPassword'
});

Router.route('/companies/', {
    name: 'companies',
    waitOn: function() { 
      return [subscriptions.subscribe('companies'), subscriptions.subscribe('users'), subscriptions.subscribe('messages'), subscriptions.subscribe('sales'), subscriptions.subscribe('companyTypeSales'), subscriptions.subscribe('threads'), subscriptions.subscribe('leads'), subscriptions.subscribe('reviews')];

    }
});

Router.route('/salespeople/', {
    name: 'salespeople',
    waitOn: function() { 
      return [subscriptions.subscribe('companies'), subscriptions.subscribe('users'), subscriptions.subscribe('messages'), subscriptions.subscribe('sales'), subscriptions.subscribe('companyTypeSales'), subscriptions.subscribe('threads'), subscriptions.subscribe('leads'), subscriptions.subscribe('reviews')];

    }
});

Router.route('/messages/', {
    name: 'messages',
    waitOn: function() { 
      return [subscriptions.subscribe('companies'), subscriptions.subscribe('users'), subscriptions.subscribe('messages'), subscriptions.subscribe('sales'), subscriptions.subscribe('companyTypeSales'), subscriptions.subscribe('threads'), subscriptions.subscribe('leads')];

    }
});


Router.route('/news/', {
    name: 'news',
    waitOn: function() { 
        if(Meteor.user()) {
             if(Meteor.user().profile.isAdmin) {
              return [Meteor.subscribe('news'), Meteor.subscribe('featuredSalesPeople'), subscriptions.subscribe('users')];
            }
            else {
              Router.go('/dashboard/')
            }
        }
     
    }
});

Router.route('/sales/', {
    name: 'sales',
    waitOn: function() { 
      return [subscriptions.subscribe('companies'), subscriptions.subscribe('users'), subscriptions.subscribe('messages'), subscriptions.subscribe('sales'), subscriptions.subscribe('companyTypeSales'), subscriptions.subscribe('threads'), subscriptions.subscribe('leads')];

    }

   /* data: function() {
        return Meteor.users.findOne(this.params._id);
    } */
});

Router.route('/leads/', {
    name: 'leads',
    waitOn: function() { 
      return [subscriptions.subscribe('companies'), subscriptions.subscribe('users'), subscriptions.subscribe('messages'), subscriptions.subscribe('sales'), subscriptions.subscribe('companyTypeSales'), subscriptions.subscribe('threads'), subscriptions.subscribe('leads')];

    }
});

Router.route('/login/', {
    name: 'login',
    after: function () {
      ServerSession.get('userType');
      
      //ServerSession.set('userType', 'other');
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
      return [subscriptions.subscribe('companies'), subscriptions.subscribe('users'), subscriptions.subscribe('messages'), subscriptions.subscribe('sales'), subscriptions.subscribe('companyTypeSales'), subscriptions.subscribe('threads'), subscriptions.subscribe('leads'), Meteor.subscribe('linkedinmessages'), Meteor.subscribe('news')];

    }
});

Router.route('/', {
    name: 'home',
    layoutTemplate:'homepageLayout'/*,
    waitOn: function() {
      return subscriptions.subscribe('companies');
    } */
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
};

/*var isCompany = function() {
   if(! Meteor.user()) {
    if(Meteor.loggingIn()) {
      this.render(this.loadingTemplate);
    }
  } 
  else if ( Meteor.user().profile.userType == 'salesperson' ){
      this.render('companyProfileAccessDenied');
  }
  else {
    this.next(); //this is iron router language
  }
} */

Router.onBeforeAction('bodyClass');

Router.onBeforeAction(requireLogin, {except: ['home', 'login', 'companySignup', 'salesSignup', 'terms', 'privacy', 'salesLanding', 'salesLandingV2', 'salesLandingWithForm', 'companyLanding', 'companyLandingReferral', 'contact', 'blogShow', 'blogIndex']});

Router.onBeforeAction('dataNotFound', {only: ['profile', 'sale', 'sales', 'favorites', 'company']});

//Router.onBeforeAction(isCompany, {only: ['company']});




