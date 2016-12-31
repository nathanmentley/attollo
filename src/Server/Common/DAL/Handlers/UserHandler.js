import BaseHandler from '../BaseHandler';
export default class BlockHandler extends BaseHandler {
	GetUsers(authContext){
		return this.Context.DatabaseContext.Users(authContext).fetch();
	};

	GetUser(authContext, username) {
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
	
	AddUser(authContext, transaction, name, password, role){
		var User = this.Context.DatabaseContext.User(authContext);
		var user = new User({
			clientid: authContext.ClientID,
			name: name,
			password: password,
			roleid: role.get('id')
		});

		return user.save(null, { transacting: transaction });
	};
	
	UpdateUser(authContext, transaction, model){
		var User = this.Context.DatabaseContext.User(authContext);
		var user = new User(model);

		return user.save(null, { transacting: transaction });
	};
	
	DeleteUser(authContext, transaction, userId){
		var User = this.Context.DatabaseContext.User(authContext);
		var user = new User({ id: userId });

		return user.destroy({ transacting: transaction });
	};

	//Roles

	GetRole(authContext, code) {
		return this.Context.DatabaseContext.Roles(authContext)
				.query({
					where: {
						code: code
					}
				})
				.fetch();
	};

	GetRoles(authContext) {
		return this.Context.DatabaseContext.Roles(authContext).fetch();
	};

	AddRole(authContext, transaction, name, code) {
		var Role = this.Context.DatabaseContext.Role(authContext);
		var role = new Role({
			name: name,
			code: code
		});

		return role.save(null, { transacting: transaction });
	};

	AddRolePermission(authContext, transaction, permissionDefId, roleId) {
		var RolePermission = this.Context.DatabaseContext.RolePermission(authContext);
		var rolePermission = new RolePermission({
			permissiondefid: permissionDefId,
			roleid: roleId
		});

		return rolePermission.save(null, { transacting: transaction });
	};

	//PermissionDefs

	AddPermissionDef(authContext, transaction, name, code, description) {
		var PermissionDef = this.Context.DatabaseContext.PermissionDef(authContext);
		var permissionDef = new PermissionDef({
			name: name,
			code: code,
			description: description
		});

		return permissionDef.save(null, { transacting: transaction });
	};

	GetPermissionDefs(authContext) {
		return this.Context.DatabaseContext.PermissionDefs(authContext).fetch();
	};

	GetPermissionDef(authContext, code) {
		return this.Context.DatabaseContext.PermissionDefs(authContext)
				.query({
					where: {
						code: code
					}
				})
				.fetch();
	};
}