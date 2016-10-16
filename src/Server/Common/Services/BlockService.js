(function () {
	var Context;
	var classDef = function (serviceContext) {
		Context = serviceContext;
	};
	
	classDef.prototype.GetBlocks = function (authContext, pageId){
		return Context.Handlers.Block.GetBlocks(authContext, pageId);
	};
	
	classDef.prototype.AddBlock = function (authContext, pageId, blockDef){
		return Context.Handlers.Block.AddBlock(authContext, pageId, blockDef);
	};

	classDef.prototype.UpdateBlock = function (authContext, block){
		return Context.Handlers.Block.UpdateBlock(authContext, block);
	};

	classDef.prototype.DeleteBlock = function (authContext, block){
		return Context.Handlers.Block.DeleteBlock(authContext, block);
	};
	
	module.exports = classDef;
})();
