import React from 'react';
import { Grid, Row, Col, Tabs, Tab } from 'react-bootstrap';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import ObjectUtils from '../../../Utils/ObjectUtils.jsx';

import BasePage from '../BasePage.jsx';

import BlockService from '../../../Services/BlockService.jsx';
import BlockDefService from '../../../Services/BlockDefService.jsx';
import BlockContainerDefService from '../../../Services/BlockContainerDefService.jsx';
import BlockContainerService from '../../../Services/BlockContainerService.jsx';
import BlockContainerAreaService from '../../../Services/BlockContainerAreaService.jsx';
import BlockCssRuleService from '../../../Services/BlockCssRuleService.jsx';
import BlockTemplateDefService from '../../../Services/BlockTemplateDefService.jsx';
import CssRuleDefService from '../../../Services/CssRuleDefService.jsx';
import SiteService from '../../../Services/SiteService.jsx';

import BlockSettingsEditor from './BlockSettingsEditor.jsx';
import BlockStyleEditor from './BlockStyleEditor.jsx';
import BlockEditor from './BlockEditor.jsx';
import BlockDefList from './BlockDefList.jsx';
import BlockContainerDefList from './BlockContainerDefList.jsx';
import BlockContainerList from './BlockContainerList.jsx';

export default DragDropContext(HTML5Backend)(
    class PageBuilderPage extends BasePage {
        constructor(props) {
            super(props);

            this.state = {
                EditingSettingsBlock: null,
                EditingStyleBlock: null,
                EditingStyleBlockStyles: null,
                EditingBlock: null,
                BlockContainers: [],

                BlockDefs: [],
                BlockContainerDefs: [],
                BlockTemplateDefs: [],
                CssRuleDefs: [],

                siteUrl: null,
                tabKey: 1
            };

            this.swapBlockContainers = this.swapBlockContainers.bind(this);
            this.addBlockContainer = this.addBlockContainer.bind(this);

            this.setEditingBlock = this.setEditingBlock.bind(this);
            this.setEditingSettingsBlock = this.setEditingSettingsBlock.bind(this);
            this.setEditingStyleBlock = this.setEditingStyleBlock.bind(this);
            
            this.updateEditingBlockTitle = this.updateEditingBlockTitle.bind(this);
            this.updateEditingBlockTemplate = this.updateEditingBlockTemplate.bind(this);
            
            this.updateBlockStyle = this.updateBlockStyle.bind(this);
            this.saveBlockStyle = this.saveBlockStyle.bind(this);

            this.updateBlockSetting = this.updateBlockSetting.bind(this);
            this.saveBlockSettings = this.saveBlockSettings.bind(this);

            this.handleTabChange = this.handleTabChange.bind(this);

            this.moveBlock = this.moveBlock.bind(this);
            this.addBlock = this.addBlock.bind(this);
            this.saveBlock = this.saveBlock.bind(this);
            this.deleteBlock = this.deleteBlock.bind(this);
        }
        
        componentDidMount() {
            var self = this;

            self.setPageTitle(
                <span>
                    Page builder
                </span>, 
                () => {
                    BlockContainerService.GetBlockContainers(this.props.params.PageID).then((res) => {
                        self.setState({ BlockContainers: res.data.data }, () => {
                            self.setBreadCrumbs([
                                {
                                    title: "Dashboard",
                                    url: "/"
                                },
                                {
                                    title: "Sites",
                                    url: "/Sites"
                                },
                                {
                                    title: "Site Versions",
                                    url: "/Sites/" + this.props.params.SiteVersionID
                                },
                                {
                                    title: "Pages",
                                    url: "/Sites/" + this.props.params.SiteVersionID + "/" + this.props.params.SiteID
                                }
                            ]);
                        }); 
                    });
                }
            );

            BlockDefService.GetBlockDefs(this.props.params.PageDefID).then((res) => {
                self.setState({ BlockDefs: res.data.data }); 
            });

            BlockContainerDefService.GetBlockContainerDefs().then((res) => {
                self.setState({ BlockContainerDefs: res.data.data }); 
            });

            BlockTemplateDefService.GetBlockTemplateDef().then((res) => {
                self.setState({ BlockTemplateDefs: res.data.data }); 
            });

            CssRuleDefService.GetCssRuleDefs().then((res) => {
                self.setState({ CssRuleDefs: res.data.data }); 
            });

            SiteService.GetSites().then((res) => {
                var site = res.data.data.find((x) => { return x.id == self.props.params.SiteID; });

                self.setState({ siteUrl: 'http://' + site.domain });
            });
        }

        handleTabChange(key) {
            this.setState({ tabKey: key }, () => {
                var frame = document.getElementsByClassName("page-builder-preview-frame");
                frame[0].src = frame[0].src;
            });
        }

        swapBlockContainers(containerId1, containerId2) {
            var self = this;

            var blockContainers = ObjectUtils.Clone(this.state.BlockContainers);
            var container1 = blockContainers.find((x) => { return x.id == containerId1;});
            var container2 = blockContainers.find((x) => { return x.id == containerId2;});

            var temporder = container1.displayorder;
            container1.displayorder = container2.displayorder;
            container2.displayorder = temporder;

            BlockContainerService.SaveBlockContainer(container1).then((res1) => {
                BlockContainerService.SaveBlockContainer(container2).then((res2) => {
                    BlockContainerService.GetBlockContainers(self.props.params.PageID).then((getResult) => {
                        self.setState({ BlockContainers: getResult.data.data }); 
                    });
                })
            });
        }

        addBlockContainer(code) {
            var self = this;

            BlockContainerService.AddBlockContainer(this.props.params.PageID, code).then((res) => {
                BlockContainerService.GetBlockContainers(this.props.params.PageID).then((getResult) => {
                    self.setState({ BlockContainers: getResult.data.data }); 
                });
            });
        }
        
        setEditingBlock(block) {
            if(block) {
                this.setState({ EditingBlock: ObjectUtils.Clone(block) });
            } else {
                this.setState({ EditingBlock: null });
            }
        }
        
        setEditingSettingsBlock(block) {
            if(block) {
                this.setState({ EditingSettingsBlock: ObjectUtils.Clone(block) });
            } else {
                this.setState({ EditingSettingsBlock: null });
            }
        }

        updateEditingBlockTitle(title) {
            var newBlock = ObjectUtils.Clone(this.state.EditingBlock);
            newBlock.title = title;
            this.setState({ EditingBlock: newBlock });
        }

        updateEditingBlockTemplate(blockTemplateId) {
            var newBlock = ObjectUtils.Clone(this.state.EditingBlock);
            newBlock.blocktemplatedefid = blockTemplateId;
            this.setState({ EditingBlock: newBlock });
        }

        saveBlockStyle() {
            var self = this;

            BlockCssRuleService.UpdateBlockCssRules(this.state.EditingStyleBlockStyles)
            .then((res) => {
                self.setState({ EditingStyleBlock: null,  EditingStyleBlockStyles: null });
            });
        }

        updateBlockStyle(code, value) {
            var self = this;
            var newBlockStyles = ObjectUtils.Clone(this.state.EditingStyleBlockStyles);

            if (newBlockStyles.some((x) => { return x.CssRule.CssRuleDef.code == code; })) {
                for(var i = 0; i < newBlockStyles.length; i++) {
                    var newBlockStyle = newBlockStyles[i];

                    if(newBlockStyle.CssRule.CssRuleDef.code == code) {
                        newBlockStyle.CssRule.value = value;
                    }
                }
            } else {
                newBlockStyles.push({
                    CssRule: {
                        CssRuleDef: {
                            code: code
                        },
                        value: value,
                        selector: '#' + self.state.EditingStyleBlock.id
                    },
                    blockid: self.state.EditingStyleBlock.id
                });
            }

            this.setState({ EditingStyleBlockStyles: newBlockStyles });
        }

        setEditingStyleBlock(block) {
            var self = this;

            if(block) {
                BlockCssRuleService.GetBlockCssRules(block.id)
                .then((res) => {
                    self.setState({
                        EditingStyleBlock: ObjectUtils.Clone(block),
                        EditingStyleBlockStyles: ObjectUtils.Clone(res.data.data)
                    });
                })
                .catch((err) => {
                    alert(JSON.stringify(err));
                });
            } else {
                this.setState({ EditingStyleBlock: null,  EditingStyleBlockStyles: null });
            }
            
        }

        updateBlockSetting(blockSettingDefId, value) {
            var newBlock = ObjectUtils.Clone(this.state.EditingSettingsBlock);

            var setting = newBlock.BlockSettings.find((x) => { return x.blocksettingdefid == blockSettingDefId; });

            if(setting) {
                setting.value = value;
            } else {
                newBlock.BlockSettings.push({
                    blocksettingdefid: blockSettingDefId,
                    blockid: this.state.EditingSettingsBlock.id,
                    value: value
                });
            }
            this.setState({ EditingSettingsBlock: newBlock });
        }

        saveBlockSettings() {
            var self = this;

            BlockService.SaveBlock(this.state.EditingSettingsBlock).then((saveResult) => {
                BlockContainerService.GetBlockContainers(self.props.params.PageID).then((res) => {
                    self.setState({ BlockContainers: res.data.data, EditingSettingsBlock: null });
                });
            });
        }

        saveBlock() {
            var self = this;

            BlockService.SaveBlock(this.state.EditingBlock).then((saveResult) => {
                BlockContainerService.GetBlockContainers(self.props.params.PageID).then((res) => {
                    self.setState({ BlockContainers: res.data.data, EditingBlock: null });
                });
            });
        }

        deleteBlock() {
            var self = this;

            BlockService.DeleteBlock(this.state.EditingBlock.id).then((saveResult) => {
                BlockContainerService.GetBlockContainers(self.props.params.PageID).then((res) => {
                    self.setState({ BlockContainers: res.data.data, EditingBlock: null });
                });
            });
        }

        moveBlock(blockContainerId, areaCode, block) {
            var self = this;
            var newBlock = ObjectUtils.Clone(block);

            BlockContainerAreaService.GetBlockContainerArea(blockContainerId, areaCode).then((getResult) => {
                newBlock.blockcontainerareaid = getResult.data.data.id;
                
                BlockService.SaveBlock(newBlock).then((saveResult) => {
                    BlockContainerService.GetBlockContainers(self.props.params.PageID).then((res) => {
                        self.setState({ BlockContainers: res.data.data });
                    });
                });
            });
        }

        addBlock(blockContainerId, areaCode, blockDefCode) {
            var self = this;

            var blockDefId = this.state.BlockDefs.find((x) => { return x.code == blockDefCode; }).id;
            var templateCode = this.state.BlockTemplateDefs.find((x) => { return x.blockdefid == blockDefId; }).code;

            BlockService.AddBlock(blockContainerId, areaCode, blockDefCode, templateCode).then((addResult) => {
                BlockContainerService.GetBlockContainers(self.props.params.PageID).then((res) => {
                    self.setState({ BlockContainers: res.data.data });
                });
            });
        }

        _render() {
            var self = this;
            
            var editingBlock = <div />;
            if(this.state.EditingBlock != null){
                editingBlock = <BlockEditor
                    Block={this.state.EditingBlock}
                    UpdateTitle={this.updateEditingBlockTitle}
                    UpdateTemplate={this.updateEditingBlockTemplate}
                    SaveBlock={this.saveBlock}
                    DeleteBlock={this.deleteBlock}
                    BlockTemplateDefs={this.state.BlockTemplateDefs}
                    SetEditingBlock={this.setEditingBlock}
                />;
            }

            var editingBlockSettings = <div />;
            if(this.state.EditingSettingsBlock != null){
                editingBlockSettings = <BlockSettingsEditor
                    Block={this.state.EditingSettingsBlock}
                    SaveBlockSettings={this.saveBlockSettings}
                    UpdateBlockSetting={this.updateBlockSetting}
                    SetEditingSettingsBlock={this.setEditingSettingsBlock}
                />;
            }

            var editingBlockStyle = <div />;
            if(this.state.EditingStyleBlock != null){
                editingBlockStyle = <BlockStyleEditor
                    CssRuleDefs={this.state.CssRuleDefs}
                    Block={this.state.EditingStyleBlock}
                    BlockStyles={this.state.EditingStyleBlockStyles}
                    SaveBlockStyle={this.saveBlockStyle}
                    UpdateBlockStyle={this.updateBlockStyle}
                    SetEditingStyleBlock={this.setEditingStyleBlock}
                />;
            }

            return (
                <Grid className="page-builder-page-root">
                    <Tabs activeKey={this.state.tabKey} onSelect={this.handleTabChange} id="controlled-tab-example">
                        <Tab eventKey={1} title="Page Editor">
                            <Row>
                                <Col xs={12} md={6}>
                                    <h5>Layouts</h5>
                                </Col>
                                <Col xs={12} md={6}>
                                    <h5>Widgets</h5>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={6} md={6}>
                                    <BlockContainerDefList
                                        BlockContainerDefs={this.state.BlockContainerDefs}
                                        AddBlockContainer={this.addBlockContainer}
                                    />
                                </Col>
                                <Col xs={6} md={6}>
                                    <BlockDefList
                                        BlockDefs={this.state.BlockDefs}
                                        AddBlock={this.addBlock}
                                    />
                                </Col>
                            </Row>

                            <Row>
                                <Col xs={12} md={12}>
                                    <h5>Page:</h5>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={12} md={12}>
                                    <BlockContainerList
                                        BlockContainers={this.state.BlockContainers}
                                        SwapBlockContainers={this.swapBlockContainers}
                                        SetEditingBlock={this.setEditingBlock}
                                        SetEditingSettingsBlock={this.setEditingSettingsBlock}
                                        SetEditingStyleBlock={this.setEditingStyleBlock}
                                        MoveBlock={this.moveBlock}
                                    />
                                </Col>
                            </Row>

                            {editingBlock}
                            {editingBlockSettings}
                            {editingBlockStyle}
                        </Tab>
                        <Tab eventKey={2} title="Page Settings">
                            <p>Page Settings</p>
                        </Tab>
                        <Tab eventKey={3} title="Page Preview">
                            <iframe className="page-builder-preview-frame" src={self.state.siteUrl} />
                        </Tab>
                    </Tabs>
                </Grid>
            );
        }
    }
);