Attollo = {
    App: {},
    Services: {},
    Utils: {}
};

(function () {
	var classDef = function () {};
	var fs = require('fs');
	
    //SetupUtils
    Attollo.Utils.Config = require("./Utils/ConfigUtils").GetConfig();
    Attollo.Utils.Log = require("./Utils/LogUtils");
    
    //Services
    (function() {
        var serviceContext = require("./ServiceContext");
        
        function LoadService(serviceName) {
            var serviceDef = require("./Services/" + serviceName);
            return new serviceDef(serviceContext);
        }

        //Load Services
        var services = fs.readdirSync(__dirname + '/Services');

        for (var i = 0; i < services.length; i++) {
			if(services[i].endsWith('Service.js')) {
                Attollo.Services[
                    services[i].replace(/\.js$/, '').replace(/Service$/, '')
                ] = LoadService(services[i]);
            }
        }
    })();
    
    //AppStart and AppStop
    (function() {
        Attollo.App.Start = function (appName, start){
            Attollo.Utils.Log.Init(appName);

            Attollo.Utils.Log.Info("App Start");

            require("./Clients/Redis").Connect();
            
            if(start != null)
                start();
        };
        Attollo.App.Stop = function (){
            require("./DAL/Core/Database").Close();
            require("./Clients/Redis").Close();
            
            Attollo.Utils.Log.Info("App Stop");
        };

        process.on('uncaughtException', function (err) {
            Attollo.Utils.Log.Error(err);
            Attollo.Utils.Log.Info(err.stack);
        });
    })();
    
	module.exports = Attollo;
})();
