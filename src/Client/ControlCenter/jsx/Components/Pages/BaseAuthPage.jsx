import { browserHistory } from 'react-router';

import BasePage from './BasePage.jsx';
import AjaxService from '../../Services/AjaxService.jsx';

export default class BaseAuthPage extends BasePage {
    constructor(props) {
        super(props);

        if(!AjaxService.IsAuthenticated()) {
            browserHistory.push('/Login');
        }
    }
}