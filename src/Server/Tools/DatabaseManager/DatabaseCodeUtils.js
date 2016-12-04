import fs from 'fs';

import Attollo from "../../Common/Attollo";
import LogUtils from "../../Common/Utils/LogUtils";
	
//TODO: fix this.
import Code1 from './CodeVersions/1.js';
import Code2 from './CodeVersions/2.js';
import Code3 from './CodeVersions/3.js';
import Code4 from './CodeVersions/4.js';
import Code5 from './CodeVersions/5.js';
import Code6 from './CodeVersions/6.js';
import Code7 from './CodeVersions/7.js';
import Code8 from './CodeVersions/8.js';
import Code9 from './CodeVersions/9.js';
import Code10 from './CodeVersions/10.js';
import Code11 from './CodeVersions/11.js';
import Code12 from './CodeVersions/12.js';

export default class DatabaseCodeUtils {
    static get CodeScripts() {
        var codeScripts = {};

		codeScripts['./CodeVersions/1'] = Code1;
		codeScripts['./CodeVersions/2'] = Code2;
		codeScripts['./CodeVersions/3'] = Code3;
		codeScripts['./CodeVersions/4'] = Code4;
		codeScripts['./CodeVersions/5'] = Code5;
		codeScripts['./CodeVersions/6'] = Code6;
		codeScripts['./CodeVersions/7'] = Code7;
		codeScripts['./CodeVersions/8'] = Code8;
		codeScripts['./CodeVersions/9'] = Code9;
		codeScripts['./CodeVersions/10'] = Code10;
		codeScripts['./CodeVersions/11'] = Code11;
		codeScripts['./CodeVersions/12'] = Code12;

		return codeScripts;
    }

    static ExecuteSqlCode(dbContext, filename, callback, errorCallback, version) {
		LogUtils.Info("running file: " + filename);
		try{
			var codeScript = DatabaseCodeUtils.CodeScripts[filename];
			codeScript.Logic(dbContext, () => {
				LogUtils.Info("finished file: " + filename);
				if(version) {
					Attollo.Services.DatabaseVersion.AddDatabaseCodeVersion(dbContext, { versionid: version })
					.then(() => {
						LogUtils.Info("finished file: " + filename);
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
			LogUtils.Info("catch: " + e);
			throw e;
		}
	}

	static ExecuteDbCodes(dbContext, currentDbVersion, callback, errorCallback) {
		LogUtils.Info("Current Db Code Version: " + currentDbVersion);
		var items = fs.readdirSync(process.cwd() + '/CodeVersions').sort(function(a, b) {
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
					DatabaseCodeUtils.ExecuteSqlCode(dbContext, "./CodeVersions/" + items[i].split('.')[0], recursiveCallback, errorCallback, i + 1);
				else
					callback();
			};
			var filename = "./CodeVersions/" + items[i].split('.')[0];
			DatabaseCodeUtils.ExecuteSqlCode(dbContext, filename, recursiveCallback, errorCallback, i + 1);
		}else{
			callback();
		}
	}

	static RunSqlCode(dbContext, callback, errorCallback) {
		try{
			Attollo.Services.DatabaseVersion.GetDatabaseCodeVersions(dbContext)
			.then((dbVersions) => {
				DatabaseCodeUtils.ExecuteDbCodes(dbContext, Math.max.apply(Math, dbVersions.map((x) => { return x.get('versionid'); })), callback, errorCallback);
			})
			.catch(() => {
				DatabaseCodeUtils.ExecuteDbCodes(dbContext, 0, callback, errorCallback);
			});
		}catch (e){ 
			DatabaseCodeUtils.ExecuteDbCodes(dbContext, 0, callback, errorCallback);
		}
	}
}