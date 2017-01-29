import React from 'react';

import BaseComponent from '../BaseComponent.jsx';

import AssetEditor from './SettingEditors/AssetEditor.jsx';
import HtmlEditor from './SettingEditors/HtmlEditor.jsx';
import TextEditor from './SettingEditors/TextEditor.jsx';

export default class SettingEditor extends BaseComponent {
    constructor(props) {
        super(props);
    }

    render() {
        var editor = <div/>;

        switch(this.props.SettingTypeCode) {
            case 'html':
                editor = <HtmlEditor
                            Code={this.props.Code}
                            Title={this.props.Title}
                            DefaultValue={this.props.DefaultValue}
                            GetValueFromCode={this.props.GetValueFromCode}
                            SetValueForCode={this.props.SetValueForCode}
                        />;
                break;
            case 'image':
                editor = <AssetEditor
                            Code={this.props.Code}
                            Title={this.props.Title}
                            DefaultValue={this.props.DefaultValue}
                            GetValueFromCode={this.props.GetValueFromCode}
                            SetValueForCode={this.props.SetValueForCode}
                        />;
                break;
            case 'text':
            default:
                editor = <TextEditor
                            Code={this.props.Code}
                            Title={this.props.Title}
                            DefaultValue={this.props.DefaultValue}
                            GetValueFromCode={this.props.GetValueFromCode}
                            SetValueForCode={this.props.SetValueForCode}
                        />;
                break;
        }

        return editor;
    }
}