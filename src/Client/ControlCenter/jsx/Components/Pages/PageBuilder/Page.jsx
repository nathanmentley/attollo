import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import ObjectUtils from '../../../Utils/ObjectUtils.jsx';

import BasePage from '../BasePage.jsx';

import BlockService from '../../../Services/BlockService.jsx';
import BlockDefService from '../../../Services/BlockDefService.jsx';
import BlockContainerDefService from '../../../Services/BlockContainerDefService.jsx';
import BlockContainerService from '../../../Services/BlockContainerService.jsx';
import BlockContainerAreaService from '../../../Services/BlockContainerAreaService.jsx';
import BlockTemplateDefService from '../../../Services/BlockTemplateDefService.jsx';

import BlockEditor from './BlockEditor.jsx';
import BlockDefList from './BlockDefList.jsx';
import BlockContainerDefList from './BlockContainerDefList.jsx';
import BlockContainerList from './BlockContainerList.jsx';

export default DragDropContext(HTML5Backend)(
    class PageBuilderPage extends BasePage {
        constructor(props) {
            super(props);

            this.state = {
                EditingBlock: null,
                BlockContainers: [],
                BlockDefs: [],
                BlockContainerDefs: [],
                BlockTemplateDefs: []
            };

            this.swapBlockContainers = this.swapBlockContainers.bind(this);
            this.addBlockContainer = this.addBlockContainer.bind(this);

            this.setEditingBlock = this.setEditingBlock.bind(this);
            this.updateEditingBlockTitle = this.updateEditingBlockTitle.bind(this);
            this.updateEditingBlockTemplate = this.updateEditingBlockTemplate.bind(this);

            this.moveBlock = this.moveBlock.bind(this);
            this.addBlock = this.addBlock.bind(this);
            this.saveBlock = this.saveBlock.bind(this);
            this.deleteBlock = this.deleteBlock.bind(this);
        }
        
        componentDidMount() {
            var self = this;

            self.setPageTitle("Page Builder", () => {
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
            });

            BlockDefService.GetBlockDefs(this.props.params.PageDefID).then((res) => {
                self.setState({ BlockDefs: res.data.data }); 
            });

            BlockContainerDefService.GetBlockContainerDefs().then((res) => {
                self.setState({ BlockContainerDefs: res.data.data }); 
            });

            BlockTemplateDefService.GetBlockTemplateDef().then((res) => {
                self.setState({ BlockTemplateDefs: res.data.data }); 
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

            return (
                <Grid className="page-builder-page-root">
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
                                MoveBlock={this.moveBlock}
                            />
                        </Col>
                    </Row>

                    {editingBlock}
                </Grid>
            );
        }
    }
);