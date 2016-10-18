import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

import BaseBlockComponent from '../BaseBlockComponent.jsx';

export default class Other extends BaseBlockComponent {
    constructor(props) {
        super(props);

        this.state = {
            test: 15
        };
    }
}