import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

import ObjectUtils from '../../../Utils/ObjectUtils.jsx';

import BasePage from '../BasePage.jsx';

import BlockDefService from '../../../Services/BlockDefService.jsx';
import BlockContainerDefService from '../../../Services/BlockContainerDefService.jsx';
import BlockService from '../../../Services/BlockService.jsx';

import BlockEditor from './BlockEditor.jsx';
import BlockDefList from './BlockDefList.jsx';
import BlockContainerDefList from './BlockContainerDefList.jsx';
import BlockList from './BlockList.jsx';

export default class PageBuilderPage extends BasePage {
    constructor(props) {
        super(props);

        this.state = {
            EditingBlock: null,
            EditingBlockContainer: null,
            Blocks: [],
            BlockDefs: [],
            BlockContainerDefs: []
        };

        this.setEditingBlock = this.setEditingBlock.bind(this);
        this.updateEditingBlockTitle = this.updateEditingBlockTitle.bind(this);
        this.updateEditingBlockTemplate = this.updateEditingBlockTemplate.bind(this);

        this.addNewBlock = this.addNewBlock.bind(this);
        this.saveBlock = this.saveBlock.bind(this);
        this.deleteBlock = this.deleteBlock.bind(this);
    }
    
    componentDidMount() {
        var self = this;

        BlockService.GetBlocks(this.props.params.PageID).then((res) => {
            self.setState({ Blocks: res.data.data }); 
        });

        BlockDefService.GetBlockDefs().then((res) => {
            self.setState({ BlockDefs: res.data.data }); 
        });

        BlockContainerDefService.GetBlockContainerDefs().then((res) => {
            self.setState({ BlockContainerDefs: res.data.data }); 
        });
    }

    setEditingBlock(block) {
        this.setState({ EditingBlock: ObjectUtils.Clone(block) });
    }

    updateEditingBlockTitle(title) {
        var newBlock = ObjectUtils.Clone(this.state.EditingBlock);
        newBlock.title = title;
        this.setState({ EditingBlock: newBlock });
    }

    updateEditingBlockTemplate(template) {
        var newBlock = ObjectUtils.Clone(this.state.EditingBlock);
        newBlock.template = template;
        this.setState({ EditingBlock: newBlock });
    }

    saveBlock() {
        var self = this;

        BlockService.SaveBlock(this.state.EditingBlock).then((saveResult) => {
            BlockService.GetBlocks(this.props.params.PageID).then((getResult) => {
                self.setState({ Blocks: getResult.data.data }, () => {
                    //self.setEditingBlock(*somehow get update block*);
                }); 
            });
        });
    }

    deleteBlock() {
        var self = this;

        BlockService.DeleteBlock(this.state.EditingBlock.id).then((saveResult) => {
            BlockService.GetBlocks(this.props.params.PageID).then((getResult) => {
                self.setState({ Blocks: getResult.data.data, EditingBlock: null }); 
            });
        });
    }

    addNewBlock(code) {
        var self = this;

        BlockService.AddBlock(this.props.params.PageID, code).then((addResult) => {
            BlockService.GetBlocks(this.props.params.PageID).then((getResult) => {
                self.setState({ Blocks: getResult.data.data }, () => {
                    //self.setEditingBlock(*somehow get new block*);
                }); 
            });
        });
    }

    render() {
        var editingBlock = <div />;
        if(this.state.EditingBlock != null){
            editingBlock = <BlockEditor
                Block={this.state.EditingBlock}
                UpdateTitle={this.updateEditingBlockTitle}
                UpdateTemplate={this.updateEditingBlockTemplate}
                SaveBlock={this.saveBlock}
                DeleteBlock={this.deleteBlock}
            />;
        }

        return (
            <Grid>
                <Row>
                    <Col xs={6} md={6}>
                        <h3>Layouts</h3>
                    </Col>
                    <Col xs={6} md={6}>
                        <h3>Widgets</h3>
                    </Col>
                </Row>
                <Row>
                    <Col xs={6} md={6}>
                        <BlockContainerDefList BlockContainerDefs={this.state.BlockContainerDefs} AddNewBlockContainer={this.addNewBlock} />
                    </Col>
                    <Col xs={6} md={6}>
                        <BlockDefList BlockDefs={this.state.BlockDefs} AddNewBlock={this.addNewBlock} Target={this.EditingBlockContainer} />
                    </Col>
                </Row>

                <Row>
                    <Col xs={12} md={12}>
                        <h3>Page:</h3>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} md={3}>
                        <BlockList Blocks={this.state.Blocks} SetEditingBlock={this.setEditingBlock} />
                    </Col>

                    <Col xs={12} md={9}>
                        {editingBlock}
                    </Col>
                </Row>
            </Grid>
        );
    }
}