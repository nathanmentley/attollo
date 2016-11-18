import React from 'react';

import CssRuleDefTypeCodes from '../../../../../Platform/Constants/CssRuleDefTypeCodes.js';

import BaseComponent from '../BaseComponent.jsx';

import ColorEditor from './CssRuleEditors/ColorEditor.jsx';
import DistanceEditor from './CssRuleEditors/DistanceEditor.jsx';
import ImageEditor from './CssRuleEditors/ImageEditor.jsx';
import SingleSelectListEditor from './CssRuleEditors/SingleSelectListEditor.jsx';

export default class CssRuleEditor extends BaseComponent {
    constructor(props) {
        super(props);
    }

    render() {
        var editor = <div/>;

        switch(this.props.CssRuleDef.CssRuleDefType.code) {
            case CssRuleDefTypeCodes.Color:
                editor = <ColorEditor
                            CssRuleDef={this.props.CssRuleDef}
                            GetValueFromCode={this.props.GetValueFromCode}
                            SetValueForCode={this.props.SetValueForCode}
                        />;
                break;
            case CssRuleDefTypeCodes.Distance:
                editor = <DistanceEditor
                            CssRuleDef={this.props.CssRuleDef}
                            GetValueFromCode={this.props.GetValueFromCode}
                            SetValueForCode={this.props.SetValueForCode}
                        />;
                break;
            case CssRuleDefTypeCodes.Image:
                editor = <ImageEditor
                            CssRuleDef={this.props.CssRuleDef}
                            GetValueFromCode={this.props.GetValueFromCode}
                            SetValueForCode={this.props.SetValueForCode}
                        />;
                break;
            case CssRuleDefTypeCodes.SingleSelectList:
                editor = <SingleSelectListEditor
                            CssRuleDef={this.props.CssRuleDef}
                            GetValueFromCode={this.props.GetValueFromCode}
                            SetValueForCode={this.props.SetValueForCode}
                        />;
                break;
            default:
                editor = <div/>;
                break;
        }

        return editor;
    }
}