(function () {
	var Context;
	var classDef = function (serviceContext) {
		Context = serviceContext;
	};
	
	classDef.prototype.GetBlocks = function (success, error){
		return Context.Handlers.Block.GetBlocks(success, error);
	};
	
	classDef.prototype.AddBlock = function (block, success, error){
		return Context.Handlers.Block.AddBlock(block, success, error);
	};
	
	module.exports = classDef;
})();
