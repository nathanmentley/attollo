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
				.fetch({ withRelated: [ 
					'Role',
					'Role.RolePermisions',
					'Role.RolePermisions.PermissionDef',
					'UserPermissions',
					'UserPermissions.PermissionDef'
				]});
	};
	
	classDef.prototype.AddUser = function (authContext, transaction, name, password, role){
		var User = this.Context.DatabaseContext.User(authContext);
		var user = new User({
			clientid: authContext.ClientID,
			name: name,
			password: password,
			roleid: role.get('id')
		});

		return user.save(null, { transacting: transaction });
	};
	
	classDef.prototype.UpdateUser = function (authContext, transaction, model){
		var User = this.Context.DatabaseContext.User(authContext);
		var user = new User(model);

		return user.save(null, { transacting: transaction });
	};
	
	classDef.prototype.DeleteUser = function (authContext, transaction, userId){
		var User = this.Context.DatabaseContext.User(authContext);
		var user = new User({ id: userId });

		return user.destroy({ transacting: transaction });
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
	};

	classDef.prototype.GetRoles = function (authContext) {
		return this.Context.DatabaseContext.Roles(authContext).fetch();
	};

	classDef.prototype.AddRole = function (authContext, transaction, name, code) {
		var Role = this.Context.DatabaseContext.Role(authContext);
		var role = new Role({
			name: name,
			code: code
		});

		return role.save(null, { transacting: transaction });
	};

	classDef.prototype.AddRolePermission = function (authContext, transaction, permissionDefId, roleId) {
		var RolePermission = this.Context.DatabaseContext.RolePermission(authContext);
		var rolePermission = new RolePermission({
			permissiondefid: permissionDefId,
			roleid: roleId
		});

		return rolePermission.save(null, { transacting: transaction });
	};

	//PermissionDefs

	classDef.prototype.AddPermissionDef = function (authContext, transaction, name, code, description) {
		var PermissionDef = this.Context.DatabaseContext.PermissionDef(authContext);
		var permissionDef = new PermissionDef({
			name: name,
			code: code,
			description: description
		});

		return permissionDef.save(null, { transacting: transaction });
	};

	classDef.prototype.GetPermissionDefs = function (authContext) {
		return this.Context.DatabaseContext.PermissionDefs(authContext).fetch();
	};

	classDef.prototype.GetPermissionDef = function (authContext, code) {
		return this.Context.DatabaseContext.PermissionDefs(authContext)
				.query({
					where: {
						code: code
					}
				})
				.fetch();
	};
	
	module.exports = classDef;
})();