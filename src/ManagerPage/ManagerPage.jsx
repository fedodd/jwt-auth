import React from 'react';
import { connect } from "react-redux";

import { userService } from "@/_services";
import { divisionActions } from "../_actions";

class ManagerPage extends React.Component {

    componentDidMount() {
        this.props.dispatch(divisionActions.getDivision(this.props.user.division));
    }

    render() {
        const { division } = this.props;
        return (
            <div>
                <h1>Manage</h1>
                <p>This page can only be accessed by managers.</p>
                <div>
                    All users from secure (manager only) api end point:
                    {division.items &&
                        <ul>
                            {division.items.map(user =>
                                <li key={user.id}>{user.firstName} {user.lastName}</li>
                            )}
                        </ul>
                    }
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
	const { division, authentication } = state;
	const { user } = authentication;
	return {
		user,
		division
	};
}

const connectedManagerPage = connect(mapStateToProps)(ManagerPage);

export { connectedManagerPage as ManagerPage };
