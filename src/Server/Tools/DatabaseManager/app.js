require("../../Common/Attollo");

(function () {
	Attollo.App.Start('DatabaseManager', function () {});
	
	Attollo.Utils.Log.Info('database manager start');
	
	require("./DatabaseScriptUtils").RunSqlScripts(function () {
		/*
			//Data Ensure Helpers and code
			
		require("../Common/Services/ContactService").AddContact(
			{ name: "test", addr1: "fromdbmanger", enabled: 1 },
			function () {
				require('../Common/DAL/Core/Database').Close();
				Postgresql.end();
				console.log('database manager finish');
			},
			function (err) {
				require('../Common/DAL/Core/Database').Close();
				Postgresql.end();
				console.log('database manager error: ' + err);
			}
		);
		*/
		
		Attollo.Utils.Log.Info('database manager finished');
		
		Attollo.App.Stop();
	});
})();
