import bcrypt from 'bcryptjs';

import Attollo from "../Attollo";
import BaseService from '../BaseService';

export default class BlockService extends BaseService {
	static GetUsers(authContext){
		return Context.Handlers.User.GetUsers(authContext);
	};
	
	static GetUser(authContext, username, password){
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
	
	static AddUser(authContext, name, password, roleCode){
		var self = this;

		return new Promise((resolve, reject) => {
			self.GetRole(authContext, roleCode)
			.then((roles) => {
				bcrypt.genSalt(10, (err, salt) => {
					bcrypt.hash(password, salt, (err, hash) => {
						Context.DBTransaction((transaction) => {
							Context.Handlers.User.AddUser(authContext, transaction, name, hash, roles.first())
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
	
	static UpdateUser(authContext, user){
		return Context.DBTransaction((transaction) => {
			Context.Handlers.User.UpdateUser(authContext, transaction, user)
			.then((result) => {
				transaction.commit(result);
			}).catch((err) => {
				transaction.rollback(err);
			});
		});
	};
	
	static DeleteUser(authContext, userId){
		return Context.DBTransaction((transaction) => {
			Context.Handlers.User.DeleteUser(authContext, transaction, userId)
			.then((result) => {
				transaction.commit(result);
			}).catch((err) => {
				transaction.rollback(err);
			});
		});
	};

	//Roles

	static GetRole(authContext, code) {
		return Context.Handlers.User.GetRole(authContext, code);
	}

	static GetRoles(authContext) {
		return Context.Handlers.User.GetRoles(authContext);
	}

	static AddRole(authContext, name, code) {
		return Context.DBTransaction((transaction) => {
			Context.Handlers.User.AddRole(authContext, transaction, name, code)
			.then((result) => {
				transaction.commit(result);
			}).catch((err) => {
				transaction.rollback(err);
			});
		});
	}

	static AddRolePermission(authContext, permissionDefCode, roleCode) {
		var self = this;

		return new Promise((resolve, reject) => {
			self.GetRole(authContext, roleCode)
			.then((role) => {
				self.GetPermissionDef(authContext, permissionDefCode)
				.then((permissionDef) => {
					Context.DBTransaction((transaction) => {
						Context.Handlers.User.AddRolePermission(
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

	static AddPermissionDef(authContext, name, code, description) {
		return Context.DBTransaction((transaction) => {
			Context.Handlers.User.AddPermissionDef(authContext, transaction, name, code, description)
			.then((result) => {
				transaction.commit(result);
			}).catch((err) => {
				transaction.rollback(err);
			});
		});
	};

	static GetPermissionDefs(authContext) {
		return Context.Handlers.User.GetPermissionDefs(authContext);
	};

	static GetPermissionDef(authContext, code) {
		return Context.Handlers.User.GetPermissionDef(authContext, code);
	};
}