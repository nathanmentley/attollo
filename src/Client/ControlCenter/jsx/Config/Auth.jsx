import AjaxService from '../Services/AjaxService.jsx';

export default class Auth {
    static AuthRequired(nextState, replace) {
        if(!AjaxService.IsAuthenticated()){
            replace({
                pathname: '/Login',
                state: {
                    nextPathname: nextState.location.pathname
                }
            })
        }
    }
}