import ConfigUtils from '../../Utils/ConfigUtils';

var knex = null;
var bookshelf = null;

export default class Database {
	static get Knex() {
		return knex;
	}
	static get Bookshelf() {
		return bookshelf;
	}

	static get Model() {
		return Database.Bookshelf.Model.extend({
			constructor: () => {
				Database.Bookshelf.Model.apply(this, arguments);
			}
		});
	}

	static Connect() {
		return new Promise((resolve, reject) => {
			knex = require('knex')({
				client: 'pg',
				connection: {
					host: ConfigUtils.Config.DbHost,
					user: ConfigUtils.Config.DbUser,
					password: ConfigUtils.Config.DbPass,
					port: ConfigUtils.Config.DbPort,
					database: ConfigUtils.Config.DbName,
					ssl: true
				}
			});

			bookshelf = require('bookshelf')(knex);
			bookshelf.plugin('visibility');

			resolve(Database.Bookshelf);
		});
	}

	static Close() {
		Database.Knex.destroy();
	}
}