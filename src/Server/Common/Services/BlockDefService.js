(function () {
	var Context;
	var classDef = function (serviceContext) {
		Context = serviceContext;
	};
	
	classDef.prototype.GetBlockDefs = function (success, error){
		return Context.Handlers.BlockDef.GetBlockDefs(success, error);
	};
	
	classDef.prototype.AddBlockDef = function (blockDef, success, error){
		return Context.Handlers.BlockDef.AddBlockDef(blockDef, success, error);
	};
	
	module.exports = classDef;
})();
