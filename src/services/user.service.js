import { authHeader } from '../helpers';

export const userService = {
    register,
    login,
    logout,
    getUserNotifications,
    getUserComments,
    RetrieveUserDetails,
    getUserProfile,
    changePassword
};


function register (email, password, profile) {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email, password, profile})
    };
    return fetch (`${process.env.REACT_APP_DJANGO_API}/user/create/`, requestOptions)
    .then(handleResponse)
    .then(user => {
            // login successful if there's a jwt token in the response
            if (user.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
            }

            return user;
        });
}

function login(email, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    };

    return fetch(`${process.env.REACT_APP_DJANGO_API}/user/obtain_token/`, requestOptions)
        .then(handleResponse)
        .then(user => {
            // login successful if there's a jwt token in the response
            if (user.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
            }
            return user;
        });
}


function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function getUserProfile(username) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${process.env.REACT_APP_DJANGO_API}/api/profile/`+ username, requestOptions)
    .then(handleResponse)
    .then(profile => {
        localStorage.setItem('profile', JSON.stringify(profile));
        return profile;
    });
}

function RetrieveUserDetails() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${process.env.REACT_APP_DJANGO_API}/user/update/` , requestOptions)
    .then(handleResponse)
    .then(profile => {
        localStorage.setItem('user_details', JSON.stringify(profile));
        return profile;
    });
}

function getUserNotifications(user_id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${process.env.REACT_APP_DJANGO_API}/api/notifications/`+ user_id, requestOptions)
    .then(handleResponse)
    .then(notifications => {
        localStorage.setItem('notifications', JSON.stringify(notifications));
        return notifications;
    });
}

function getUserComments(user_id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${process.env.REACT_APP_DJANGO_API}/api/comments/`+ user_id, requestOptions)
    .then(handleResponse)
    .then(comments => {
        localStorage.setItem('notifications', JSON.stringify(comments));
        return comments;
    });
}


function changePassword (passwordChange) {
    const  { Authorization }  = authHeader();
    fetch(`${process.env.REACT_APP_DJANGO_API}/user/update/`, {
        method: 'put',
        headers: {Authorization, 'Content-Type': 'application/json'},
        body: JSON.stringify(passwordChange)
      })
    .then(response => response.json())
    .then(response => {
         if (!response.ok) {
            if (response.status === 401) {
                return "You old password you entered is incorrect"
            }
        } else {
            return response
        }
    })
    .catch (err =>console.log(err));      
}

function handleResponse(response) {
    return response.json().then(data => {
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                window.location.reload(true);
                // console.log(response.status);
            }

            const error = (data && data.error) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}