import config from 'config';
import { authHeader, handleResponse } from '@/_helpers';

export const divisionService = {
    getDivision
};

function getDivision(division) {
    const requestOptions = { method: 'GET', headers: authHeader() };

    return fetch(`${config.apiUrl}/divisions/${division}`, requestOptions).then(handleResponse);
}
