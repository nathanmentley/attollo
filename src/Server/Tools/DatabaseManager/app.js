require("../../Common/Attollo");

(function () {
	Attollo.App.Start('DatabaseManager', function () {});
	
	Attollo.Utils.Log.Info('database manager start');

    var command = process.argv[2];

	if(!command) {
		command = 'ensure';
	}
	
	switch(command) {
		case 'ensure':
			Attollo.Utils.Log.Info('database manager running ensure');

			require("./DatabaseScriptUtils").RunSqlScripts(function () {
				Attollo.Utils.Log.Info('database manager finished');
				
				Attollo.App.Stop();
			});
		break;
		case 'clean':
			Attollo.Utils.Log.Info('database manager running clean');

			require("./DatabaseScriptUtils").RunCleanSqlScripts(function () {
				Attollo.Utils.Log.Info('database manager finished');
				
				Attollo.App.Stop();
			});
		break;
		default:
			Attollo.Utils.Log.Info('database manager cant run unknown command: ' + command);
			Attollo.App.Stop();
			break;
	}
})();
