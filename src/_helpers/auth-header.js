import { authenticationService } from '@/_services';

export function authHeader() {
    // return authorization header with jwt token
    //const currentUser = authenticationService.currentUserValue;
    let user = JSON.parse(localStorage.getItem('user'));

    if (user && user.token) {
        return { Authorization: `Bearer ${user.token}` };
    } else {
        return {};
    }
}
