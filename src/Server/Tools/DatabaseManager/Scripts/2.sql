DROP TABLE IF EXISTS BlockSetting;
DROP TABLE IF EXISTS BlockSettingDef;
DROP TABLE IF EXISTS Block;
DROP TABLE IF EXISTS BlockDef;
DROP TABLE IF EXISTS BlockContainerArea;
DROP TABLE IF EXISTS BlockContainer;
DROP TABLE IF EXISTS BlockContainerAreaDef;
DROP TABLE IF EXISTS BlockContainerDef;
DROP TABLE IF EXISTS Page;
DROP TABLE IF EXISTS Site;
DROP TABLE IF EXISTS Admin;
DROP TABLE IF EXISTS Client;

CREATE TABLE IF NOT EXISTS Client (
    ID SERIAL PRIMARY KEY,
    Name VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS Admin (
    ID SERIAL PRIMARY KEY,
    ClientID integer REFERENCES Client,
    Name VARCHAR(255) NOT NULL,
    Password VARCHAR(255) NOT NULL,
    Salt VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS Site (
    ID SERIAL PRIMARY KEY,
    ClientID integer REFERENCES Client,
    Domain VARCHAR(255) NOT NULL,
    Name VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS Page (
    ID SERIAL PRIMARY KEY,
    SiteID integer REFERENCES Site,
    Url VARCHAR(255) NOT NULL,
    Title VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS BlockContainerDef (
    ID SERIAL PRIMARY KEY,
    Code VARCHAR(255) NOT NULL,
    Title VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS BlockContainerAreaDef (
    ID SERIAL PRIMARY KEY,
    BlockContainerDefID integer REFERENCES BlockContainerDef,
    Code VARCHAR(255) NOT NULL,
    Title VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS BlockContainer (
    ID SERIAL PRIMARY KEY,
    PageID integer REFERENCES Page,
    BlockContainerDefID integer REFERENCES BlockContainerDef,
    DisplayOrder integer NOT NULL
);

CREATE TABLE IF NOT EXISTS BlockContainerArea (
    ID SERIAL PRIMARY KEY,
    BlockContainerID integer REFERENCES BlockContainer,
    BlockContainerAreaDefID integer REFERENCES BlockContainerAreaDef
);

CREATE TABLE IF NOT EXISTS BlockDef (
    ID SERIAL PRIMARY KEY,
    Code VARCHAR(32) NOT NULL,
    Name VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS Block (
    ID SERIAL PRIMARY KEY,
    BlockDefID integer REFERENCES BlockDef,
    BlockContainerAreaID integer REFERENCES BlockContainerArea,
    Title VARCHAR(255) NOT NULL,
    Template TEXT NOT NULL,
    CompiledTemplate TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS BlockSettingDef (
    ID SERIAL PRIMARY KEY,
    BlockDefID integer REFERENCES BlockDef,
    Code VARCHAR(255) NOT NULL,
    Title VARCHAR(255) NOT NULL,
    DefaultValue TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS BlockSetting (
    ID SERIAL PRIMARY KEY,
    BlockID integer REFERENCES Block,
    BlockSettingDefID integer REFERENCES BlockSettingDef,
    Value TEXT NOT NULL
);