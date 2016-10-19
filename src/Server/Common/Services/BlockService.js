(function () {
	var jsx = require('react-jsx');

	var Context;
	var classDef = function (serviceContext) {
		Context = serviceContext;
	};

	//blockContainer

	classDef.prototype.GetBlockContainers = function (authContext, pageId){
		return Context.Handlers.Block.GetBlockContainers(authContext, pageId);
	};
	
	//blockDef

	classDef.prototype.GetBlockDefs = function (authContext){
		return Context.Handlers.Block.GetBlockDefs(authContext);
	};

	classDef.prototype.GetBlockDef = function (authContext, code) {
		return Context.Handlers.Block.GetBlockDef(authContext, code);
	};

	//Block

	classDef.prototype.GetBlocks = function (authContext, blockContainerId){
		return Context.Handlers.Block.GetBlocks(authContext, blockContainerId);
	};
	
	classDef.prototype.AddBlock = function (authContext, blockContainerId, blockDef){
		var compiledtemplate = _renderTemplate("<p></p>");

		return Context.Handlers.Block.AddBlock(authContext, blockContainerId, blockDef, compiledtemplate);
	};

	classDef.prototype.UpdateBlock = function (authContext, block){
		block.compiledtemplate = _renderTemplate(block.template);

		return Context.Handlers.Block.UpdateBlock(authContext, block);
	};

	classDef.prototype.DeleteBlock = function (authContext, block){
		return Context.Handlers.Block.DeleteBlock(authContext, block);
	};
	
	//privateMethods
	var _renderTemplate = function(template) {
		//Todo: Make this shit not fucking hacky as shit.
		return jsx.client(template).toString()
				.replace("with (data)", "")
				.replace("this.props ? this : data", "data");
	};

	//BlockSettingDef

	classDef.prototype.GetBlockSettingDefs = function (authContext, blockDefId){
		return Context.Handlers.Block.GetBlockSettingDefs(authContext, blockDefId);
	};

	//BlockSetting

	classDef.prototype.GetBlockSettings = function (authContext, block){
		return Context.Handlers.Block.GetBlockSettings(authContext, block);
	};

	module.exports = classDef;
	
})();
