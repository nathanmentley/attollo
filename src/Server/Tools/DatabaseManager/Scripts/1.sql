CREATE TABLE IF NOT EXISTS DatabaseVersion (
    ID SERIAL PRIMARY KEY,
    VersionID INT NOT NULL
);

CREATE TABLE IF NOT EXISTS DatabaseCodeVersion (
    ID SERIAL PRIMARY KEY,
    VersionID INT NOT NULL
);