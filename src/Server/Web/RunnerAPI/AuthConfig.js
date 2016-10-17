(function() {;
	module.exports = function(req, res, next) {
		if(true) {
			req.AuthContext = {
				ClientID: 'L-1',
				SiteID: 'L-1'
			};

			next();
		}else{
			res.statusCode = 403;
			res.setHeader('WWW-Authenticate', 'Basic realm="Attollo"');
			res.end('Forbidden');
		}
	};
})(); 