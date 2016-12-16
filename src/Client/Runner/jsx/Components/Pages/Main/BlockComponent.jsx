import React from 'react';
import { browserHistory } from 'react-router';

import BaseComponent from '../../../../../Common/jsx/Components/BaseComponent.jsx';

import DataTypeService from '../../../Services/DataTypeService.jsx';
import UrlUtils from '../../../Utils/UrlUtils.jsx';

export default class BlockComponent extends BaseComponent {
    constructor(props) {
        super(props);
        var self = this;

        this.state = {
            Settings: this.getBlockSettings()
        };

        if(this.props.Block && this.props.Block.BlockDef && this.props.Block.BlockDef.BlockDefDataRequests) {
            this.props.Block.BlockDef.BlockDefDataRequests.forEach((x) => {
                self.state[x.resultname] = [];
            });
        }
        if(this.props.Block && this.props.Block.BlockDef && this.props.Block.BlockDef.BlockDefFunctions) {
            this.props.Block.BlockDef.BlockDefFunctions.forEach((x) => {
                var logic = eval("var f = function(){ return " + x.compiledcontent + ";}; f();");

                self[x.name] = logic.bind(this);
            });
        }

        this.goToPage = this.goToPage.bind(this);
        this.getBlockSettings = this.getBlockSettings.bind(this);
    }

    componentDidMount() {
        var self = this;

        if(this.props.Block && this.props.Block.BlockDef && this.props.Block.BlockDef.BlockDefDataRequests) {
            this.props.Block.BlockDef.BlockDefDataRequests.forEach((x) => {
                var newStateUpdates = {};

                DataTypeService.GetDataTypes(x.datatypedefid, UrlUtils.GetValueFromQueryString(x.filtername))
                .then((result) => {
                    newStateUpdates[x.resultname] = result;

                    self.setState(newStateUpdates)
                })
                .catch((err) => {
                    //LOG ERROR?
                });
            });
        }
    }

    goToPage(url) {
        browserHistory.push(url);
        
        this.props.UpdatePage(url);
    }

    getBlockSettings() {
        var ret = [];

        if(this.props.Block && this.props.Block.BlockDef && this.props.Block.BlockDef.BlockSettingDefs) {
            for(var i = 0; i < this.props.Block.BlockDef.BlockSettingDefs.length; i++) {
                var blockSettingDef = this.props.Block.BlockDef.BlockSettingDefs[i];
                ret[blockSettingDef.code] = blockSettingDef.defaultvalue;
            }

            if(this.props.Block.BlockSettings) {
                for(var i = 0; i < this.props.Block.BlockSettings.length; i++) {
                    var blockSetting = this.props.Block.BlockSettings[i];
                    ret[blockSetting.BlockSettingDef.code] = blockSetting.value;
                }
            }
        }

        return ret;
    }

    render() {
        var template = this.props.TemplateProcessor(this.props.Block.BlockTemplateDef.compiledtemplate);

        return template(this);
    }
}