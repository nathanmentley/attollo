import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

import BlockDefService from '../../../Services/BlockDefService.jsx';
import BlockService from '../../../Services/BlockService.jsx';

import BasePage from '../BasePage.jsx';

import BlockEditor from './BlockEditor.jsx';
import BlockDefList from './BlockDefList.jsx';
import BlockList from './BlockList.jsx';

export default class PageBuilderPage extends BasePage {
    constructor(props) {
        super(props);

        this.state = {
            EditingBlock: null,
            Blocks: [],
            BlockDefs: []

        };

        this.setEditingBlock = this.setEditingBlock.bind(this);
        this.addNewBlock = this.addNewBlock.bind(this);
    }
    
    componentDidMount() {
        var self = this;

        BlockService.GetBlocks(this.props.params.PageID).then((res) => {
            self.setState({ Blocks: res.data.data }); 
        });

        BlockDefService.GetBlockDefs().then((res) => {
            self.setState({ BlockDefs: res.data.data }); 
        });
    }


    setEditingBlock(block) {
        this.setState({ EditingBlock: block });
    }

    addNewBlock(code) {
        var self = this;

        BlockService.AddBlock(this.props.params.PageID, code).then((addResult) => {
            BlockService.GetBlocks(this.props.params.PageID).then((getResult) => {
                self.setState({ Blocks: getResult.data.data }); 
            });
        });
    }

    render() {
        var editingBlock = <div />;
        if(this.state.EditingBlock != null){
            editingBlock = <BlockEditor Block={this.state.EditingBlock} />;
        }

        return (
            <Grid>
                <Row>
                    <Col xs={12} md={12}>
                        <BlockDefList BlockDefs={this.state.BlockDefs}  AddNewBlock={this.addNewBlock} />
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