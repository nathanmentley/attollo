(function () {
	var Postgresql = require('pg');
	var fs = require('fs');
	
	var conString = "postgres://" + Attollo.Utils.Config.DbUser + ":" 
						+ Attollo.Utils.Config.DbPass + "@" + Attollo.Utils.Config.DbHost
						+ "/" + Attollo.Utils.Config.DbName + "?ssl=true";
	
	function ExecuteSqlScript(dbContext, filename, callback, errorCallback, version) {
		var data = fs.readFileSync(filename, 'utf8');
		
		Attollo.Utils.Log.Info("running file: " + filename);
		
		Postgresql.connect(conString, function(err, client, done) {
			if(err) {
				return console.error('error fetching client from pool', err);
			}
			client.query(data, [], function(err, result) {
				//call `done()` to release the client back to the pool
				done();
				
				Attollo.Utils.Log.Info("finished file: " + filename);

				if(err) {
					return console.error('error running query', err);
				}else{
					if(version) {
						Attollo.Services.DatabaseVersion.AddDatabaseVersion(dbContext, { versionid: version })
						.then(() => {
							callback();
						})
						.catch((err) => {
							errorCallback(err);
						});
					}else{
						callback();
					}
				}
				
				Postgresql.end();
			});
		});
	}

	function ExecuteDbScripts(dbContext, currentDbVersion, callback, errorCallback) {
		Attollo.Utils.Log.Info("Current Db Script Version: " + currentDbVersion);

        var items = fs.readdirSync(__dirname + '/Scripts').sort(function(a, b) {
            var an = a.split('.')[0];
            var bn = b.split('.')[0];
            return parseInt(an) < parseInt(bn) ? -1 : 1;
        });
        
		if(items.length > currentDbVersion) {
			var i = currentDbVersion;
			if(i < 0) {
				i = 0;
			}

			var recursiveCallback = function() {
				i++;
					
				if(i < items.length)
					ExecuteSqlScript(dbContext, __dirname + "/Scripts/" + items[i], recursiveCallback, errorCallback, i + 1);
				else
					callback();
			};
			var filename = __dirname + "/Scripts/" + items[i];
			ExecuteSqlScript(dbContext, filename, recursiveCallback, errorCallback, i + 1);
		}else{
			callback();
		}
	}
    
    var classDef = function () {};
    
	classDef.prototype.RunSqlScripts = function (dbContext, callback, errorCallback) {
		try{
			Attollo.Services.DatabaseVersion.GetDatabaseVersions(dbContext)
			.then((dbVersions) => {

				ExecuteDbScripts(dbContext, Math.max.apply(Math, dbVersions.map((x) => { return x.get('versionid'); })), callback, errorCallback);
			})
			.catch(() => {
				ExecuteDbScripts(dbContext, 0, callback, errorCallback);
			});
		}catch (e){ 
			ExecuteDbScripts(dbContext, 0, callback, errorCallback);
		}
	};

	classDef.prototype.RunCleanSqlScripts = function (dbContext, callback, errorCallback) {
		ExecuteSqlScript(dbContext, __dirname + '/DropScripts/dropattollo.sql', callback, errorCallback, null);
	};
	
	module.exports = new classDef();
})();