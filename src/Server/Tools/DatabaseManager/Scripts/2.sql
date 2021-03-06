CREATE TABLE IF NOT EXISTS Client (
    ID SERIAL PRIMARY KEY,
    Name VARCHAR(255) NOT NULL
);

--CSS

CREATE TABLE IF NOT EXISTS CssRuleDefGroup (
    ID SERIAL PRIMARY KEY,
    Code VARCHAR(255) NOT NULL,
    Name VARCHAR(255) NOT NULL,
    Description Text NOT NULL
);

CREATE TABLE IF NOT EXISTS CssRuleDefType (
    ID SERIAL PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
    Code VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS CssRuleDef (
    ID SERIAL PRIMARY KEY,
    Code VARCHAR(255) NOT NULL,
    Name VARCHAR(255) NOT NULL,
    Property VARCHAR(255) NOT NULL,
    Description Text NOT NULL,
    CssRuleDefTypeID integer REFERENCES CssRuleDefType NOT NULL,
    CssRuleDefGroupID integer REFERENCES CssRuleDefGroup NOT NULL,
    Options TEXT NULL
);

CREATE TABLE IF NOT EXISTS CssRule (
    ID SERIAL PRIMARY KEY,
    CssRuleDefID integer REFERENCES CssRuleDef NOT NULL,
    Selector TEXT NOT NULL,
    Value TEXT NOT NULL
);

-- Plugin Defs

CREATE TABLE IF NOT EXISTS PluginDef (
    ID SERIAL PRIMARY KEY,
    ClientID integer REFERENCES Client NULL,
    Code VARCHAR(255) NOT NULL,
    Name VARCHAR(255) NOT NULL,
    Description TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS PluginDefLogicDef (
    ID SERIAL PRIMARY KEY,
    Code VARCHAR(255) NOT NULL,
    Title VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS PluginDefLogicTarget (
    ID SERIAL PRIMARY KEY,
    Code VARCHAR(255) NOT NULL,
    Title VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS PluginDefLogic (
    ID SERIAL PRIMARY KEY,
    PluginDefLogicDefID integer REFERENCES PluginDefLogicDef NOT NULL,
    PluginDefLogicTargetID integer REFERENCES PluginDefLogicTarget NOT NULL,
    PluginDefID integer REFERENCES PluginDef NOT NULL,
    Content VARCHAR(255) NOT NULL,
    CompiledContent VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS PluginSettingDef (
    ID SERIAL PRIMARY KEY,
    PluginDefID integer REFERENCES PluginDef NOT NULL,
    Code VARCHAR(255) NOT NULL,
    Title VARCHAR(255) NOT NULL,
    DefaultValue TEXT NOT NULL
);

-- Theme

CREATE TABLE IF NOT EXISTS Theme (
    ID SERIAL PRIMARY KEY,
    PluginDefID integer REFERENCES PluginDef NOT NULL,
    Code VARCHAR(255) NOT NULL,
    Name VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS ThemeCssRule (
    ID SERIAL PRIMARY KEY,
    ThemeID integer REFERENCES Theme NOT NULL,
    CssRuleID integer REFERENCES CssRule NOT NULL
);

-- Users / Permissions

CREATE TABLE IF NOT EXISTS PermissionDef (
    ID SERIAL PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
    Description TEXT NOT NULL,
    Code VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS Role (
    ID SERIAL PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
    Code VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS RolePermission (
    ID SERIAL PRIMARY KEY,
    RoleID integer REFERENCES Role NOT NULL,
    PermissionDefID integer REFERENCES PermissionDef NOT NULL
);

CREATE TABLE IF NOT EXISTS Admin (
    ID SERIAL PRIMARY KEY,
    ClientID integer REFERENCES Client NOT NULL,
    RoleID integer REFERENCES Role NOT NULL,
    Name VARCHAR(255) NOT NULL,
    Password VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS AdminPermission (
    ID SERIAL PRIMARY KEY,
    AdminID integer REFERENCES Admin NOT NULL,
    HasPermission bit NOT NULL,
    PermissionDefID integer REFERENCES PermissionDef NOT NULL
);

-- Data Structs

CREATE TABLE IF NOT EXISTS DataTypeDef (
    ID SERIAL PRIMARY KEY,
    PluginDefID integer REFERENCES PluginDef NOT NULL,
    Name VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS DataTypeFieldType (
    ID SERIAL PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
    Code VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS DataTypeFieldDef (
    ID SERIAL PRIMARY KEY,
    DataTypeDefID integer REFERENCES DataTypeDef NOT NULL,
    DataTypeFieldTypeID integer REFERENCES DataTypeFieldType NOT NULL,
    Name VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS DataType (
    ID SERIAL PRIMARY KEY,
    ClientID integer REFERENCES Client NOT NULL,
    DataTypeDefID integer REFERENCES DataTypeDef NOT NULL
);

CREATE TABLE IF NOT EXISTS DataTypeField (
    ID SERIAL PRIMARY KEY,
    DataTypeID integer REFERENCES DataType NOT NULL,
    DataTypeFieldDefID integer REFERENCES DataTypeFieldDef NOT NULL,
    Value TEXT NOT NULL
);

-- Site

CREATE TABLE IF NOT EXISTS Site (
    ID SERIAL PRIMARY KEY,
    ClientID integer REFERENCES Client NOT NULL,
    Domain VARCHAR(255) NOT NULL,
    Name VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS SiteVersionStatus (
    ID SERIAL PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
    Code VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS SiteVersion (
    ID SERIAL PRIMARY KEY,
    SiteID integer REFERENCES Site NOT NULL,
    SiteVersionStatusID integer REFERENCES SiteVersionStatus NOT NULL,
    ThemeID integer REFERENCES Theme NOT NULL,
    Current boolean NOT NULL
);

-- Plugins

CREATE TABLE IF NOT EXISTS Plugin (
    ID SERIAL PRIMARY KEY,
    SiteVersionID integer REFERENCES SiteVersion NOT NULL,
    PluginDefID integer REFERENCES PluginDef NOT NULL
);

CREATE TABLE IF NOT EXISTS PluginSetting (
    ID SERIAL PRIMARY KEY,
    PluginID integer REFERENCES Plugin NOT NULL,
    PluginSettingDefID integer REFERENCES PluginSettingDef NOT NULL,
    Value TEXT NOT NULL
);

-- Pages

CREATE TABLE IF NOT EXISTS PageDef (
    ID SERIAL PRIMARY KEY,
    PluginDefID integer REFERENCES PluginDef NOT NULL,
    Name VARCHAR(255) NOT NULL,
    Code VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS Page (
    ID SERIAL PRIMARY KEY,
    PageDefID integer REFERENCES PageDef NOT NULL,
    SiteVersionID integer REFERENCES SiteVersion NOT NULL,
    Url VARCHAR(255) NOT NULL,
    Title VARCHAR(255) NOT NULL
);

-- Blocks

CREATE TABLE IF NOT EXISTS BlockContainerDef (
    ID SERIAL PRIMARY KEY,
    Code VARCHAR(255) NOT NULL,
    Title VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS BlockContainerAreaDef (
    ID SERIAL PRIMARY KEY,
    BlockContainerDefID integer REFERENCES BlockContainerDef NOT NULL,
    Code VARCHAR(255) NOT NULL,
    Title VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS BlockContainer (
    ID SERIAL PRIMARY KEY,
    PageID integer REFERENCES Page,
    BlockContainerDefID integer REFERENCES BlockContainerDef NOT NULL,
    DisplayOrder integer NOT NULL
);

CREATE TABLE IF NOT EXISTS BlockContainerCssRule (
    ID SERIAL PRIMARY KEY,
    BlockContainerID integer REFERENCES BlockContainer NOT NULL,
    CssRuleID integer REFERENCES CssRule NOT NULL
);

CREATE TABLE IF NOT EXISTS BlockContainerArea (
    ID SERIAL PRIMARY KEY,
    BlockContainerID integer REFERENCES BlockContainer NOT NULL,
    BlockContainerAreaDefID integer REFERENCES BlockContainerAreaDef NOT NULL
);

CREATE TABLE IF NOT EXISTS BlockDef (
    ID SERIAL PRIMARY KEY,
    PageDefID integer REFERENCES PageDef,
    PluginDefID integer REFERENCES PluginDef NOT NULL,
    Code VARCHAR(32) NOT NULL,
    Name VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS BlockTemplateDef (
    ID SERIAL PRIMARY KEY,
    BlockDefID integer REFERENCES BlockDef NOT NULL,
    Code VARCHAR(32) NOT NULL,
    Name VARCHAR(255) NOT NULL,
    Template TEXT NOT NULL,
    CompiledTemplate TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS BlockDefFunction (
    ID SERIAL PRIMARY KEY,
    BlockDefID integer REFERENCES BlockDef,
    Name VARCHAR(255) NOT NULL,
    Content TEXT NOT NULL,
    CompiledContent TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS BlockDefDataRequest (
    ID SERIAL PRIMARY KEY,
    BlockDefID integer REFERENCES BlockDef,
    DataTypeDefID integer REFERENCES DataTypeDef NOT NULL,
    ResultName VARCHAR(255) NOT NULL,
    FilterName VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS Block (
    ID SERIAL PRIMARY KEY,
    SiteVersionID integer REFERENCES SiteVersion NOT NULL,
    BlockDefID integer REFERENCES BlockDef NOT NULL,
    BlockTemplateDefID integer REFERENCES BlockTemplateDef NOT NULL,
    Title VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS BlockContainerAreaInstance(
    ID SERIAL PRIMARY KEY,
    BlockID integer REFERENCES Block NOT NULL,
    BlockContainerAreaID integer REFERENCES BlockContainerArea NOT NULL
);

CREATE TABLE IF NOT EXISTS BlockCssRule (
    ID SERIAL PRIMARY KEY,
    BlockID integer REFERENCES Block NOT NULL,
    CssRuleID integer REFERENCES CssRule NOT NULL
);

CREATE TABLE IF NOT EXISTS SettingType (
    ID SERIAL PRIMARY KEY,
    Code VARCHAR(255) NOT NULL,
    Title VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS BlockSettingDef (
    ID SERIAL PRIMARY KEY,
    BlockDefID integer REFERENCES BlockDef,
    SettingTypeID integer REFERENCES SettingType,
    Code VARCHAR(255) NOT NULL,
    Title VARCHAR(255) NOT NULL,
    DefaultValue TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS BlockSetting (
    ID SERIAL PRIMARY KEY,
    BlockID integer REFERENCES Block,
    BlockSettingDefID integer REFERENCES BlockSettingDef NOT NULL,
    Value TEXT NOT NULL
);