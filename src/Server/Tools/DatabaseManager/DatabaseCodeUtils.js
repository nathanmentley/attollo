(function () {
	var fs = require('fs');

	function ExecuteSqlCode(dbContext, filename, callback, errorCallback, version) {
		Attollo.Utils.Log.Info("running file: " + filename);
		try{
			var codeScript = require(filename);
			codeScript.Logic(dbContext, () => {
				Attollo.Utils.Log.Info("finished file: " + filename);

				if(version) {
					Attollo.Services.DatabaseVersion.AddDatabaseCodeVersion(dbContext, { versionid: version })
					.then(() => {
						Attollo.Utils.Log.Info("finished file: " + filename);
						callback();
					})
					.catch((err) => {
						errorCallback(err);
					});
				}else{
					callback();
				}
			}, (err) => {
				errorCallback(err);
			});
		}catch(e) {
			Attollo.Utils.Log.Info("catch: " + e);
			throw e;
		}
	}

	function ExecuteDbCodes(dbContext, currentDbVersion, callback, errorCallback) {
		Attollo.Utils.Log.Info("Current Db Code Version: " + currentDbVersion);

        var items = fs.readdirSync(__dirname + '/CodeVersions').sort(function(a, b) {
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
					ExecuteSqlCode(dbContext, "./CodeVersions/" + items[i].split('.')[0], recursiveCallback, errorCallback, i + 1);
				else
					callback();
			};
			var filename = "./CodeVersions/" + items[i].split('.')[0];
			ExecuteSqlCode(dbContext, filename, recursiveCallback, errorCallback, i + 1);
		}else{
			callback();
		}
	}

    var classDef = function () {};
    
	classDef.prototype.RunSqlCode = function (dbContext, callback, errorCallback) {
		try{
			Attollo.Services.DatabaseVersion.GetDatabaseCodeVersions(dbContext)
			.then((dbVersions) => {
				ExecuteDbCodes(dbContext, Math.max.apply(Math, dbVersions.map((x) => { return x.get('versionid'); })), callback, errorCallback);
			})
			.catch(() => {
				ExecuteDbCodes(dbContext, 0, callback, errorCallback);
			});
		}catch (e){ 
			ExecuteDbCodes(dbContext, 0, callback, errorCallback);
		}
	};
	
	module.exports = new classDef();
})();