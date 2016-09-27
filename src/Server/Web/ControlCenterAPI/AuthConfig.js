(function() {
	module.exports = function(req, res, next) {
		var auth;

		if (req.headers.authorization) {
			auth = new Buffer(req.headers.authorization.substring(6), 'base64').toString().split(':');
		}

		if (!auth || auth[0] !== Attollo.Utils.Config.AdminUserName || auth[1] !== Attollo.Utils.Config.AdminPassword) {
			res.statusCode = 401;
			
			res.setHeader('WWW-Authenticate', 'Basic realm="Attollo"');
			
			res.end('Unauthorized');
		} else {
			next();
		}
	};
})(); 