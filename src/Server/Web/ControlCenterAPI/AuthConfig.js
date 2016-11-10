(function() {
	var jwt = require('jwt-simple');

	module.exports = function(permission) {
		return function(req, res, next) {
			if (req.headers.authorization) {
				var decoded = jwt.decode(req.headers.authorization.substring(7), Attollo.Utils.Config.JwtSecret);

				if(decoded) {
					req.AuthContext = {
						ClientID: decoded.clientid
					};

					if(permission) {
						var authorized = false;

						for(var i = 0; i < decoded.permissions.length; i++) {
							if(decoded.permissions[i] == permission) {
								authorized = true;
							}
						}

						if(authorized) {
							next();
						} else {
							res.statusCode = 403;
							res.setHeader('WWW-Authenticate', 'Basic realm="Attollo"');
							res.end('Forbidden');
						}
					}else {
						next();
					}

				}else{
					res.statusCode = 403;
					res.setHeader('WWW-Authenticate', 'Basic realm="Attollo"');
					res.end('Forbidden');
				}
			}else{
				res.statusCode = 401;
				res.setHeader('WWW-Authenticate', 'Basic realm="Attollo"');
				res.end('Unauthorized');
			}
		};
	};
})(); 