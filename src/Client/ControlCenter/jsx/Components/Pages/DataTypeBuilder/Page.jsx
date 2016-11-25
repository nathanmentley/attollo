import React from 'react';
import { Grid, Row, Col, Glyphicon, Button, FormGroup, FormControl, ControlLabel, HelpBlock } from 'react-bootstrap';

import ObjectUtils from '../../../Utils/ObjectUtils.jsx';

import BasePage from '../BasePage.jsx';

import DataTypeFieldDefService from '../../../Services/DataTypeFieldDefService.jsx';
import DataTypeFieldTypeService from '../../../Services/DataTypeFieldTypeService.jsx';

import DataTypeFieldList from './DataTypeFieldList.jsx';
import DataTypeFieldDefCreator from './DataTypeFieldDefCreator.jsx';
import DataTypeFieldDefEditor from './DataTypeFieldDefEditor.jsx';
import DataTypeCreator from './DataTypeCreator.jsx';
import DataTypeEditor from './DataTypeEditor.jsx';

export default class DataTypeBuilderPage extends BasePage {
    constructor(props) {
        super(props);

        this.state = {
            EditingDataTypeFieldDef: null,
            CreatingDataTypeFieldDef: null,
            EditingDataType: null,
            CreatingDataType: null,
            DataTypeFields: [],
            DataTypeFieldTypes: []
        };

        this.addNewDataType = this.addNewDataType.bind(this);
        this.addNewDataTypeField = this.addNewDataTypeField.bind(this);

        this.setEditingDataTypeField = this.setEditingDataTypeField.bind(this);
        this.setEditingDataType = this.setEditingDataType.bind(this);

        this.updateCreatingDataTypeFieldName = this.updateCreatingDataTypeFieldName.bind(this);
        this.updateEditingDataTypeFieldName = this.updateEditingDataTypeFieldName.bind(this);

        this.closeDataTypeFieldDefCreator = this.closeDataTypeFieldDefCreator.bind(this);
        this.closeDataTypeFieldDefEditor = this.closeDataTypeFieldDefEditor.bind(this);

        this.createDataTypeFieldDef = this.createDataTypeFieldDef.bind(this);
        this.saveDataTypeFieldDef = this.saveDataTypeFieldDef.bind(this);
    }
    
    componentDidMount() {
        var self = this;

        self.setPageTitle("Data Type Builder", () => {
            DataTypeFieldDefService.GetDataTypeFieldDefs(self.props.params.DataTypeDefID).then((res) => {
                self.setState({ DataTypeFields: res.data.data }, () => {
                    self.setBreadCrumbs([
                        {
                            title: "Dashboard",
                            url: "/"
                        },
                        {
                            title: "Data Types",
                            url: "/DataTypes"
                        }
                    ]);
                });
            });
            DataTypeFieldTypeService.GetDataTypeFieldTypes().then((res) => {
                self.setState({ DataTypeFieldTypes: res.data.data });
            });
        });
    }

    addNewDataTypeField() {
        this.setState({
            CreatingDataTypeFieldDef: {
                datatypedefid: this.props.params.DataTypeDefID,
                name: ''
            }
        });
    }

    addNewDataType() {
        this.setState({
            CreatingDataType: {

            }
        });
    }

    setEditingDataTypeField(field) {
        this.setState({ EditingDataTypeFieldDef: field });
    }

    setEditingDataType(record) {
        this.setState({ EditingDataType: record });
    }

    updateCreatingDataTypeFieldName(name) {
        var newDataTypeField = ObjectUtils.Clone(this.state.CreatingDataTypeFieldDef);
        newDataTypeField.name = name;
        this.setState({ CreatingDataTypeFieldDef: newDataTypeField });
    }

    updateEditingDataTypeFieldName(name) {
        var newDataTypeField = ObjectUtils.Clone(this.state.EditingDataTypeFieldDef);
        newDataTypeField.name = name;
        this.setState({ EditingDataTypeFieldDef: newDataTypeField });
    }

    closeDataTypeFieldDefCreator() {
        this.setState({ CreatingDataTypeFieldDef: null });
    }

    closeDataTypeFieldDefEditor() {
        this.setState({ EditingDataTypeFieldDef: null });
    }

    createDataTypeFieldDef() {
        var self = this;

        DataTypeFieldDefService.AddDataTypeDef(this.state.CreatingDataTypeFieldDef).then((addRes) => {
            DataTypeFieldDefService.GetDataTypeFieldDefs(self.props.params.DataTypeDefID).then((res) => {
                self.setState({ DataTypeFields: res.data.data, CreatingDataTypeFieldDef: null });
            });
        });
    }

    saveDataTypeFieldDef() {
        var self = this;

        DataTypeFieldDefService.SaveDataTypeFieldDef(this.state.EditingDataTypeFieldDef).then((addRes) => {
            DataTypeFieldDefService.GetDataTypeFieldDefs(self.props.params.DataTypeDefID).then((res) => {
                self.setState({ DataTypeFields: res.data.data, EditingDataTypeFieldDef: null });
            });
        });
    }

    _render() {
        var editingDataTypeFieldDef = <div />;
        if(this.state.EditingDataTypeFieldDef != null){
            editingDataTypeFieldDef = <DataTypeFieldDefEditor
                DataTypeFieldDef={this.state.editingDataTypeFieldDef}
                UpdateName={this.updateEditingDataTypeFieldName}
                CloseDataTypeFieldDefCreator={this.closeDataTypeFieldDefEditor}
                CreateDataTypeFieldDef={this.saveDataTypeFieldDef}
                SetEditingDataTypeField={this.setEditingDataTypeField}
            />;
        }

        var creatingDataTypeFieldDef = <div />;
        if(this.state.CreatingDataTypeFieldDef != null){
            creatingDataTypeFieldDef = <DataTypeFieldDefCreator
                DataTypeFieldDef={this.state.CreatingDataTypeFieldDef}
                UpdateName={this.updateCreatingDataTypeFieldName}
                CloseDataTypeFieldDefCreator={this.closeDataTypeFieldDefCreator}
                CreateDataTypeFieldDef={this.createDataTypeFieldDef}
            />
        }

        var editingDataType = <div />;
        if(this.state.EditingDataType != null){
            editingDataType = <DataTypeEditor
                DataType={this.state.editingDataType}
            />;
        }

        var creatingDataType = <div />;
        if(this.state.CreatingDataType != null){
            creatingDataType = <DataTypeCreator
                DataType={this.state.CreatingDataType}
            />
        }

        return (
            <div className="datatype-builder-page-root">
                <DataTypeFieldList
                    DataTypeFields={this.state.DataTypeFields}
                    SetEditingDataTypeField={this.setEditingDataTypeField}
                />

                {editingDataTypeFieldDef}
                {creatingDataTypeFieldDef}
                {editingDataType}
                {creatingDataType}

                <Row>
                    <Col xs={12} md={12} className="page-action-bar">
                        <div className="btn btn-primary pull-right" onClick={this.addNewDataTypeField}>
                            <Glyphicon glyph="plus" /> Add New Field
                        </div>
                        <div className="btn btn-primary pull-right" onClick={this.addNewDataType}>
                            <Glyphicon glyph="plus" /> Add New Record
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}