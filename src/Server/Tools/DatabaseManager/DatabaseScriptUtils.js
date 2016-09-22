(function () {
	var Postgresql = require('pg');
	var fs = require('fs');
	
	var conString = "postgres://" + Attollo.Utils.Config.DbUser + ":" 
						+ Attollo.Utils.Config.DbPass + "@" + Attollo.Utils.Config.DbHost
						+ "/" + Attollo.Utils.Config.DbName + "?ssl=true";
	
	function ExecuteSqlScript(filename, callback) {
		var data = fs.readFileSync(filename, 'utf8');
		
		console.log("running file: " + filename);
		
		Postgresql.connect(conString, function(err, client, done) {
			if(err) {
				return console.error('error fetching client from pool', err);
			}
			client.query(data, [], function(err, result) {
				//call `done()` to release the client back to the pool
				done();
				
				console.log("finished file: " + filename);

				if(err) {
					return console.error('error running query', err);
				}else{
					callback();
				}
				
				Postgresql.end();
			});
		});
	}
    
    var classDef = function () {};
    
	classDef.prototype.RunSqlScripts = function (callback) {
        var items = fs.readdirSync(__dirname + '/Scripts').sort(function(a, b) {
            var an = a.split('.')[0];
            var bn = b.split('.')[0];
            return parseInt(an) < parseInt(bn) ? -1 : 1;
        });
        
        var i = 0;
        var recursiveCallback = function() {
            i++;
            
            if(i < items.length)
                ExecuteSqlScript(__dirname + "/Scripts/" + items[i], recursiveCallback);
			else
				callback();
        };
        var filename = __dirname + "/Scripts/" + items[i];
        ExecuteSqlScript(filename, recursiveCallback);
	};
	
	module.exports = new classDef();
})();