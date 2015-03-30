Invoices = new Mongo.Collection("invoices");
Companies = new Mongo.Collection("companies");
Messages = new Mongo.Collection("messages");
//easy search:
//https://atmospherejs.com/matteodem/easy-search
Messages.initEasySearch('message');

if (Meteor.isClient) {
    AutoForm.setDefaultTemplateForType('afArrayField', 'myArray');
}

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
        type: String
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
    replies: {
        type: [Object],
        min: 0,
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
	website: {
        type: String,
        regEx: SimpleSchema.RegEx.Url,
        optional: true
    },
    description: {
    	type: String,
    	label: 'Company Description'
    },
    companyResources: {
        type: [Object],
        optional:true
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


Invoices.attachSchema(new SimpleSchema({
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

}));