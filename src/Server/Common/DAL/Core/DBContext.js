import Block from "../Models/Block";
import BlockDef from "../Models/BlockDef";
import BlockContainer from "../Models/BlockContainer";
import BlockContainerCssRule from "../Models/BlockContainerCssRule";
import BlockContainerDef from "../Models/BlockContainerDef";
import BlockContainerArea from "../Models/BlockContainerArea";
import BlockContainerAreaDef from "../Models/BlockContainerAreaDef";
import BlockContainerAreaInstance from "../Models/BlockContainerAreaInstance";
import BlockCssRule from "../Models/BlockCssRule";
import BlockSetting from "../Models/BlockSetting";
import BlockSettingDef from "../Models/BlockSettingDef";
import BlockTemplateDef from "../Models/BlockTemplateDef";
import BlockDefDataRequest from "../Models/BlockDefDataRequest";
import BlockDefFunction from "../Models/BlockDefFunction";
import Client from "../Models/Client";
import CssRule from "../Models/CssRule";
import CssRuleDef from "../Models/CssRuleDef";
import CssRuleDefGroup from "../Models/CssRuleDefGroup";
import CssRuleDefType from "../Models/CssRuleDefType";
import DatabaseVersion from "../Models/DatabaseVersion";
import DatabaseCodeVersion from "../Models/DatabaseCodeVersion";
import DataType from "../Models/DataType";
import DataTypeDef from "../Models/DataTypeDef";
import DataTypeField from "../Models/DataTypeField";
import DataTypeFieldDef from "../Models/DataTypeFieldDef";
import DataTypeFieldType from "../Models/DataTypeFieldType";
import Page from "../Models/Page";
import PageDef from "../Models/PageDef";
import Plugin from "../Models/Plugin";
import PluginDef from "../Models/PluginDef";
import PluginDefLogic from "../Models/PluginDefLogic";
import PluginDefLogicDef from "../Models/PluginDefLogicDef";
import PluginDefLogicTarget from "../Models/PluginDefLogicTarget";
import PluginSetting from "../Models/PluginSetting";
import PluginSettingDef from "../Models/PluginSettingDef";
import PermissionDef from "../Models/PermissionDef";
import Role from "../Models/Role";
import RolePermission from "../Models/RolePermission";
import SettingType from "../Models/SettingType";
import Site from "../Models/Site";
import SiteVersion from "../Models/SiteVersion";
import SiteVersionStatus from "../Models/SiteVersionStatus";
import Theme from "../Models/Theme";
import ThemeCssRule from "../Models/ThemeCssRule";
import User from "../Models/User";
import UserPermission from "../Models/UserPermission";

export default class DBContext {
	get Blocks() { return Block.Collection; }
	get Block() { return Block.Model; }

	get BlockDefs() { return BlockDef.Collection; }
	get BlockDef() { return BlockDef.Model; }

	get BlockContainers() { return BlockContainer.Collection; }
	get BlockContainer() { return BlockContainer.Model; }
	
	get BlockContainerCssRules() { return BlockContainerCssRule.Collection; }
	get BlockContainerCssRule() { return BlockContainerCssRule.Model; }

	get BlockContainerDefs() { return BlockContainerDef.Collection; }
	get BlockContainerDef() { return BlockContainerDef.Model; }

	get BlockContainerAreas() { return BlockContainerArea.Collection; }
	get BlockContainerArea() { return BlockContainerArea.Model; }

	get BlockContainerAreaDefs() { return BlockContainerAreaDef.Collection; }
	get BlockContainerAreaDef() { return BlockContainerAreaDef.Model; }

	get BlockContainerAreaInstances() { return BlockContainerAreaInstance.Collection; }
	get BlockContainerAreaInstance() { return BlockContainerAreaInstance.Model; }

	get BlockCssRules() { return BlockCssRule.Collection; }
	get BlockCssRule() { return BlockCssRule.Model; }

	get BlockSettings() { return BlockSetting.Collection; }
	get BlockSetting() { return BlockSetting.Model; }

	get BlockSettingDefs() { return BlockSettingDef.Collection; }
	get BlockSettingDef() { return BlockSettingDef.Model; }

	get BlockTemplateDefs() { return BlockTemplateDef.Collection; }
	get BlockTemplateDef() { return BlockTemplateDef.Model; }

	get BlockDefDataRequests() { return BlockDefDataRequest.Collection; }
	get BlockDefDataRequest() { return BlockDefDataRequest.Model; }

	get BlockDefFunctions() { return BlockDefFunction.Collection; }
	get BlockDefFunction() { return BlockDefFunction.Model; }

	get Clients() { return Client.Collection; }
	get Client() { return Client.Model; }

	get CssRules() { return CssRule.Collection; }
	get CssRule() { return CssRule.Model; }

	get CssRuleDefs() { return CssRuleDef.Collection; }
	get CssRuleDef() { return CssRuleDef.Model; }

	get CssRuleDefGroups() { return CssRuleDefGroup.Collection; }
	get CssRuleDefGroup() { return CssRuleDefGroup.Model; }

	get CssRuleDefTypes() { return CssRuleDefType.Collection; }
	get CssRuleDefType() { return CssRuleDefType.Model; }

	get DatabaseVersions() { return DatabaseVersion.Collection; }
	get DatabaseVersion() { return DatabaseVersion.Model; }

	get DatabaseCodeVersions() { return DatabaseCodeVersion.Collection; }
	get DatabaseCodeVersion() { return DatabaseCodeVersion.Model; }

	get DataTypes() { return DataType.Collection; }
	get DataType() { return DataType.Model; }

	get DataTypeDefs() { return DataTypeDef.Collection; }
	get DataTypeDef() { return DataTypeDef.Model; }
	
	get DataTypeFields() { return DataTypeField.Collection; }
	get DataTypeField() { return DataTypeField.Model; }

	get DataTypeFieldDefs() { return DataTypeFieldDef.Collection; }
	get DataTypeFieldDef() { return DataTypeFieldDef.Model; }

	get DataTypeFieldTypes() { return DataTypeFieldType.Collection; }
	get DataTypeFieldType() { return DataTypeFieldType.Model; }

	get Pages() { return Page.Collection; }
	get Page() { return Page.Model; }

	get PageDefs() { return PageDef.Collection; }
	get PageDef() { return PageDef.Model; }

	get PermissionDefs() { return PermissionDef.Collection; }
	get PermissionDef() { return PermissionDef.Model; }

	get Plugins() { return Plugin.Collection; }
	get Plugin() { return Plugin.Model; }

	get PluginDefs() { return PluginDef.Collection; }
	get PluginDef() { return PluginDef.Model; }

	get PluginDefLogics() { return PluginDefLogic.Collection; }
	get PluginDefLogic() { return PluginDefLogic.Model; }

	get PluginDefLogicDefs() { return PluginDefLogicDef.Collection; }
	get PluginDefLogicDef() { return PluginDefLogicDef.Model; }

	get PluginDefLogicTargets() { return PluginDefLogicTarget.Collection; }
	get PluginDefLogicTarget() { return PluginDefLogicTarget.Model; }

	get PluginSettings() { return PluginSetting.Collection; }
	get PluginSetting() { return PluginSetting.Model; }

	get PluginSettingDefs() { return PluginSettingDef.Collection; }
	get PluginSettingDef() { return PluginSettingDef.Model; }

	get Roles() { return Role.Collection; }
	get Role() { return Role.Model; }

	get RolePermissions() { return RolePermission.Collection; }
	get RolePermission() { return RolePermission.Model; }

	get SettingTypes() { return SettingType.Collection; }
	get SettingType() { return SettingType.Model; }

	get Sites() { return Site.Collection; }
	get Site() { return Site.Model; }

	get SiteVersions() { return SiteVersion.Collection; }
	get SiteVersion() { return SiteVersion.Model; }

	get SiteVersionStatuses() { return SiteVersionStatus.Collection; }
	get SiteVersionStatus() { return SiteVersionStatus.Model; }

	get Themes() { return Theme.Collection; }
	get Theme() { return Theme.Model; }

	get ThemeCssRules() { return ThemeCssRule.Collection; }
	get ThemeCssRule() { return ThemeCssRule.Model; }

	get Users() { return User.Collection; }
	get User() { return User.Model; }

	get UserPermissions() { return UserPermission.Collection; }
	get UserPermission() { return UserPermission.Model; }
}