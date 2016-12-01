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
        
        function LoadService(serviceFileName, serviceName) {
            var serviceDef = require("./Services/" + serviceFileName, serviceName);
            return new serviceDef(serviceContext);
        }

        //Load Services
        var services = fs.readdirSync(__dirname + '/Services');

        for (var i = 0; i < services.length; i++) {
			if(services[i].endsWith('Service.js')) {
                var serviceName = services[i].replace(/\.js$/, '').replace(/Service$/, '');
                Attollo.Services[
                    serviceName
                ] = LoadService(services[i], serviceName);
            }
        }
    })();

    //PluginContext
    (function() {
        var pluginContext = require("./PluginContext");
        Attollo.GetPluginContext = function (dbContext) {
            return pluginContext.BuildContext(Attollo, dbContext);
        };
    })();
    
    //AppStart and AppStop
    (function() {
        Attollo.App.Start = function (appName, start){
            Attollo.App.Name = appName;
            
            Attollo.Utils.Log.Init(appName);

            Attollo.Utils.Log.Info("App Start");

            Promise.all([
                require("./Clients/Amqplib").Connect(),
                require("./Clients/Redis").Connect()
            ])
            .then(() => {
                if(start != null)
                    start();
            });
        };
        Attollo.App.Stop = function (){
            require("./DAL/Core/Database").Close();
            require("./Clients/Amqplib").Close();
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
