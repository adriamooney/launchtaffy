Invoices = new Mongo.Collection("invoices");
Companies = new Mongo.Collection("companies");

var Schema = {};

Schema.UserProfile = new SimpleSchema({
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
});

Companies.attachSchema(new SimpleSchema({
	email: {
        type: String,
        regEx: SimpleSchema.RegEx.Email,
        label: "E-mail"
    },
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
    monthlyPaymentLimit: {
    	type: String,
    	label: 'Monthly Payout Limit',
    	regEx: /^(?!0\.00)[1-9]\d{0,2}(\d{3})*(\.\d\d)?$/,
    	optional: false
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