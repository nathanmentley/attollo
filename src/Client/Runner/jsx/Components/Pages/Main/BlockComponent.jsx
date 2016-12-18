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

    componentWillMount() {
        if (this.props.DataTypes) {
            if(this.props.Block.id in this.props.DataTypes) {
                this.setState(this.props.DataTypes[this.props.Block.id]);
            }
        } else if(window && window.__ATTOLLO_INITIAL_STATE__) {
            if(this.props.Block.id in window.__ATTOLLO_INITIAL_STATE__.BlockDataTypes) {
                this.setState(window.__ATTOLLO_INITIAL_STATE__.BlockDataTypes[this.props.Block.id]);
            }
        }
    }

    componentDidMount() {
        var self = this;

        //if we're client side, and the data isn't in __ATTOLLO_INITIAL_STATE__ then let's ajax it.
        if(this.props.Block && this.props.Block.BlockDef && this.props.Block.BlockDef.BlockDefDataRequests) {
            this.props.Block.BlockDef.BlockDefDataRequests.forEach((x) => {
                if(!(x.resultname in self.state) || (self.state[x.resultname] == null)) {
                    var newStateUpdates = {};

                    DataTypeService.GetDataTypes(x.datatypedefid, UrlUtils.GetValueFromQueryString(x.filtername))
                        .then((result) => {
                            newStateUpdates[x.resultname] = result;

                            self.setState(newStateUpdates)
                        })
                        .catch((err) => {
                            //LOG ERROR?
                        });
                }
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