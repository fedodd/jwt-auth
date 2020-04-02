import { divisionConstants } from '../_constants';

export function division(state = {}, action) {
  switch (action.type) {
    case divisionConstants.GETDIVISION_REQUEST:
      return {
        loading: true
      };
    case divisionConstants.GETDIVISION_SUCCESS:
      return {
        //maybe action.division?
        items: action.users
      };
    case divisionConstants.GETDIVISION_FAILURE:
      return {
        error: action.error
      };
    default:
      return state
  }
}
