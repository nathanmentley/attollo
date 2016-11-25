(function () {
	var classDef = function () {};
	
	var Block = require("../Models/Block");
	var BlockDef = require("../Models/BlockDef");
	var BlockContainer = require("../Models/BlockContainer");
	var BlockContainerCssRule = require("../Models/BlockContainerCssRule");
	var BlockContainerDef = require("../Models/BlockContainerDef");
	var BlockContainerArea = require("../Models/BlockContainerArea");
	var BlockContainerAreaDef = require("../Models/BlockContainerAreaDef");
	var BlockCssRule = require("../Models/BlockCssRule");
	var BlockSetting = require("../Models/BlockSetting");
	var BlockSettingDef = require("../Models/BlockSettingDef");
	var BlockTemplateDef = require("../Models/BlockTemplateDef");

	var Client = require("../Models/Client");
	var CssRule = require("../Models/CssRule");
	var CssRuleDef = require("../Models/CssRuleDef");
	var CssRuleDefGroup = require("../Models/CssRuleDefGroup");
	var CssRuleDefType = require("../Models/CssRuleDefType");

	var DatabaseVersion = require("../Models/DatabaseVersion");
	var DatabaseCodeVersion = require("../Models/DatabaseCodeVersion");

	var DataType = require("../Models/DataType");
	var DataTypeDef = require("../Models/DataTypeDef");
	var DataTypeField = require("../Models/DataTypeField");
	var DataTypeFieldDef = require("../Models/DataTypeFieldDef");
	var DataTypeFieldType = require("../Models/DataTypeFieldType");

	var Page = require("../Models/Page");
	var PageDef = require("../Models/PageDef");

	var PermissionDef = require("../Models/PermissionDef");
	var Role = require("../Models/Role");
	var RolePermission = require("../Models/RolePermission");

	var SettingType = require("../Models/SettingType");
	
	var Site = require("../Models/Site");
	var SiteVersion = require("../Models/SiteVersion");
	var SiteVersionStatus = require("../Models/SiteVersionStatus");

	var Theme = require("../Models/Theme");
	var ThemeCssRule = require("../Models/ThemeCssRule");

	var User = require("../Models/User");
	var UserPermission = require("../Models/UserPermission");

	classDef.prototype.Blocks = Block.Collection;
	classDef.prototype.Block = Block.Model;

	classDef.prototype.BlockDefs = BlockDef.Collection;
	classDef.prototype.BlockDef = BlockDef.Model;

	classDef.prototype.BlockContainers = BlockContainer.Collection;
	classDef.prototype.BlockContainer = BlockContainer.Model;
	
	classDef.prototype.BlockContainerCssRules = BlockContainerCssRule.Collection;
	classDef.prototype.BlockContainerCssRule = BlockContainerCssRule.Model;

	classDef.prototype.BlockContainerDefs = BlockContainerDef.Collection;
	classDef.prototype.BlockContainerDef = BlockContainerDef.Model;

	classDef.prototype.BlockContainerAreas = BlockContainerArea.Collection;
	classDef.prototype.BlockContainerArea = BlockContainerArea.Model;

	classDef.prototype.BlockContainerAreaDefs = BlockContainerAreaDef.Collection;
	classDef.prototype.BlockContainerAreaDef = BlockContainerAreaDef.Model;

	classDef.prototype.BlockCssRules = BlockCssRule.Collection;
	classDef.prototype.BlockCssRule = BlockCssRule.Model;

	classDef.prototype.BlockSettings = BlockSetting.Collection;
	classDef.prototype.BlockSetting = BlockSetting.Model;

	classDef.prototype.BlockSettingDefs = BlockSettingDef.Collection;
	classDef.prototype.BlockSettingDef = BlockSettingDef.Model;

	classDef.prototype.BlockTemplateDefs = BlockTemplateDef.Collection;
	classDef.prototype.BlockTemplateDef = BlockTemplateDef.Model;

	classDef.prototype.Clients = Client.Collection;
	classDef.prototype.Client = Client.Model;

	classDef.prototype.CssRules = CssRule.Collection;
	classDef.prototype.CssRule = CssRule.Model;

	classDef.prototype.CssRuleDefs = CssRuleDef.Collection;
	classDef.prototype.CssRuleDef = CssRuleDef.Model;

	classDef.prototype.CssRuleDefGroups = CssRuleDefGroup.Collection;
	classDef.prototype.CssRuleDefGroup = CssRuleDefGroup.Model;

	classDef.prototype.CssRuleDefTypes = CssRuleDefType.Collection;
	classDef.prototype.CssRuleDefType = CssRuleDefType.Model;

	classDef.prototype.DatabaseVersions = DatabaseVersion.Collection;
	classDef.prototype.DatabaseVersion = DatabaseVersion.Model;

	classDef.prototype.DatabaseCodeVersions = DatabaseCodeVersion.Collection;
	classDef.prototype.DatabaseCodeVersion = DatabaseCodeVersion.Model;

	classDef.prototype.DataTypes = DataType.Collection;
	classDef.prototype.DataType = DataType.Model;

	classDef.prototype.DataTypeDefs = DataTypeDef.Collection;
	classDef.prototype.DataTypeDef = DataTypeDef.Model;
	
	classDef.prototype.DataTypeFields = DataTypeField.Collection;
	classDef.prototype.DataTypeField = DataTypeField.Model;

	classDef.prototype.DataTypeFieldDefs = DataTypeFieldDef.Collection;
	classDef.prototype.DataTypeFieldDef = DataTypeFieldDef.Model;

	classDef.prototype.DataTypeFieldTypes = DataTypeFieldType.Collection;
	classDef.prototype.DataTypeFieldType = DataTypeFieldType.Model;

	classDef.prototype.Pages = Page.Collection;
	classDef.prototype.Page = Page.Model;

	classDef.prototype.PageDefs = PageDef.Collection;
	classDef.prototype.PageDef = PageDef.Model;

	classDef.prototype.PermissionDefs = PermissionDef.Collection;
	classDef.prototype.PermissionDef = PermissionDef.Model;

	classDef.prototype.Roles = Role.Collection;
	classDef.prototype.Role = Role.Model;

	classDef.prototype.RolePermissions = RolePermission.Collection;
	classDef.prototype.RolePermission = RolePermission.Model;

	classDef.prototype.SettingTypes = SettingType.Collection;
	classDef.prototype.SettingType = SettingType.Model;

	classDef.prototype.Sites = Site.Collection;
	classDef.prototype.Site = Site.Model;

	classDef.prototype.SiteVersions = SiteVersion.Collection;
	classDef.prototype.SiteVersion = SiteVersion.Model;

	classDef.prototype.SiteVersionStatuses = SiteVersionStatus.Collection;
	classDef.prototype.SiteVersionStatus = SiteVersionStatus.Model;

	classDef.prototype.Themes = Theme.Collection;
	classDef.prototype.Theme = Theme.Model;

	classDef.prototype.ThemeCssRules = ThemeCssRule.Collection;
	classDef.prototype.ThemeCssRule = ThemeCssRule.Model;

	classDef.prototype.Users = User.Collection;
	classDef.prototype.User = User.Model;

	classDef.prototype.UserPermissions = UserPermission.Collection;
	classDef.prototype.UserPermission = UserPermission.Model;

	module.exports = new classDef();
})();