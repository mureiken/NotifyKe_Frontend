import { userConstants } from '../constants';
import { userService } from '../services';
import { alertActions } from './';
import { history } from '../helpers';

export const userActions = {
    login,
    logout,
    getUserProfile,
    getUserDetails,
    getUserNotifications,
    getUserComments,
    register,
    passwordReset
};

function register(username, password,profile) {
    return dispatch => {
        dispatch(request({ username }));
        userService.register(username, password, profile)
            .then(
                user => { 
                    const username = user.email;
                    dispatch(success(user, username));
                    history.push('/login');
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
        };

    function request(user) { return { type: userConstants.REGISTRATION_REQUEST, user } }
    function success(user, username) { return { type: userConstants.REGISTRATION_SUCCESS, user, username } }
    function failure(error) { return { type: userConstants.REGISTRATION_FAILURE, error } }
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


function passwordReset(email) {
    return dispatch => {
        dispatch(request({ email }));
        userService.passwordReset(email)
            .then(
                detail => {
                    dispatch(success(detail));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
     }

    function request(username) { return { type: userConstants.PASSWORD_RESET, username } }
    function success(username) { return { type: userConstants.PASSWORD_RESET_SUCCESS, username } }
    function failure(error) { return { type: userConstants.PASSWORD_RESET_FAILURE, error } }
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
                profile => {
                    dispatch(success(profile))
                    setTimeout(()=> 
                    dispatch(getUserNotifications(profile.user_id)), 1000);
                    setTimeout(()=> 
                    dispatch(getUserComments(profile.user_id)), 1000);
                },
                error => dispatch(failure(error)),
            );
                 
    };

    function request(profile) { return { type: userConstants.GETUSERPROFILE_REQUEST } }
    function success(profile) { return { type: userConstants.GETUSERPROFILE_SUCCESS, profile } }
    function failure(error) { return { type: userConstants.GETUSERPROFILE_FAILURE, error } }
}

function getUserNotifications(username) {
    return dispatch => {
        dispatch(request({ username }));

        userService.getUserNotifications(username)
            .then(
                notifications => dispatch(success(notifications)),
                error => dispatch(failure(error))
            );
    };

    function request(notifications) { return { type: userConstants.GETUSERNOTIFICATIONS_REQUEST } }
    function success(notifications) { return { type: userConstants.GETUSERNOTIFICATIONS_SUCCESS, notifications } }
    function failure(error) { return { type: userConstants.GETUSERNOTIFICATIONS_FAILURE, error } }
}

function getUserComments(username) {
    return dispatch => {
        dispatch(request({ username }));

        userService.getUserComments(username)
            .then(
                comments => dispatch(success(comments)),
                error => dispatch(failure(error))
            );
    };

    function request(comments) { return { type: userConstants.GETUSERCOMMENTS_REQUEST } }
    function success(comments) { return { type: userConstants.GETUSERCOMMENTS_SUCCESS, comments } }
    function failure(error) { return { type: userConstants.GETUSERCOMMENTS_FAILURE, error } }
}

function getUserDetails() {
    return dispatch => {
         dispatch(request());
         userService.RetrieveUserDetails()
            .then(
                user_information => {
                    dispatch(success(user_information))
                },
                error => dispatch(failure(error)),
            );
                 
    };

    function request(user_information) { return { type: userConstants.GETUSERDETAILS_REQUEST } }
    function success(user_information) { return { type: userConstants.GETUSERDETAILS_SUCCESS, user_information } }
    function failure(error) { return { type: userConstants.GETUSERDETAILS_FAILURE, error } }
}