(function () {
	function ExecuteSqlCode(dbContext, filename, callback, errorCallback, version) {
		var codeFunction = require(filename);
		
		Attollo.Utils.Log.Info("running file: " + filename);
		
		codeFunction(dbContext, () => {
			Attollo.Utils.Log.Info("finished file: " + filename);

			if(version) {
				Attollo.Services.DatabaseVersion.AddDatabaseCodeVersion(dbContext, { versionid: version })
				.then(() => {
					callback();
				})
				.catch(() => {
					errorCallback();
				});
			}else{
				callback();
			}
		}, () => {
			errorCallback();
		});
	}

    var classDef = function () {};
    
	classDef.prototype.RunSqlCode = function (dbContext, callback, errorCallback) {
		var maxDbVersion;
		try{
			var dbVersions = Attollo.Services.DatabaseVersion.GetDatabaseCodeVersions(dbContext);
			maxDbVersion = Math.max.apply(Math, dbVersions.map((x) => { return x.versionid; }));
		}catch (e){ 
			maxDbVersion = 0;
		}

        var items = fs.readdirSync(__dirname + '/CodeVersions').sort(function(a, b) {
            var an = a.split('.')[0];
            var bn = b.split('.')[0];
            return parseInt(an) < parseInt(bn) ? -1 : 1;
        });
        
		if(items.length > maxDbVersion) {
			var i = (maxDbVersion - 1);
			if(i < 0) {
				i = 0;
			}

			var recursiveCallback = function() {
				i++;
					
				if(i < items.length)
					ExecuteSqlCode(dbContext, __dirname + "/CodeVersions/" + items[i], recursiveCallback, errorCallback, i + 1);
				else
					callback();
			};
			var filename = __dirname + "/CodeVersions/" + items[i];
			ExecuteSqlCode(dbContext, filename, recursiveCallback, errorCallback, i + 1);
		}else{
			callback();
		}

        callback();
	};
	
	module.exports = new classDef();
})();