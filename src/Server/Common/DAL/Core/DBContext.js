import Attollo from '../../Attollo';

import Block from "../Models/Block";
import BlockDef from "../Models/BlockDef";
import BlockContainer from "../Models/BlockContainer";
import BlockContainerCssRule from "../Models/BlockContainerCssRule";
import BlockContainerDef from "../Models/BlockContainerDef";
import BlockContainerArea from "../Models/BlockContainerArea";
import BlockContainerAreaDef from "../Models/BlockContainerAreaDef";
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
	static get Blocks() { return Block.Collection; }
	static get Block() { return Block.Model; }

	static get BlockDefs() { return BlockDef.Collection; }
	static get BlockDef() { return BlockDef.Model; }

	static get BlockContainers() { return BlockContainer.Collection; }
	static get BlockContainer() { return BlockContainer.Model; }
	
	static get BlockContainerCssRules() { return BlockContainerCssRule.Collection; }
	static get BlockContainerCssRule() { return BlockContainerCssRule.Model; }

	static get BlockContainerDefs() { return BlockContainerDef.Collection; }
	static get BlockContainerDef() { return BlockContainerDef.Model; }

	static get BlockContainerAreas() { return BlockContainerArea.Collection; }
	static get BlockContainerArea() { return BlockContainerArea.Model; }

	static get BlockContainerAreaDefs() { return BlockContainerAreaDef.Collection; }
	static get BlockContainerAreaDef() { return BlockContainerAreaDef.Model; }

	static get BlockCssRules() { return BlockCssRule.Collection; }
	static get BlockCssRule() { return BlockCssRule.Model; }

	static get BlockSettings() { return BlockSetting.Collection; }
	static get BlockSetting() { return BlockSetting.Model; }

	static get BlockSettingDefs() { return BlockSettingDef.Collection; }
	static get BlockSettingDef() { return BlockSettingDef.Model; }

	static get BlockTemplateDefs() { return BlockTemplateDef.Collection; }
	static get BlockTemplateDef() { return BlockTemplateDef.Model; }

	static get BlockDefDataRequests() { return BlockDefDataRequest.Collection; }
	static get BlockDefDataRequest() { return BlockDefDataRequest.Model; }

	static get BlockDefFunctions() { return BlockDefFunction.Collection; }
	static get BlockDefFunction() { return BlockDefFunction.Model; }

	static get Clients() { return Client.Collection; }
	static get Client() { return Client.Model; }

	static get CssRules() { return CssRule.Collection; }
	static get CssRule() { return CssRule.Model; }

	static get CssRuleDefs() { return CssRuleDef.Collection; }
	static get CssRuleDef() { return CssRuleDef.Model; }

	static get CssRuleDefGroups() { return CssRuleDefGroup.Collection; }
	static get CssRuleDefGroup() { return CssRuleDefGroup.Model; }

	static get CssRuleDefTypes() { return CssRuleDefType.Collection; }
	static get CssRuleDefType() { return CssRuleDefType.Model; }

	static get DatabaseVersions() { return DatabaseVersion.Collection; }
	static get DatabaseVersion() { return DatabaseVersion.Model; }

	static get DatabaseCodeVersions() { return DatabaseCodeVersion.Collection; }
	static get DatabaseCodeVersion() { return DatabaseCodeVersion.Model; }

	static get DataTypes() { return DataType.Collection; }
	static get DataType() { return DataType.Model; }

	static get DataTypeDefs() { return DataTypeDef.Collection; }
	static get DataTypeDef() { return DataTypeDef.Model; }
	
	static get DataTypeFields() { return DataTypeField.Collection; }
	static get DataTypeField() { return DataTypeField.Model; }

	static get DataTypeFieldDefs() { return DataTypeFieldDef.Collection; }
	static get DataTypeFieldDef() { return DataTypeFieldDef.Model; }

	static get DataTypeFieldTypes() { return DataTypeFieldType.Collection; }
	static get DataTypeFieldType() { return DataTypeFieldType.Model; }

	static get Pages() { return Page.Collection; }
	static get Page() { return Page.Model; }

	static get PageDefs() { return PageDef.Collection; }
	static get PageDef() { return PageDef.Model; }

	static get PermissionDefs() { return PermissionDef.Collection; }
	static get PermissionDef() { return PermissionDef.Model; }

	static get Plugins() { return Plugin.Collection; }
	static get Plugin() { return Plugin.Model; }

	static get PluginDefs() { return PluginDef.Collection; }
	static get PluginDef() { return PluginDef.Model; }

	static get PluginDefLogics() { return PluginDefLogic.Collection; }
	static get PluginDefLogic() { return PluginDefLogic.Model; }

	static get PluginDefLogicDefs() { return PluginDefLogicDef.Collection; }
	static get PluginDefLogicDef() { return PluginDefLogicDef.Model; }

	static get PluginDefLogicTargets() { return PluginDefLogicTarget.Collection; }
	static get PluginDefLogicTarget() { return PluginDefLogicTarget.Model; }

	static get PluginSettings() { return PluginSetting.Collection; }
	static get PluginSetting() { return PluginSetting.Model; }

	static get PluginSettingDefs() { return PluginSettingDef.Collection; }
	static get PluginSettingDef() { return PluginSettingDef.Model; }

	static get Roles() { return Role.Collection; }
	static get Role() { return Role.Model; }

	static get RolePermissions() { return RolePermission.Collection; }
	static get RolePermission() { return RolePermission.Model; }

	static get SettingTypes() { return SettingType.Collection; }
	static get SettingType() { return SettingType.Model; }

	static get Sites() { return Site.Collection; }
	static get Site() { return Site.Model; }

	static get SiteVersions() { return SiteVersion.Collection; }
	static get SiteVersion() { return SiteVersion.Model; }

	static get SiteVersionStatuses() { return SiteVersionStatus.Collection; }
	static get SiteVersionStatus() { return SiteVersionStatus.Model; }

	static get Themes() { return Theme.Collection; }
	static get Theme() { return Theme.Model; }

	static get ThemeCssRules() { return ThemeCssRule.Collection; }
	static get ThemeCssRule() { return ThemeCssRule.Model; }

	static get Users() { return User.Collection; }
	static get User() { return User.Model; }

	static get UserPermissions() { return UserPermission.Collection; }
	static get UserPermission() { return UserPermission.Model; }
}