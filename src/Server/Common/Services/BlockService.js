(function () {
	var Context;
	var classDef = function (serviceContext) {
		Context = serviceContext;
	};
	
	classDef.prototype.GetBlocks = function (authContext, pageId){
		return Context.Handlers.Block.GetBlocks(authContext, pageId);
	};
	
	classDef.prototype.AddBlock = function (authContext, block){
		return Context.Handlers.Block.AddBlock(authContext, block);
	};
	
	module.exports = classDef;
})();
