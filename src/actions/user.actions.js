import { userConstants } from '../constants';
import { userService } from '../services';
import { alertActions } from './';
import { history } from '../helpers';

export const userActions = {
    login,
    logout,
    getUserProfile,
    register
};

function register(username, password,profile) {
    return dispatch => {
        dispatch(request({ username }));
        userService.register(username, password, profile)
        .then(userService.login(username, password))
            .then(
                user => { 
                    dispatch(success(user, username));
                    history.push('/profile');
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
        };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user, username) { return { type: userConstants.LOGIN_SUCCESS, user, username } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function login(username, password) {
    return dispatch => {
        dispatch(request({ username }));
        userService.login(username, password)
            .then(
                user => { 
                    dispatch(success(user, username));
                    history.push('/profile');
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );

    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user, username) { return { type: userConstants.LOGIN_SUCCESS, user, username } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function logout() {
    userService.logout();
    return { type: userConstants.LOGOUT };
}

function getUserProfile(username) {
    return dispatch => {
        dispatch(request({ username }));

        userService.getUserProfile(username)
            .then(
                profile => dispatch(success(profile)),
                error => dispatch(failure(error))
            );
    };

    function request(profile) { return { type: userConstants.GETUSERPROFILE_REQUEST } }
    function success(profile) { return { type: userConstants.GETUSERPROFILE_SUCCESS, profile } }
    function failure(error) { return { type: userConstants.GETUSERPROFILE_FAILURE, error } }
}