INSERT INTO BlockDef(Code, Name) VALUES('Html', 'Simple Html');
INSERT INTO BlockDef(Code, Name) VALUES('Other', 'Other Html');
INSERT INTO BlockDef(Code, Name) VALUES('SitePages', 'Site Navigation');

INSERT INTO BlockContainerDef(Code, Title) VALUES('OneCol', 'One Column');
INSERT INTO BlockContainerDef(Code, Title) VALUES('TwoCol', 'Two Column');
INSERT INTO BlockContainerDef(Code, Title) VALUES('ThreeCol', 'Three Column');
INSERT INTO BlockContainerDef(Code, Title) VALUES('FourCol', 'Four Column');



INSERT INTO Client(Name) VALUES('Attollo');
INSERT INTO Admin(ClientID, Name, Password, Salt) VALUES(1, 'attollo', 'password', 'salt');

INSERT INTO Site(ClientID, Domain, Name) VALUES(1, 'nathans-mbp.hsd1.or.comcast.net:8080', 'Public Site');
INSERT INTO Page(SiteID, Url, Title) VALUES(1, '/home', 'home title');
INSERT INTO BlockContainer(PageID, BlockContainerDefID, DisplayOrder) VALUES(1, 1, 1);
INSERT INTO Block(BlockDefID, BlockContainerID, Title, DisplayOrder, Template, CompiledTemplate) VALUES(1, 1, 'Home Hero', 1, '<p>home</p>', 'function anonymous(data,config/**/) {data = data || {};var nodes = (function jsx() {return React.createElement("p",null,"home");}).call(data),options = {"render":"renderToString"};if ("DOM" === options.render || !(config || {}).html) return nodes;return ReactDOM[options.render](nodes);}');
INSERT INTO Page(SiteID, Url, Title) VALUES(1, '/price', 'price title');
INSERT INTO BlockContainer(PageID, BlockContainerDefID, DisplayOrder) VALUES(2, 1, 1);
INSERT INTO Block(BlockDefID, BlockContainerID, Title, DisplayOrder, Template, CompiledTemplate) VALUES(1, 2, 'Price Hero', 1, '<p>price</p>', 'function anonymous(data,config/**/) {data = data || {};var nodes = (function jsx() {return React.createElement("p",null,"price");}).call(data),options = {"render":"renderToString"};if ("DOM" === options.render || !(config || {}).html) return nodes;return ReactDOM[options.render](nodes);}');



INSERT INTO Client(Name) VALUES('Client 2');
INSERT INTO Admin(ClientID, Name, Password, Salt) VALUES(2, 'other', 'password', 'salt');

INSERT INTO Site(ClientID, Domain, Name) VALUES(2, 'localhost:8080', 'Stupid Blog');
INSERT INTO Page(SiteID, Url, Title) VALUES(2, '/home', 'home title 2');
INSERT INTO BlockContainer(PageID, BlockContainerDefID, DisplayOrder) VALUES(3, 1, 1);
INSERT INTO Block(BlockDefID, BlockContainerID, Title, DisplayOrder, Template, CompiledTemplate) VALUES(2, 3, 'Home Hero', 1, '<p>home 2</p>', 'function anonymous(data,config/**/) {data = data || {};var nodes = (function jsx() {return React.createElement("p",null,"home 2");}).call(data),options = {"render":"renderToString"};if ("DOM" === options.render || !(config || {}).html) return nodes;return ReactDOM[options.render](nodes);}');
INSERT INTO Page(SiteID, Url, Title) VALUES(2, '/price', 'price title 2');
INSERT INTO BlockContainer(PageID, BlockContainerDefID, DisplayOrder) VALUES(4, 1, 1);
INSERT INTO Block(BlockDefID, BlockContainerID, Title, DisplayOrder, Template, CompiledTemplate) VALUES(2, 4, 'Price Hero', 1, '<p>price 2</p>', 'function anonymous(data,config/**/) {data = data || {};var nodes = (function jsx() {return React.createElement("p",null,"price 2");}).call(data),options = {"render":"renderToString"};if ("DOM" === options.render || !(config || {}).html) return nodes;return ReactDOM[options.render](nodes);}');