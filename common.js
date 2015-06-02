Sales = new Mongo.Collection("sales");
Leads = new Mongo.Collection("leads");
Companies = new Mongo.Collection("companies");
Messages = new Mongo.Collection("messages");
Threads = new Mongo.Collection("threads");
News = new Mongo.Collection("news");
Quiz = new Mongo.Collection("quiz");

FeaturedSalesPeople = new Mongo.Collection("featuredSalesPeople");
Reviews = new Mongo.Collection("reviews");

Companies.allow({
  insert: function () { return true; },
  update: function () { return true; }//,
  //remove: function () { return true; }
});

Sales.allow({
  insert: function () { return true; },
  update: function () { return true; }//,
  //remove: function () { return true; }
});

Leads.allow({
  insert: function () { return true; },
  update: function () { return true; }//,
  //remove: function () { return true; }
});

News.allow({
  insert: function () { return true; },
  update: function () { return true; }//,
  //remove: function () { return true; }
});

Reviews.allow({
  insert: function () { return true; },
  update: function () { return false; }//,
  //remove: function () { return true; }
});

LinkedInMessages = new Mongo.Collection('linkedinmessages');
//easy search:
//https://atmospherejs.com/matteodem/easy-search

EasySearch.createSearchIndex('salesPeopleIndex', {
        'field': ['profile.keywords', 'profile.bio', 'profile.headline'],
        'collection': Meteor.users,
        'use': 'mongo-db'
});

EasySearch.createSearchIndex('messages', {
        'field': ['message'],
        'collection': Messages,
        'use': 'mongo-db'
});

//Meteor.users.initEasySearch('usersIndex');

//Companies.initEasySearch('companies');

EasySearch.createSearchIndex('companiesIndex', {
        'field': ['name', 'description', 'keywords'],
        'collection': Companies,
        'use': 'mongo-db'
});

if (Meteor.isClient) {
    AutoForm.setDefaultTemplateForType('afArrayField', 'myArray');
}

this.Companypages = new Meteor.Pagination(Companies, {
    debug: true,
    availableSettings: {
        limit: true,
        sort: true
    },
    auth: function(skip, sub) {
        return Companies.find({accountIsActive: true});
    },
  
    itemTemplate: "companyItem",
    infinite: true,
    infiniteTrigger: .9,
    infiniteRateLimit: 1,
    infiniteStep: 1,
    perPage: 10,
    sort: {
        timeStamp: -1
    }
});

this.SalesPersonPages = new Meteor.Pagination(Meteor.users, {
    availableSettings: {
        limit: true,
        sort: true
    },
    auth: function(skip, sub) {
        return Meteor.users.find({ $and: [ {'profile.userType': 'salesperson'}, {'profile.isActive': true} ] } ); 
    },
  
    itemTemplate: "salespeopleItem",
    templateName: "salespeople",
    infinite: true,
    infiniteTrigger: .9,
    infiniteRateLimit: 1,
    infiniteStep: 1,
    perPage: 10,
    sort: {
        createdAt: -1
    }
});

/*this.SalesPages = new Meteor.Pagination(Sales, {
    availableSettings: {
        limit: true,
        sort: true
    },
    auth: function(skip, sub) {
        return Sales.find({salesPersonId: sub.userId}); 
    },
    itemTemplate: "salesItem",
    templateName: "salesTypeSales",
    perPage: 3
});


*/

/*this.CompanySalesPages = new Meteor.Pagination(Sales, {
    availableSettings: {
        limit: true,
        sort: true
    },
    auth: function(skip, sub) {
        return Sales.find({companyUserId: sub.userId}); 
    },
    itemTemplate: "salesItem",
    templateName: "companyTypeSales",
    infinite: true,
    infiniteTrigger: .9,
    infiniteRateLimit: 1,
    infiniteStep: 1,
    perPage: 10
}); */





var Schema = {};

/*Schema.UserProfile = new SimpleSchema({
    firstName: {
        type: String,
        regEx: /^[a-zA-Z-]{2,25}$/,
        optional: false
    },
    lastName: {
        type: String,
        regEx: /^[a-zA-Z]{2,25}$/,
        optional: false
    },
    website: {
        type: String,
        regEx: SimpleSchema.RegEx.Url,
        optional: true
    },
    phone: {
        type: String,
        regEx: /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/,
        optional: true
    },
    bio: {
        type: String,
        optional: true
    },
    userType: {
    	type: String,
    	optional: false
    }
}); */

/*Schema.UserJoin = new SimpleSchema({
	email: {
        type: String,
        label: 'Email',
        regEx: SimpleSchema.RegEx.Email
    },
    password: {
      	type: String,
      	label: "Password",
      	min: 6
    },
    profile: {
        type: Schema.UserProfile
    }
});


Schema.User = new SimpleSchema({
  email: {
        type: String,
        label: 'Email',
        regEx: SimpleSchema.RegEx.Email
    },
    password: {
      	type: String,
      	label: "Password",
      	min: 6
    },
    /*createdAt: {
      type: Date,
      autoValue: function() {
        if (this.isInsert) {
          return new Date;
        } else if (this.isUpsert) {
          return {$setOnInsert: new Date};
        } else {
          this.unset();
        }
      }
    },  
    profile: {
        type: Schema.UserProfile
    }
});   */

/*Schema.User = new SimpleSchema({
    _id: {
        type: String,
        regEx: SimpleSchema.RegEx.Id
    },
    username: {
        type: String,
        optional:true,
        regEx: /^[a-z0-9A-Z_]{3,15}$/
    },
    emails: {
        optional: true,
        type: [Object]
    },
    "emails.$.address": {
    	label: 'Email',
        optional: true,
        type: String,
        regEx: SimpleSchema.RegEx.Email
    },
    "emails.$.verified": {
        optional: true,
        type: Boolean
    },
    createdAt: {
        type: Date
    },
    profile: {
        type: Schema.UserProfile,
        optional: true
    },
    services: {
        type: Object,
        optional: true,
        blackbox: true
    }
    /*password: {
        type: String,
        blackbox: true
    }, */
    // Add `roles` to your schema if you use the meteor-roles package.
    // Note that when using this package, you must also specify the
    // `Roles.GLOBAL_GROUP` group whenever you add a user to a role.
    // Roles.addUsersToRoles(userId, ["admin"], Roles.GLOBAL_GROUP);
    // You can't mix and match adding with and without a group since
    // you will fail validation in some cases.
    /*roles: {
        type: String,
        optional: true,
        blackbox: true,
        allowedValues: ['booker', 'provider', 'admin']
    } 
}); */

//Meteor.users.attachSchema(Schema.User);
Messages.attachSchema(new SimpleSchema({
    message: {
        type: String,
        max: 3000
    },
    timeStamp: {
        type: Date
    },
    status: {
        type: String
    },
    from: {
        type: String
    },
    to: {
        type: String
    },
    threadId: {
        type:String
    }
    /*replies: {
        type: [Object],
        min: 0,
        optional:true
    },
    newReplies: {
        type: Number,
        optional:true
    },
    "replies.$.status": {
        type:String
    },
    "replies.$.from": {
        type:String
    },
    "replies.$.to": {
        type:String
    },
    "replies.$.message": {
        type:String
    } */
}));

Threads.attachSchema(new SimpleSchema({
    status: {
        type: String
    },
    from: {
        type: String
    },
    to: {
        type: String
    },
    timeStamp: {
        type:Date
    }
}));

Reviews.attachSchema(new SimpleSchema({
   /* rating: {
        type: Number,
        allowedValues: [1,2,3,4,5]
    }, */
    rating: {
        type: Number,
        min: 0,
        max: 5,
        denyUpdate: true,
        autoform: {
          type: 'raty',
          ratyOptions: {
            starHalf: '/raty/images/star-half.png',
            starOff: '/raty/images/star-off.png',
            starOn: '/raty/images/star-on.png'
          }
        }
    },
    review: {
        type: String,
        optional:true
    },
    commenterId: {
        type: String
    },
    userId: {
        type:String
    }
}));

Companies.attachSchema(new SimpleSchema({
	/*email: {
        type: String,
        regEx: SimpleSchema.RegEx.Email,
        label: "E-mail"
    }, */
	name: {
		type: String,
		optional:false,
		label: 'Company Name'
	},
	websiteUrl: {
        type: String,
        //regEx: SimpleSchema.RegEx.Url,
        optional: false
    },
    description: {
    	type: String,
        optional:false,
    	label: 'Company Description'
    },
    logoUrl: {
        type: String,
        label: 'Company Logo URL',
        optional:true
    },
    keywords: {
        type: String,
        label: 'Keywords',
        optional:true
    },
    timeStamp: {
        type:Date,
        optional:true
    },
    compensationModel: {
        type:String,
        optional:true
    },
    /*keywords: {
        type: [Object],
        optional:true,
        min:0,
        blackbox: true
    },
    "keywords.$": {
        type: String
    }, */
    companyResources: {
        type: [Object],
        optional:true,
        min:0
    },
    "companyResources.$.name": {
        type:String
    },
    "companyResources.$.url": {
        type: String,
        regEx: SimpleSchema.RegEx.Url
    },
    "companyResources.$.private": {
        type:Boolean,
        label: "Private (only your approved salespeople can see this)"
    },
   /* monthlyPaymentLimit: {
    	type: String,
    	label: 'Monthly Payout Limit',
    	regEx: /^(?!0\.00)[1-9]\d{0,2}(\d{3})*(\.\d\d)?$/,
    	optional: false
    }, */
    accountIsActive: {
    	type:Boolean
    },
    companyProfileStatus: {
        type:Number,
        optional:true
    },
    companyId: {
        type: String
    }

}));

Sales.attachSchema(new SimpleSchema({
    status: {
        type: String,
        allowedValues: ['pending', 'approved', 'dispute', 'paid', 'rejected']
    },
    leadCompanyName: {
        type:String
    },
    leadName: {
        type: String
    },
    leadEmail: {
        type: String,
        regEx: SimpleSchema.RegEx.Email
    },
    leadPhone: {
        type: String,
        regEx: /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/,
        optional: true
    },
    productName: {
        type:String
    },
    productPrice: {
        type: String,
        regEx: /(?=.)^\$?(([1-9][0-9]{0,2}(,[0-9]{3})*)|[0-9]+)?(\.[0-9]{1,2})?$/
    },
    productBillingFrequency: {
        type:String,
        label: 'Product Billing Frequency',
        allowedValues: ['monthly', 'annually', 'one-time']
    },
    companyId: {
        type:String
    },
    companyUserId: {
        type:String,
        optional:true
    }, 
    companyName: {
        type:String,
        optional:true
    }, 
    salesPersonId: {
        type:String
    },
    salesPersonName: {
        type:String
    },
    timeStamp: {
        type: Date
    }

}));

Leads.attachSchema(new SimpleSchema({
    status: {
        type: String,
        allowedValues: ['pending', 'approved', 'dispute', 'paid', 'rejected']
    },
    leadCompanyName: {
        type:String
    },
    leadName: {
        type: String
    },
    leadEmail: {
        type: String,
        regEx: SimpleSchema.RegEx.Email
    },
    leadPhone: {
        type: String,
        regEx: /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/,
        optional: true
    },
    details: {
        type:String,
        optional:true
    },
    companyId: {
        type:String
    },
    companyUserId: {
        type:String,
        optional:true
    }, 
    companyName: {
        type:String,
        optional:false
    }, 
    salesPersonId: {
        type:String
    },
    salesPersonName: {
        type:String
    },
    timeStamp: {
        type: Date
    }

}));

News.attachSchema(new SimpleSchema({
    date: {
        type: Date,
          autoValue: function() {
            if (this.isInsert) {
              return new Date;
            } else if (this.isUpsert) {
              return {$setOnInsert: new Date};
            } else {
              this.unset();
            }
          }
    },
    heading: {
        type:String
    },
    text: {
        type: String,
        autoform: {
          rows: 5
        }
    },
    isActive: {
        type:Boolean
    }
}));


/*Invoices.attachSchema(new SimpleSchema({
	lineItems: {
		type: [Object],
		minCount: 1
	},
	"lineItems.$.product": {
		type:[Object]
	},
	"lineItems.$.product.name": {
		type:String
	},
	"lineItems.$.product.price": {
		type:Number
	},
	total: {
		type: Number
	},
	from: {
		type: String,
		label: 'From'
	},
	to: {
		type: String,
		label: 'To'
	},
	paid: {
		type: Boolean
	},
	dispute: {
		type: Boolean
	}

})); */