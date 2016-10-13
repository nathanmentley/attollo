(function () {
	var classDef = function () {};

	var knex = require('knex')({
		client: 'pg',
		connection: {
			host: Attollo.Utils.Config.DbHost,
			user: Attollo.Utils.Config.DbUser,
			password: Attollo.Utils.Config.DbPass,
			port: Attollo.Utils.Config.DbPort,
			database: Attollo.Utils.Config.DbName,
    		ssl: true
		}
	});
	
	var bookshelf = require('bookshelf')(knex);

	classDef.prototype.Bookshelf = bookshelf;
	classDef.prototype.Model = bookshelf.Model.extend({
	});

	classDef.prototype.Close = function () {
		knex.destroy();
	};

	module.exports = new classDef();
})();