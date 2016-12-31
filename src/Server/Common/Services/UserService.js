import bcrypt from 'bcryptjs';

import BaseService from '../BaseService';

export default class UserService extends BaseService {
	GetUsers(authContext){
		return this.Context.Handlers.User.GetUsers(authContext);
	};
	
	GetUser(authContext, username, password){
		return new Promise((resolve, reject) => {
			this.Context.Handlers.User.GetUser(authContext, username)
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
	
	AddUser(authContext, name, password, roleCode){
		var self = this;

		return new Promise((resolve, reject) => {
			self.GetRole(authContext, roleCode)
			.then((roles) => {
				bcrypt.genSalt(10, (err, salt) => {
					bcrypt.hash(password, salt, (err, hash) => {
						self.Context.DBTransaction((transaction) => {
							this.Context.Handlers.User.AddUser(authContext, transaction, name, hash, roles.first())
							.then((result) => {
								transaction.commit(result);
							}).catch((err) => {
								transaction.rollback(err);
							});
						})
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
	
	UpdateUser(authContext, user){
		return this.Context.DBTransaction((transaction) => {
			this.Context.Handlers.User.UpdateUser(authContext, transaction, user)
			.then((result) => {
				transaction.commit(result);
			}).catch((err) => {
				transaction.rollback(err);
			});
		});
	};
	
	DeleteUser(authContext, userId){
		return this.Context.DBTransaction((transaction) => {
			this.Context.Handlers.User.DeleteUser(authContext, transaction, userId)
			.then((result) => {
				transaction.commit(result);
			}).catch((err) => {
				transaction.rollback(err);
			});
		});
	};

	//Roles

	GetRole(authContext, code) {
		return this.Context.Handlers.User.GetRole(authContext, code);
	}

	GetRoles(authContext) {
		return this.Context.Handlers.User.GetRoles(authContext);
	}

	AddRole(authContext, name, code) {
		return this.Context.DBTransaction((transaction) => {
			this.Context.Handlers.User.AddRole(authContext, transaction, name, code)
			.then((result) => {
				transaction.commit(result);
			}).catch((err) => {
				transaction.rollback(err);
			});
		});
	}

	AddRolePermission(authContext, permissionDefCode, roleCode) {
		var self = this;

		return new Promise((resolve, reject) => {
			self.GetRole(authContext, roleCode)
			.then((role) => {
				self.GetPermissionDef(authContext, permissionDefCode)
				.then((permissionDef) => {
					self.Context.DBTransaction((transaction) => {
						this.Context.Handlers.User.AddRolePermission(
							authContext,
							transaction,
							permissionDef.first().get('id'),
							role.first().get('id')
						)
						.then((result) => {
							transaction.commit(result);
						}).catch((err) => {
							transaction.rollback(err);
						});
					})
					.then(() => {
						resolve();
					}).catch((err) => {
						reject(err);
					});
				}).catch((err) => {
					reject(err);
				});
			})
			.catch((err) => {
				reject(err);
			});
		});
	}

	//PermissionDefs

	AddPermissionDef(authContext, name, code, description) {
		return this.Context.DBTransaction((transaction) => {
			this.Context.Handlers.User.AddPermissionDef(authContext, transaction, name, code, description)
			.then((result) => {
				transaction.commit(result);
			}).catch((err) => {
				transaction.rollback(err);
			});
		});
	};

	GetPermissionDefs(authContext) {
		return this.Context.Handlers.User.GetPermissionDefs(authContext);
	};

	GetPermissionDef(authContext, code) {
		return this.Context.Handlers.User.GetPermissionDef(authContext, code);
	};
}