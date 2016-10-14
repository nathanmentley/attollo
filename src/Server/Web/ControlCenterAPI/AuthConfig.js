(function() {
	var jwt = require('jwt-simple');

	module.exports = function(req, res, next) {
		if (req.headers.authorization) {
			var decoded = jwt.decode(req.headers.authorization.substring(7), Attollo.Utils.Config.JwtSecret);

			if(decoded) {
				req.AuthContext = {
					ClientID: decoded.clientid
				};

				next();
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
})(); 