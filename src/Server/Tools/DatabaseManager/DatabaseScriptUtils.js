import constitute from 'constitute';
import Postgresql from 'pg';
import fs from 'fs';

import Attollo from "../../Common/Attollo";
import ConfigUtils from '../../Common/Utils/ConfigUtils';
import LogUtils from "../../Common/Utils/LogUtils";

var attollo = constitute(Attollo);

export default class DatabaseScriptUtils {
    static get ConnectionString() {
        return "postgres://" + ConfigUtils.Config.DbUser + ":" 
					+ ConfigUtils.Config.DbPass + "@" + ConfigUtils.Config.DbHost
					+ "/" + ConfigUtils.Config.DbName + "?ssl=true";
    }

	static ExecuteSqlScript(dbContext, filename, callback, errorCallback, version) {
		var data = fs.readFileSync(filename, 'utf8');
		
		LogUtils.Info("running file: " + filename);
		
		Postgresql.connect(DatabaseScriptUtils.ConnectionString, function(err, client, done) {
			if(err) {
				return console.error('error fetching client from pool', err);
			}
			client.query(data, [], function(err, result) {
				//call `done()` to release the client back to the pool
				done();
				
				LogUtils.Info("finished file: " + filename);
				if(err) {
					return console.error('error running query', err);
				}else{
					if(version) {
						attollo.Services.DatabaseVersion.AddDatabaseVersion(dbContext, { versionid: version })
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

	static ExecuteDbScripts(dbContext, currentDbVersion, callback, errorCallback) {
		LogUtils.Info("Current Db Script Version: " + currentDbVersion);
		var items = fs.readdirSync(process.cwd() + '/Scripts').sort(function(a, b) {
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
					DatabaseScriptUtils.ExecuteSqlScript(dbContext, process.cwd() + "/Scripts/" + items[i], recursiveCallback, errorCallback, i + 1);
				else
					callback();
			};
			var filename = process.cwd() + "/Scripts/" + items[i];
			DatabaseScriptUtils.ExecuteSqlScript(dbContext, filename, recursiveCallback, errorCallback, i + 1);
		}else{
			callback();
		}
	}

	static RunSqlScripts(dbContext, callback, errorCallback) {
		try{
			attollo.Services.DatabaseVersion.GetDatabaseVersions(dbContext)
			.then((dbVersions) => {
				DatabaseScriptUtils.ExecuteDbScripts(dbContext, Math.max.apply(Math, dbVersions.map((x) => { return x.get('versionid'); })), callback, errorCallback);
			})
			.catch((err) => {
				DatabaseScriptUtils.ExecuteDbScripts(dbContext, 0, callback, errorCallback);
			});
		}catch (e){ 
			DatabaseScriptUtils.ExecuteDbScripts(dbContext, 0, callback, errorCallback);
		}
	}
	
	static RunCleanSqlScripts(dbContext, callback, errorCallback) {
		DatabaseScriptUtils.ExecuteSqlScript(dbContext, process.cwd() + '/DropScripts/dropattollo.sql', callback, errorCallback, null);
	}
}