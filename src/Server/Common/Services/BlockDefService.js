(function () {
	var Context;
	var classDef = function (serviceContext) {
		Context = serviceContext;
	};
	
	classDef.prototype.GetBlockDefs = function (){
		return Context.Handlers.BlockDef.GetBlockDefs();
	};
	
	classDef.prototype.AddBlockDef = function (blockDef){
		return Context.Handlers.BlockDef.AddBlockDef(blockDef);
	};
	
	module.exports = classDef;
})();
