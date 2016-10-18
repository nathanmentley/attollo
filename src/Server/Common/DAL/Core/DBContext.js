(function () {
	var classDef = function () {};
	
	var Block = require("../Models/Block");
	var BlockDef = require("../Models/BlockDef");
	var BlockSetting = require("../Models/BlockSetting");
	var BlockSettingDef = require("../Models/BlockSettingDef");
	var Client = require("../Models/Client");
	var DatabaseVersion = require("../Models/DatabaseVersion");
	var Page = require("../Models/Page");
	var Site = require("../Models/Site");
	var User = require("../Models/User");

	classDef.prototype.Blocks = Block.Collection;
	classDef.prototype.Block = Block.Model;

	classDef.prototype.BlockDefs = BlockDef.Collection;
	classDef.prototype.BlockDef = BlockDef.Model;

	classDef.prototype.BlockSettings = BlockSetting.Collection;
	classDef.prototype.BlockSetting = BlockSetting.Model;

	classDef.prototype.BlockSettingDefs = BlockSettingDef.Collection;
	classDef.prototype.BlockSettingDef = BlockSettingDef.Model;

	classDef.prototype.Clients = Client.Collection;
	classDef.prototype.Client = Client.Model;

	classDef.prototype.DatabaseVersions = DatabaseVersion.Collection;
	classDef.prototype.DatabaseVersion = DatabaseVersion.Model;

	classDef.prototype.Pages = Page.Collection;
	classDef.prototype.Page = Page.Model;

	classDef.prototype.Sites = Site.Collection;
	classDef.prototype.Site = Site.Model;

	classDef.prototype.Users = User.Collection;
	classDef.prototype.User = User.Model;

	module.exports = new classDef();
})();