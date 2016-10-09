(function() {
	module.exports = function(req, res, next) {
		if (req.headers.authorization) {
			var auth = new Buffer(req.headers.authorization.substring(6), 'base64').toString().split(':');
			var username = auth[0];
			var password = auth[1];

			Attollo.Services.User.GetUser({}, username, password)
				.then(function (user) {
					if(user.get('name') == username) {
						req.AuthContext = {
							ClientID: user.get('clientid')
						};

						next();
					}else{
						res.statusCode = 403;
						res.setHeader('WWW-Authenticate', 'Basic realm="Attollo"');
						res.end('Unauthorized');
					}
				})
				.catch(function (err) {
					res.statusCode = 401;
					res.setHeader('WWW-Authenticate', 'Basic realm="Attollo"');
					res.end('Unauthorized');
				});
		}else{
			res.statusCode = 401;
			res.setHeader('WWW-Authenticate', 'Basic realm="Attollo"');
			res.end('Unauthorized');
		}
	};
})(); 