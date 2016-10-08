INSERT INTO Site(Domain) VALUES('nathans-mbp.hsd1.or.comcast.net:8080');
INSERT INTO Page(SiteID, Url, Title) VALUES(1, '/home', 'home title');
INSERT INTO BlockDef(Code, Name) VALUES('HTML', 'Simple Html');
INSERT INTO BlockDef(Code, Name) VALUES('HTML2', 'Other Html');
INSERT INTO Block(BlockDefID, PageID, Template) VALUES(1, 1, '<p>template</p>');