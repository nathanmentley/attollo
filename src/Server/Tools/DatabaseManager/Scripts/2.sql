CREATE TABLE IF NOT EXISTS Client (
    ID SERIAL PRIMARY KEY,
    Name VARCHAR(255) NOT NULL
);

--CSS

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
    Options TEXT NULL
);

CREATE TABLE IF NOT EXISTS CssRule (
    ID SERIAL PRIMARY KEY,
    CssRuleDefID integer REFERENCES CssRuleDef NOT NULL,
    Selector TEXT NOT NULL,
    Value TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS Theme (
    ID SERIAL PRIMARY KEY,
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

-- Site

CREATE TABLE IF NOT EXISTS Site (
    ID SERIAL PRIMARY KEY,
    ClientID integer REFERENCES Client NOT NULL,
    ThemeID integer REFERENCES Theme NOT NULL,
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
    Current boolean NOT NULL
);

-- Pages

CREATE TABLE IF NOT EXISTS PageDef (
    ID SERIAL PRIMARY KEY,
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

CREATE TABLE IF NOT EXISTS Block (
    ID SERIAL PRIMARY KEY,
    BlockDefID integer REFERENCES BlockDef,
    BlockContainerAreaID integer REFERENCES BlockContainerArea NOT NULL,
    BlockTemplateDefID integer REFERENCES BlockTemplateDef NOT NULL,
    Title VARCHAR(255) NOT NULL
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