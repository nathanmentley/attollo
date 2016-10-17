INSERT INTO BlockDef(Code, Name) VALUES('Html', 'Simple Html');
INSERT INTO BlockDef(Code, Name) VALUES('Other', 'Other Html');



INSERT INTO Client(Name) VALUES('Attollo');
INSERT INTO Admin(ClientID, Name, Password, Salt) VALUES(1, 'attollo', 'password', 'salt');

INSERT INTO Site(ClientID, Domain, Name) VALUES(1, 'nathans-mbp.hsd1.or.comcast.net:8080', 'Public Site');
INSERT INTO Page(SiteID, Url, Title) VALUES(1, '/home', 'home title');
INSERT INTO Block(BlockDefID, PageID, Title, Template) VALUES(1, 1, 'Home Hero', '<p>home</p>');
INSERT INTO Page(SiteID, Url, Title) VALUES(1, '/price', 'price title');
INSERT INTO Block(BlockDefID, PageID, Title, Template) VALUES(1, 2, 'Price Hero', '<p>price</p>');



INSERT INTO Client(Name) VALUES('Client 2');
INSERT INTO Admin(ClientID, Name, Password, Salt) VALUES(2, 'other', 'password', 'salt');

INSERT INTO Site(ClientID, Domain, Name) VALUES(2, 'localhost:8080', 'Stupid Blog');
INSERT INTO Page(SiteID, Url, Title) VALUES(2, '/home', 'home title 2');
INSERT INTO Block(BlockDefID, PageID, Title, Template) VALUES(2, 3, 'Home Hero', '<p>home 2</p>');
INSERT INTO Page(SiteID, Url, Title) VALUES(2, '/price', 'price title 2');
INSERT INTO Block(BlockDefID, PageID, Title, Template) VALUES(2, 4, 'Price Hero', '<p>price 2</p>');