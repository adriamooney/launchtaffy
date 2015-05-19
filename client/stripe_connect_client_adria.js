Stripe = {};

Stripe.requestCredential = function (options, credentialRequestCompleteCallback) {

    if (!credentialRequestCompleteCallback && typeof options === 'function') {
        credentialRequestCompleteCallback = options;
        options = {};
    }

    var config = ServiceConfiguration.configurations.findOne({service: 'stripe'});
    if (!config) {
        credentialRequestCompleteCallback && credentialRequestCompleteCallback(new ServiceConfiguration.ConfigError("Service not configured"));
        return;
    }

    var credentialToken = Random.id();
    var loginStyle = OAuth._loginStyle('stripe', config, options);
    var mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent);
    var display = mobile ? 'touch' : 'popup';
    var scope = 'read_write';
    var dimensions = {width: 600, height: 600};

    if (options && options.requestPermissions) {
        scope = options.requestPermissions.join(',');
    }

    var loginUrl =
        'https://connect.stripe.com/oauth/authorize' +
        		'?response_type=code' +
            '&scope=' + scope +
            '&client_id=ca_6CFhWlYGbyT34q3mkmo6SACAAFxOUZIq' +
            '&redirect_uri=' + Meteor.absoluteUrl('_oauth/stripe?close=close') +
            //'&state=' + credentialToken;
            '&state=' + OAuth._stateParam(loginStyle, credentialToken);

    Oauth.initiateLogin(credentialToken, loginUrl, credentialRequestCompleteCallback, dimensions);
};


