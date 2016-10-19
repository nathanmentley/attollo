CREATE TABLE IF NOT EXISTS BlockDef (
    ID SERIAL PRIMARY KEY,
    Code VARCHAR(32) NOT NULL,
    Name VARCHAR(255) NOT NULL
);

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

CREATE TABLE IF NOT EXISTS BlockContainer (
    ID SERIAL PRIMARY KEY,
    PageID integer REFERENCES Page,
    BlockContainerDefID integer REFERENCES BlockContainer,
    DisplayOrder integer NOT NULL
);

CREATE TABLE IF NOT EXISTS Block (
    ID SERIAL PRIMARY KEY,
    BlockDefID integer REFERENCES BlockDef,
    BlockContainerID integer REFERENCES BlockContainer,
    Title VARCHAR(255) NOT NULL,
    DisplayOrder integer NOT NULL,
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