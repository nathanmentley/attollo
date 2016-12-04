(function () {
	import ConfigUtils from '../../../Common/Utils/ConfigUtils';
	import jwt from 'jwt-simple';

	var classDef = function () {};

	var urlendpoint = '/Auth';

	classDef.prototype.Setup = (controllerContext) => {
		controllerContext.App.post(
			urlendpoint,
			(request, response) => {
				controllerContext.ResponseProcessor(
					request,
					response,
					new Promise((resolve, reject) => {
						Attollo.Services.User.GetUser({}, request.body.username, request.body.password)
						.then((users) => {
							var user = users.first();

							if(user) {
								var permissions = [];
								
								var rolePermissions = user.relations['Role'].relations['RolePermisions'].toJSON();
								for(var i = 0; i < rolePermissions.length; i++) {
									permissions.push(rolePermissions[i].PermissionDef.code);
								}
								
								var userPermissions = user.relations['UserPermissions'].toJSON();
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
								
								var tokenData = {
									clientid: user.get('clientid'),
									name: user.get('name'),
									permissions: permissions,
									env: ConfigUtils.Config.Environment
								};

								resolve({
									token: jwt.encode(tokenData, ConfigUtils.Config.JwtSecret),
									permissions: permissions
								});
							}else{
								reject(new Error('Invalid username or password.'));
							}
						})
						.catch((err) => {
							reject(err);
						});
					})
				)
			}
		);
	};
	
	module.exports = new classDef();
})();