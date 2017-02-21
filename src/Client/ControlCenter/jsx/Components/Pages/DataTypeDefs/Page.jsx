import React from 'react';
import { Grid, Row, Col, Glyphicon } from 'react-bootstrap';

import ObjectUtils from '../../../Utils/ObjectUtils.jsx';

import BasePage from '../BasePage.jsx';

import DataTypeDefService from '../../../Services/DataTypeDefService.jsx';
import PluginDefService from '../../../Services/PluginDefService.jsx';

import DataTypeDefList from './DataTypeDefList.jsx';
import DataTypeDefEditor from './DataTypeDefEditor.jsx';
import DataTypeDefCreator from './DataTypeDefCreator.jsx';

export default class DataTypeDefsPage extends BasePage {
    constructor(props) {
        super(props);

        this.state = {
            EditingDataType: null,
            CreatingDataType: null,
            DataTypeDefs: [],
            PluginDef: null
        };

        this.setEditingDataType = this.setEditingDataType.bind(this);
        this.updateEditingDataTypeName = this.updateEditingDataTypeName.bind(this);

        this.saveDataType = this.saveDataType.bind(this);
        this.deleteDataType = this.deleteDataType.bind(this);

        this.updateCreatingDataTypeName = this.updateCreatingDataTypeName.bind(this);

        this.createDataType = this.createDataType.bind(this);

        this.addNewDataType = this.addNewDataType.bind(this);
        this.closeDataTypeCreator = this.closeDataTypeCreator.bind(this);
    }
    
    componentDidMount() {
        var self = this;

        self.setPageTitle("Data Types", () => {
            DataTypeDefService.GetDataTypeDefs().then((res) => {
                self.setState({ DataTypeDefs: res.data.data.filter((x) => { return x.plugindefid == this.props.params.PluginDefID; }) }, () => {
                    self.setBreadCrumbs([
                        {
                            title: "Dashboard",
                            url: "/"
                        },
	                    {
		                    title: "Plugins",
		                    url: "/PluginDefs"
	                    }
                    ]);
                });
            });
            PluginDefService.GetPluginDefs().then((res) => {
                self.setState({
                    PluginDef: res.data.data.filter((x) => { return x.id == this.props.params.PluginDefID; })[0]
                });
            });
        });
    }

    setEditingDataType(dataType) {
        if(dataType) {
            this.setState({ EditingDataType: ObjectUtils.Clone(dataType) });
        } else {
            this.setState({ EditingDataType: null });
        }
    }

    updateEditingDataTypeName(name) {
        var newDataType = ObjectUtils.Clone(this.state.EditingDataType);
        newDataType.name = name;
        this.setState({ EditingDataType: newDataType });
    }

    saveDataType() {
        var self = this;

        DataTypeDefService.SaveDataTypeDef(this.state.EditingDataType).then((saveResult) => {
            DataTypeDefService.GetDataTypeDefs().then((res) => {
                self.setState({ DataTypeDefs: res.data.data.filter((x) => { return x.plugindefid == this.props.params.PluginDefID; }), EditingDataType: null });
            });
        });
    }

    deleteDataType() {
        var self = this;

        DataTypeDefService.DeleteDataTypeDef(this.state.EditingDataType.id).then((saveResult) => {
            DataTypeDefService.GetDataTypeDefs().then((res) => {
                self.setState({ DataTypeDefs: res.data.data.filter((x) => { return x.plugindefid == this.props.params.PluginDefID; }), EditingDataType: null });
            });
        });
    }

    updateCreatingDataTypeName(name) {
        var newDataType = ObjectUtils.Clone(this.state.CreatingDataType);
        newDataType.name = name;
        this.setState({ CreatingDataType: newDataType });
    }

    createDataType() {
        var self = this;

        DataTypeDefService.AddDataTypeDef(this.state.PluginDef.code, this.state.CreatingDataType).then((addRes) => {
            DataTypeDefService.GetDataTypeDefs().then((res) => {
                self.setState({ DataTypeDefs: res.data.data.filter((x) => { return x.plugindefid == this.props.params.PluginDefID; }), CreatingDataType: null });
            });
        });
    }

    addNewDataType() {
        this.setState({
            CreatingDataType: {
                name: ''
            }
        });
    }

    closeDataTypeCreator() {
        this.setState({ CreatingDataType: null });
    }

    _render() {
        var editingDataTypeDef = <div />;
        if(this.state.EditingDataType != null){
            editingDataTypeDef = <DataTypeDefEditor
                DataTypeDef={this.state.EditingDataType}
                UpdateName={this.updateEditingDataTypeName}
                SaveDataType={this.saveDataType}
                DeleteDataType={this.deleteDataType}
                SetEditingDataType={this.setEditingDataType}
            />;
        }

        var creatingDataTypeDef = <div />;
        if(this.state.CreatingDataType != null){
            creatingDataTypeDef = <DataTypeDefCreator
                DataTypeDef={this.state.CreatingDataType}
                UpdateName={this.updateCreatingDataTypeName}
                CreateDataType={this.createDataType}
                CloseDataTypeCreator={this.closeDataTypeCreator}
            />
        }

        return (
            <div>
                <Row>
                    <Col xs={12} md={12}>
                        <DataTypeDefList
                            PluginDefID={this.props.params.PluginDefID}
                            DataTypeDefs={this.state.DataTypeDefs}
                            SetEditingDataType={this.setEditingDataType}
                        />
                    </Col>
                    
                    {editingDataTypeDef}
                    {creatingDataTypeDef}
                </Row>

                <Row>
                    <Col xs={12} md={12} className="page-action-bar">
                        <div className="btn btn-primary pull-right" onClick={this.addNewDataType}>
                            <Glyphicon glyph="plus" /> Add New Data Type
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}