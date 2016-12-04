import Attollo from "../../Common/Attollo";
import LogUtils from "../../Common/Utils/LogUtils";

import DatabaseScriptUtils from "./DatabaseScriptUtils";
import DBManagerDbContext from "./DBManagerDbContext";
import DatabaseCodeUtils from "./DatabaseCodeUtils";

Attollo.Start('DatabaseManager')
.then(() => {
	LogUtils.Info('database manager start');

	var command = process.argv[2];
	if(!command) {
		command = 'ensure';
	}
	
	switch(command) {
		case 'ensure':
			LogUtils.Info('database manager running ensure');
			DatabaseScriptUtils.RunSqlScripts(
				DBManagerDbContext,
				() => {
					LogUtils.Info('database manager scripts finished');
					DatabaseCodeUtils.RunSqlCode(
						DBManagerDbContext,
						() => {
							LogUtils.Info('database manager code finished');
							LogUtils.Info('database manager finished');
							
							Attollo.Stop();
						},
						(err) => {
							LogUtils.Info('database manager code error: ' + err);
							LogUtils.Info(err.stack);
						}
					);
				}, (err) => {
					LogUtils.Info('database manager script error: ' + err);
					LogUtils.Info(err.stack);
				}
			);
		break;
		case 'clean':
			LogUtils.Info('database manager running clean');
			DatabaseScriptUtils.RunCleanSqlScripts(
				DBManagerDbContext,
				() => {
					LogUtils.Info('database manager finished');
					
					Attollo.Stop();
				}, (err) => {
					LogUtils.Info('database manager script error: ' + err);
					LogUtils.Info(err.stack);
				}
			);
		break;
		default:
			LogUtils.Info('database manager cant run unknown command: ' + command);
			Attollo.Stop();
			break;
	}
})
.catch((err) => {
    LogUtils.Error(err);
    LogUtils.Info(err.stack);
});

process.on('uncaughtException', (err) => {
    LogUtils.Error(err);
    LogUtils.Info(err.stack);
});