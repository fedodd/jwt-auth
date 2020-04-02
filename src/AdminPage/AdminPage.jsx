import React from 'react';
import { connect } from "react-redux";

import { userService } from '@/_services';
import { userActions } from "../_actions";

class AdminPage extends React.Component {

	componentDidMount() {
		this.props.dispatch(userActions.getAll());
	}

	render() {
		const { user, users } = this.props;
		return (
			<div>
				<h1>Admin</h1>
				<p>This page can only be accessed by administrators.</p>
				<div>
					All users from secure (admin only) api end point:
					{users.items && (
						<ul>
							{users.items.map((user) => (
								<li key={user.id}>
									{user.firstName} {user.lastName}
								</li>
							))}
						</ul>
					)}
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
  const { users, authentication } = state;
  const { user } = authentication;
  return {
    user,
    users
  };
}

const connectedAdminPage = connect(mapStateToProps)(AdminPage);

export { connectedAdminPage as AdminPage };
