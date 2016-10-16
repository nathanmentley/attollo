(function () {
	var Context;
	var classDef = function (serviceContext) {
		Context = serviceContext;
	};
	
	classDef.prototype.GetBlockDefs = function (authContext){
		return Context.Handlers.BlockDef.GetBlockDefs(authContext);
	};

	classDef.prototype.GetBlockDef = function (authContext, code) {
		return Context.Handlers.BlockDef.GetBlockDef(authContext, code);
	};
	
	module.exports = classDef;
})();
