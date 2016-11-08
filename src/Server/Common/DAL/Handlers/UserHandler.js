(function () {
	var baseHandler = require('../../BaseHandler')
	var util = require('util');

	var classDef = function (context) {
		baseHandler.apply(this);
		this.Context = context;
	};
	util.inherits(classDef, baseHandler);
	
	classDef.prototype.GetUsers = function (authContext){
		return this.Context.DatabaseContext.Users(authContext).fetch();
	};

	classDef.prototype.GetUser = function (authContext, username) {
		return this.Context.DatabaseContext.Users(authContext, true)
				.query({
					where: {
						name: username
					}
				})
				.fetch({ withRelated: [ 'Role', 'Role.RolePermisions' ]});
	};
	
	classDef.prototype.AddUser = function (authContext, name, password, role){
		var User = this.Context.DatabaseContext.User(authContext);
		var user = new User({
			clientid: authContext.ClientID,
			name: name,
			password: password,
			roleid: role.get('id')
		});

		return user.save();
	};
	
	classDef.prototype.UpdateUser = function (authContext, model){
		var User = this.Context.DatabaseContext.User(authContext);
		var user = new User(model);

		return user.save();
	};
	
	classDef.prototype.DeleteUser = function (authContext, userId){
		var User = this.Context.DatabaseContext.User(authContext);
		var user = new User({ id: userId });

		return user.destroy();
	};

	//Roles

	classDef.prototype.GetRole = function (authContext, code) {
		return this.Context.DatabaseContext.Roles(authContext)
				.query({
					where: {
						code: code
					}
				})
				.fetch();
	}

	classDef.prototype.GetRoles = function (authContext) {
		return this.Context.DatabaseContext.Roles(authContext).fetch();
	}

	classDef.prototype.AddRole = function (authContext, name, code) {
		var Role = this.Context.DatabaseContext.Role(authContext);
		var role = new Role({
			name: name,
			code: code
		});

		return role.save();
	}

	classDef.prototype.AddRolePermission = function (authContext, name, code, description, roleid) {
		var RolePermission = this.Context.DatabaseContext.RolePermission(authContext);
		var rolePermission = new RolePermission({
			name: name,
			code: code,
			description: description,
			roleid: roleid
		});

		return rolePermission.save();
	}
	
	module.exports = classDef;
})();