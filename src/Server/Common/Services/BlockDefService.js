(function () {
	var Context;
	var classDef = function (serviceContext) {
		Context = serviceContext;
	};
	
	classDef.prototype.GetBlockDefs = function (authContext){
		return Context.Handlers.BlockDef.GetBlockDefs(authContext);
	};
	
	classDef.prototype.AddBlockDef = function (authContext, blockDef){
		return Context.Handlers.BlockDef.AddBlockDef(authContext, blockDef);
	};
	
	module.exports = classDef;
})();
