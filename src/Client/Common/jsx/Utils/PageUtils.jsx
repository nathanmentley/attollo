import { browserHistory, hashHistory } from 'react-router';

import DocumentUtils from './DocumentUtils.jsx';

export default class PageUtils {
    static GetHistory() {
        if(DocumentUtils.IsElectron()) {
            return hashHistory;
        } else {
            return browserHistory;
        }
    }

    static ChangePage(url) {
        if(DocumentUtils.IsElectron()) {
            hashHistory.push(url);
        } else {
            browserHistory.push(url);
        }
    }
}