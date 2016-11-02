INSERT INTO PageDef(Code, Name) VALUES('Landing', 'Landing Page');
INSERT INTO PageDef(Code, Name) VALUES('404Page', 'Error 404 Page');

INSERT INTO BlockDef(PageDefID, Code, Name) VALUES(null, 'Html', 'Raw Html');
INSERT INTO BlockDef(PageDefID, Code, Name) VALUES(null, 'Image', 'Image Block');
INSERT INTO BlockDef(PageDefID, Code, Name) VALUES(1, 'LandingBlock', 'Landing Block');
INSERT INTO BlockDef(PageDefID, Code, Name) VALUES(2, '404 Block', '404 Block');

INSERT INTO BlockTemplateDef(Code, Name, BlockDefID, Template, CompiledTemplate) VALUES('Html1', 'Html 1', 1, '<p>home</p>', 'function anonymous(data,config/**/) {data = data || {};var nodes = (function jsx() {return React.createElement("p",null,"home1");}).call(data),options = {"render":"renderToString"};if ("DOM" === options.render || !(config || {}).html) return nodes;return ReactDOM[options.render](nodes);}');
INSERT INTO BlockTemplateDef(Code, Name, BlockDefID, Template, CompiledTemplate) VALUES('Html2', 'Html 2', 1, '<p>home</p>', 'function anonymous(data,config/**/) {data = data || {};var nodes = (function jsx() {return React.createElement("p",null,"home2");}).call(data),options = {"render":"renderToString"};if ("DOM" === options.render || !(config || {}).html) return nodes;return ReactDOM[options.render](nodes);}');
INSERT INTO BlockTemplateDef(Code, Name, BlockDefID, Template, CompiledTemplate) VALUES('Html3', 'Html 3', 2, '<p>home</p>', 'function anonymous(data,config/**/) {data = data || {};var nodes = (function jsx() {return React.createElement("p",null,"home3");}).call(data),options = {"render":"renderToString"};if ("DOM" === options.render || !(config || {}).html) return nodes;return ReactDOM[options.render](nodes);}');
INSERT INTO BlockTemplateDef(Code, Name, BlockDefID, Template, CompiledTemplate) VALUES('Html4', 'Html 4', 2, '<p>home</p>', 'function anonymous(data,config/**/) {data = data || {};var nodes = (function jsx() {return React.createElement("p",null,"home4");}).call(data),options = {"render":"renderToString"};if ("DOM" === options.render || !(config || {}).html) return nodes;return ReactDOM[options.render](nodes);}');
INSERT INTO BlockTemplateDef(Code, Name, BlockDefID, Template, CompiledTemplate) VALUES('Html5', 'Html 5', 3, '<p>home</p>', 'function anonymous(data,config/**/) {data = data || {};var nodes = (function jsx() {return React.createElement("p",null,"home5");}).call(data),options = {"render":"renderToString"};if ("DOM" === options.render || !(config || {}).html) return nodes;return ReactDOM[options.render](nodes);}');
INSERT INTO BlockTemplateDef(Code, Name, BlockDefID, Template, CompiledTemplate) VALUES('Html6', 'Html 6', 3, '<p>home</p>', 'function anonymous(data,config/**/) {data = data || {};var nodes = (function jsx() {return React.createElement("p",null,"home6");}).call(data),options = {"render":"renderToString"};if ("DOM" === options.render || !(config || {}).html) return nodes;return ReactDOM[options.render](nodes);}');

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