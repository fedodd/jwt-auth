import { userConstants } from '../_constants';
import { userService, authenticationService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const userActions = {
    login,
    logout,
    getAll,
    getById
};

function login(username, password) {
    return dispatch => {
        dispatch(request({ username }));

        authenticationService.login(username, password)
            .then(
                user => {
                    dispatch(success(user));
                    history.push('/');
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function logout() {
    authenticationService.logout();
    return { type: userConstants.LOGOUT };
}

function getAll() {
    return dispatch => {
        dispatch(request());

        userService.getAll()
            .then(
                users => dispatch(success(users)),
                error => dispatch(failure(error))
            );
    };

    function request() {
        return { type: userConstants.GETALL_REQUEST } }
    function success(users) {
        return { type: userConstants.GETALL_SUCCESS, users } }
    function failure(error) {
        return { type: userConstants.GETALL_FAILURE, error } }
}


// don't know how use it cause in authentication block we have user object. just for example maybe
function getById(id) {
    return dispatch => {
        dispatch(request());

        userService.getById(id)
            .then(
                user => dispatch(success(user)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: userConstants.GETONE_REQUEST } }
    function success(user) { return { type: userConstants.GETONE_SUCCESS, user } }
    function failure(error) { return { type: userConstants.GETONE_FAILURE, error } }
}


// function getDivision() {
//     return dispatch => {
//         dispatch(request());

//         userService.getDivision()
//             .then(
//                 users => dispatch(success(users)),
//                 error => dispatch(failure(error))
//             );
//     };

//     function request() { return { type: userConstants.GETDIVISION_REQUEST } }
//     function success(users) { return { type: userConstants.GETDIVISION_SUCCESS, users } }
//     function failure(error) { return { type: userConstants.GETDIVISION_FAILURE, error } }
// }
