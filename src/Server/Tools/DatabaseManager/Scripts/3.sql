INSERT INTO BlockDef(Code, Name) VALUES('Html', 'Simple Html');
INSERT INTO BlockDef(Code, Name) VALUES('Other', 'Other Html');
INSERT INTO BlockDef(Code, Name) VALUES('SitePages', 'Site Navigation');

INSERT INTO BlockContainerDef(Code, Title) VALUES('OneCol', 'One Column');
INSERT INTO BlockContainerDef(Code, Title) VALUES('TwoCol', 'Two Column');
INSERT INTO BlockContainerDef(Code, Title) VALUES('ThreeCol', 'Three Column');
INSERT INTO BlockContainerDef(Code, Title) VALUES('FourCol', 'Four Column');

INSERT INTO BlockContainerAreaDef(BlockContainerDefID, Code, Title) VALUES(1, 'First', 'First');

INSERT INTO BlockContainerAreaDef(BlockContainerDefID, Code, Title) VALUES(2, 'First', 'First');
INSERT INTO BlockContainerAreaDef(BlockContainerDefID, Code, Title) VALUES(2, 'Second', 'Second');

INSERT INTO BlockContainerAreaDef(BlockContainerDefID, Code, Title) VALUES(3, 'First', 'First');
INSERT INTO BlockContainerAreaDef(BlockContainerDefID, Code, Title) VALUES(3, 'Second', 'Second');
INSERT INTO BlockContainerAreaDef(BlockContainerDefID, Code, Title) VALUES(3, 'Third', 'Third');

INSERT INTO BlockContainerAreaDef(BlockContainerDefID, Code, Title) VALUES(4, 'First', 'First');
INSERT INTO BlockContainerAreaDef(BlockContainerDefID, Code, Title) VALUES(4, 'Second', 'Second');
INSERT INTO BlockContainerAreaDef(BlockContainerDefID, Code, Title) VALUES(4, 'Third', 'Third');
INSERT INTO BlockContainerAreaDef(BlockContainerDefID, Code, Title) VALUES(4, 'Fourth', 'Fourth');



INSERT INTO Client(Name) VALUES('Attollo');
INSERT INTO Admin(ClientID, Name, Password, Salt) VALUES(1, 'attollo', 'password', 'salt');

INSERT INTO Site(ClientID, Domain, Name) VALUES(1, 'nathans-mbp.hsd1.or.comcast.net:8080', 'Public Site');
INSERT INTO SiteVersion(SiteID, Current) VALUES(1, TRUE);
INSERT INTO Page(SiteVersionID, Url, Title) VALUES(1, '/home', 'home title');
INSERT INTO BlockContainer(PageID, BlockContainerDefID, DisplayOrder) VALUES(1, 2, 1);
INSERT INTO BlockContainerArea(BlockContainerID, BlockContainerAreaDefID) VALUES(1, 2);
INSERT INTO BlockContainerArea(BlockContainerID, BlockContainerAreaDefID) VALUES(1, 3);
INSERT INTO Block(BlockDefID, BlockContainerAreaID, Title, Template, CompiledTemplate) VALUES(1, 1, 'Home Hero', '<p>home</p>', 'function anonymous(data,config/**/) {data = data || {};var nodes = (function jsx() {return React.createElement("p",null,"home");}).call(data),options = {"render":"renderToString"};if ("DOM" === options.render || !(config || {}).html) return nodes;return ReactDOM[options.render](nodes);}');
INSERT INTO Page(SiteVersionID, Url, Title) VALUES(1, '/price', 'price title');
INSERT INTO BlockContainer(PageID, BlockContainerDefID, DisplayOrder) VALUES(2, 1, 1);
INSERT INTO BlockContainerArea(BlockContainerID, BlockContainerAreaDefID) VALUES(2, 1);
INSERT INTO Block(BlockDefID, BlockContainerAreaID, Title, Template, CompiledTemplate) VALUES(1, 2, 'Price Hero', '<p>price</p>', 'function anonymous(data,config/**/) {data = data || {};var nodes = (function jsx() {return React.createElement("p",null,"price");}).call(data),options = {"render":"renderToString"};if ("DOM" === options.render || !(config || {}).html) return nodes;return ReactDOM[options.render](nodes);}');



INSERT INTO Client(Name) VALUES('Client 2');
INSERT INTO Admin(ClientID, Name, Password, Salt) VALUES(2, 'other', 'password', 'salt');

INSERT INTO Site(ClientID, Domain, Name) VALUES(2, 'localhost:8080', 'Stupid Blog');
INSERT INTO SiteVersion(SiteID, Current) VALUES(2, TRUE);
INSERT INTO Page(SiteVersionID, Url, Title) VALUES(2, '/home', 'home title 2');
INSERT INTO BlockContainer(PageID, BlockContainerDefID, DisplayOrder) VALUES(3, 1, 1);
INSERT INTO BlockContainerArea(BlockContainerID, BlockContainerAreaDefID) VALUES(3, 1);
INSERT INTO Block(BlockDefID, BlockContainerAreaID, Title, Template, CompiledTemplate) VALUES(2, 3, 'Home Hero', '<p>home 2</p>', 'function anonymous(data,config/**/) {data = data || {};var nodes = (function jsx() {return React.createElement("p",null,"home 2");}).call(data),options = {"render":"renderToString"};if ("DOM" === options.render || !(config || {}).html) return nodes;return ReactDOM[options.render](nodes);}');
INSERT INTO Page(SiteVersionID, Url, Title) VALUES(2, '/price', 'price title 2');
INSERT INTO BlockContainer(PageID, BlockContainerDefID, DisplayOrder) VALUES(4, 1, 1);
INSERT INTO BlockContainerArea(BlockContainerID, BlockContainerAreaDefID) VALUES(4, 1);
INSERT INTO Block(BlockDefID, BlockContainerAreaID, Title, Template, CompiledTemplate) VALUES(2, 4, 'Price Hero', '<p>price 2</p>', 'function anonymous(data,config/**/) {data = data || {};var nodes = (function jsx() {return React.createElement("p",null,"price 2");}).call(data),options = {"render":"renderToString"};if ("DOM" === options.render || !(config || {}).html) return nodes;return ReactDOM[options.render](nodes);}');