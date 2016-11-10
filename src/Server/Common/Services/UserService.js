(function () {
	var bcrypt = require('bcryptjs');

	var Context;
	var classDef = function (serviceContext) {
		Context = serviceContext;
	};
	
	classDef.prototype.GetUsers = function (authContext){
		return Context.Handlers.User.GetUsers(authContext);
	};
	
	classDef.prototype.GetUser = function (authContext, username, password){
		return new Promise((resolve, reject) => {
			Context.Handlers.User.GetUser(authContext, username)
			.then((user) => {
				if(user) {
					var userModel = user.first();

					if(userModel) {
						var hash = userModel.get('password');

						bcrypt.compare(password, hash, function(err, res) {
							if(res == true) {
								resolve(user);
							} else {
								reject({ message: 'Invalid Username or Password.1' });
							}
						});
					}else{
						reject({ message: 'Invalid Username or Password.2' });
					}
				}else{
					reject({ message: 'Invalid Username or Password.3' });
				}
			})
			.catch((err) => {
				reject(err);
			});
		});
	};
	
	classDef.prototype.AddUser = function (authContext, name, password, roleCode){
		var self = this;

		return new Promise((resolve, reject) => {
			self.GetRole(authContext, roleCode)
			.then((roles) => {
				bcrypt.genSalt(10, (err, salt) => {
					bcrypt.hash(password, salt, (err, hash) => {
						Context.Handlers.User.AddUser(authContext, name, hash, roles.first())
						.then((result) => {
							resolve(result);
						})
						.catch((err) => {
							reject(err);
						});
					});
				});
			})
			.catch((err) => {
				reject(err);
			});
		});
	};
	
	classDef.prototype.UpdateUser = function (authContext, user){
		return Context.Handlers.User.UpdateUser(authContext, user);
	};
	
	classDef.prototype.DeleteUser = function (authContext, userId){
		return Context.Handlers.User.DeleteUser(authContext, userId);
	};

	//Roles

	classDef.prototype.GetRole = function (authContext, code) {
		return Context.Handlers.User.GetRole(authContext, code);
	}

	classDef.prototype.GetRoles = function (authContext) {
		return Context.Handlers.User.GetRoles(authContext);
	}

	classDef.prototype.AddRole = function (authContext, name, code) {
		return Context.Handlers.User.AddRole(authContext, name, code);
	}

	classDef.prototype.AddRolePermission = function (authContext, code, roleid) {
		var self = this;

		return new Promise((resolve, reject) => {
			self.GetPermissionDef(authContext, code)
			.then((permissionDef) => {
				Context.Handlers.User.AddRolePermission(authContext, permissionDef.first().get('id'), roleid)
				.then(() => {
					resolve();
				})
				.catch((err) => {
					reject(err);
				});
			})
			.catch((err) => {
				reject(err);
			});
		});
	}

	//PermissionDefs

	classDef.prototype.AddPermissionDef = function (authContext, name, code, description) {
		return Context.Handlers.User.AddPermissionDef(authContext, name, code, description);
	};

	classDef.prototype.GetPermissionDefs = function (authContext) {
		return Context.Handlers.User.GetPermissionDefs(authContext);
	};

	classDef.prototype.GetPermissionDef = function (authContext, code) {
		return Context.Handlers.User.GetPermissionDef(authContext, code);
	};
	
	module.exports = classDef;
})();
