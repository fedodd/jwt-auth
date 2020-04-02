import { divisionConstants } from '../_constants';
import { divisionService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const divisionActions = {
    getDivision
};

function getDivision(division) {
    return dispatch => {
        dispatch(request());

        divisionService.getDivision(division)
            .then(
                users => dispatch(success(users)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: divisionConstants.GETDIVISION_REQUEST } }
    function success(users) { return { type: divisionConstants.GETDIVISION_SUCCESS, users } }
    function failure(error) { return { type: divisionConstants.GETDIVISION_FAILURE, error } }
}
