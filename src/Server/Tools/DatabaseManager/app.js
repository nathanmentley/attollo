require("../../Common/Attollo");

(function () {
	Attollo.App.Start('DatabaseManager', function () {});
	
	Attollo.Utils.Log.Info('database manager start');
	
	require("./DatabaseScriptUtils").RunSqlScripts(function () {
		Attollo.Utils.Log.Info('database manager finished');
		
		Attollo.App.Stop();
	});
})();
