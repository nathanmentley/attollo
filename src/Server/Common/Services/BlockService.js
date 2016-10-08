(function () {
	var Context;
	var classDef = function (serviceContext) {
		Context = serviceContext;
	};
	
	classDef.prototype.GetBlocks = function (pageId, success, error){
		return Context.Handlers.Block.GetBlocks(pageId, success, error);
	};
	
	classDef.prototype.AddBlock = function (block, success, error){
		return Context.Handlers.Block.AddBlock(block, success, error);
	};
	
	module.exports = classDef;
})();
