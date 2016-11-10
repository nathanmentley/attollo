(function () {
	var jwt = require('jwt-simple');

	var classDef = function () {};

	var urlendpoint = '/Auth';

	classDef.prototype.Setup = function (app, express, auth) {
		app.post(urlendpoint, function(request, response) {
			response.setHeader('Content-Type', 'application/json');
			
			Attollo.Services.User.GetUser({}, request.body.username, request.body.password)
			.then(function (users) {
				var user = users.first();

				if(user) {
					var permissions = [];
					
					var rolePermissions = user.relations['Role'].relations['RolePermisions'].toJSON();
					for(var i = 0; i < rolePermissions.length; i++) {
						permissions.push(rolePermissions[i].PermissionDef.code);
					}
					
					var userPermissions = user.relations['UserPermissions'].toJSON();
					Attollo.Utils.Log.Info(JSON.stringify(userPermissions));
					for(var i = 0; i < userPermissions.length; i++) {
						var hasPermission = userPermissions[i].haspermission;
						var code = userPermissions[i].PermissionDef.code;

						if(hasPermission != "0") {
							permissions.push(code);
						} else {
							for(var j = 0; j < permissions.length; j++) {
								if(permissions[j] == code) {
									permissions.splice(j, 1);
								}
							}
						}
					}
					
					var tokenData = { clientid: user.get('clientid'), name: user.get('name'), permissions: permissions, env: Attollo.Utils.Config.Environment };
					response.json({
						error: false,
						data: {
							token: jwt.encode(tokenData, Attollo.Utils.Config.JwtSecret),
							permissions: permissions
						}
					});
				}else{
					response.json({
						error: true,
						data: {
							message: 'Invalid username or password.'
						}
					});
				}
			})
			.catch(function(err) {
				response.status(500).json({
					error: true,
					data: {
						message: err.message
					}
				});
			});
		});
	};
	
	module.exports = new classDef();
})();