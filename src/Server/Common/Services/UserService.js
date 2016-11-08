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
	
	classDef.prototype.AddUser = function (authContext, name, password){
		return new Promise((resolve, reject) => {
			bcrypt.genSalt(10, (err, salt) => {
				bcrypt.hash(password, salt, (err, hash) => {
					Context.Handlers.User.AddUser(authContext, name, hash)
					.then((result) => {
						resolve(result);
					})
					.catch((err) => {
						reject(err);
					});
				});
			});
		});
	};
	
	classDef.prototype.UpdateUser = function (authContext, user){
		return Context.Handlers.User.UpdateUser(authContext, user);
	};
	
	classDef.prototype.DeleteUser = function (authContext, userId){
		return Context.Handlers.User.DeleteUser(authContext, userId);
	};
	
	module.exports = classDef;
})();
