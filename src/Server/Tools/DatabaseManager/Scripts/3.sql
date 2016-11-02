/*
INSERT INTO Client(Name) VALUES('Attollo');
INSERT INTO Admin(ClientID, Name, Password, Salt) VALUES(1, 'attollo', 'password', 'salt');

INSERT INTO Site(ClientID, Domain, Name) VALUES(1, '127.0.0.1:8080', 'Public Site');
INSERT INTO SiteVersion(SiteID, Current) VALUES(1, TRUE);
INSERT INTO Page(PageDefID, SiteVersionID, Url, Title) VALUES(1, 1, '/home', 'home title');
INSERT INTO BlockContainer(PageID, BlockContainerDefID, DisplayOrder) VALUES(1, 2, 1);
INSERT INTO BlockContainerArea(BlockContainerID, BlockContainerAreaDefID) VALUES(1, 2);
INSERT INTO BlockContainerArea(BlockContainerID, BlockContainerAreaDefID) VALUES(1, 3);
INSERT INTO Block(BlockDefID, BlockContainerAreaID, Title, BlockTemplateDefID) VALUES(1, 1, 'Home Hero', 1);
INSERT INTO Page(PageDefID, SiteVersionID, Url, Title) VALUES(1, 1, '/price', 'price title');
INSERT INTO BlockContainer(PageID, BlockContainerDefID, DisplayOrder) VALUES(2, 1, 1);
INSERT INTO BlockContainerArea(BlockContainerID, BlockContainerAreaDefID) VALUES(2, 1);
INSERT INTO Block(BlockDefID, BlockContainerAreaID, Title, BlockTemplateDefID) VALUES(1, 3, 'Price Hero', 2);



INSERT INTO Client(Name) VALUES('Client 2');
INSERT INTO Admin(ClientID, Name, Password, Salt) VALUES(2, 'other', 'password', 'salt');

INSERT INTO Site(ClientID, Domain, Name) VALUES(2, 'localhost:8080', 'Stupid Blog');
INSERT INTO SiteVersion(SiteID, Current) VALUES(2, TRUE);
INSERT INTO Page(PageDefID, SiteVersionID, Url, Title) VALUES(1, 2, '/home', 'home title 2');
INSERT INTO BlockContainer(PageID, BlockContainerDefID, DisplayOrder) VALUES(3, 1, 1);
INSERT INTO BlockContainerArea(BlockContainerID, BlockContainerAreaDefID) VALUES(3, 1);
INSERT INTO Block(BlockDefID, BlockContainerAreaID, Title, BlockTemplateDefID) VALUES(2, 4, 'Home Hero', 3);
INSERT INTO Page(PageDefID, SiteVersionID, Url, Title) VALUES(1, 2, '/price', 'price title 2');
INSERT INTO BlockContainer(PageID, BlockContainerDefID, DisplayOrder) VALUES(4, 1, 1);
INSERT INTO BlockContainerArea(BlockContainerID, BlockContainerAreaDefID) VALUES(4, 1);
INSERT INTO Block(BlockDefID, BlockContainerAreaID, Title, BlockTemplateDefID) VALUES(2, 5, 'Price Hero', 4);


INSERT INTO BlockContainer(PageID, BlockContainerDefID, DisplayOrder) VALUES(1, 1, 2);
INSERT INTO BlockContainerArea(BlockContainerID, BlockContainerAreaDefID) VALUES(5, 1);
INSERT INTO BlockContainer(PageID, BlockContainerDefID, DisplayOrder) VALUES(1, 1, 3);
INSERT INTO BlockContainerArea(BlockContainerID, BlockContainerAreaDefID) VALUES(6, 1);
*/
INSERT INTO Client(Name) VALUES('Attollo');
INSERT INTO Admin(ClientID, Name, Password, Salt) VALUES(1, 'attollo', 'password', 'salt');