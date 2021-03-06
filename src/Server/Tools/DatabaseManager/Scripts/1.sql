CREATE TABLE IF NOT EXISTS DatabaseVersion (
    ID SERIAL PRIMARY KEY,
    VersionID INT NOT NULL
);

CREATE TABLE IF NOT EXISTS DatabaseCodeVersion (
    ID SERIAL PRIMARY KEY,
    VersionID INT NOT NULL
);

CREATE TABLE IF NOT EXISTS Audit (
    ID SERIAL PRIMARY KEY,
    UserName TEXT NOT NULL,
    Action TEXT NOT NULL,
    ModelType TEXT NOT NULL,
    ModelID TEXT NULL,
    Data TEXT NOT NULL
);