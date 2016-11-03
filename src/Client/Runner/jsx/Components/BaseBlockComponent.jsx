import React from 'react';
import { browserHistory } from 'react-router';

import BaseComponent from '../../../Common/jsx/Components/BaseComponent.jsx';

export default class BaseBlockComponent extends BaseComponent {
    constructor(props) {
        super(props);

        this.state = {
            Settings: this.getBlockSettings()
        };

        this.goToPage = this.goToPage.bind(this);
        this.getBlockSettings = this.getBlockSettings.bind(this);
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
                    ret[blockSetting.code] = blockSetting.value;
                }
            }
        }

        return ret;
    }

    render() {
        var template = eval("var f = function(){ return " + this.props.Block.BlockTemplateDef.compiledtemplate + ";}; f();");

        return template(this);
    }
}