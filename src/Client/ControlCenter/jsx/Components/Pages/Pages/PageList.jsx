import React from 'react';
import { Table, DropdownButton, MenuItem } from 'react-bootstrap';

import BaseComponent from '../../BaseComponent.jsx';

export default class PageList extends BaseComponent {
    constructor(props) {
        super(props);

        this.goToPageBuilder = this.goToPageBuilder.bind(this);
        this.setEditingPage = this.setEditingPage.bind(this);
    }

    goToPageBuilder(pageId) {
        this.goToPage("/Sites/" + this.props.SiteID + "/" + this.props.SiteVersionID + "/" + pageId);
    }

    setEditingPage(page) {
        this.props.SetEditingPage(page);
    }

    render() {
        var self = this;

        return (
            <Table striped bordered condensed hover>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>URL</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.props.Pages.map((x) => {
                            return (
                                <tr key={x.id}>
                                    <td onClick={() => { self.goToPageBuilder(x.id); }}>{x.title}</td>
                                    <td onClick={() => { self.goToPageBuilder(x.id); }}>{x.url}</td>
                                    <td>
                                        <DropdownButton title="Actions" id={x.id + '-action-button'}>
                                            <MenuItem eventKey="1" onClick={() => { self.setEditingPage(x); }}>
                                                Edit
                                            </MenuItem>
                                        </DropdownButton>
                                    </td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </Table>
        );
    }
}