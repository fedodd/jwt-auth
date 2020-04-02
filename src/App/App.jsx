import React from 'react';
import { Router, Route, Link } from 'react-router-dom';
import { connect } from "react-redux";

import { alertActions } from "../_actions";
import { history, Role } from '@/_helpers';
import { authenticationService } from '@/_services';
import { PrivateRoute } from '@/_components';
import { HomePage } from '@/HomePage';
import { AdminPage } from '@/AdminPage';
import { ManagerPage } from '@/ManagerPage';
import { LoginPage } from '@/LoginPage';

class App extends React.PureComponent {
	constructor(props) {
		super(props);

		// this.state = {
		//     user: null,
		//     isAdmin: false,
		//     isManager: false
		// };
		const { dispatch } = this.props;
		history.listen((location, action) => {
			// clear alert on location change
			dispatch(alertActions.clear());
		});
	}

	logout() {
		authenticationService.logout();
		history.push("/login");
	}

	render() {
		const { user, alert } = this.props;
    const userRole = user ? user.role : null;

		return (
			<Router history={history}>
				<div>
					{alert.message && (
						<div className={`alert ${alert.type}`}>{alert.message}</div>
					)}
					{user && (
						<nav className="navbar navbar-expand navbar-dark bg-dark">
							<div className="navbar-nav">
								<Link to="/" className="nav-item nav-link">
									Home
								</Link>
								{userRole === Role.Admin && (
									<Link to="/admin" className="nav-item nav-link">
										Admin
									</Link>
								)}
								{userRole === Role.Manager && (
									<Link to="/manager" className="nav-item nav-link">
										Manage
									</Link>
								)}
								<a onClick={this.logout} className="nav-item nav-link">
									Logout
								</a>
							</div>
						</nav>
					)}
					<div className="jumbotron">
						<div className="container">
							<div className="row">
								<div className="col-md-6 offset-md-3">
									<PrivateRoute exact path="/" component={HomePage} />
									<PrivateRoute
										path="/admin"
										roles={[Role.Admin]}
										component={AdminPage}
									/>
									<PrivateRoute
										path="/manager"
										roles={[Role.Manager]}
										component={ManagerPage}
									/>
									<Route path="/login" component={LoginPage} />
								</div>
							</div>
						</div>
					</div>
				</div>
			</Router>
		);
	}
}

function mapStateToProps(state) {
  const { alert } = state;
  const { authentication } = state;
  const { user } = authentication;
  return {
    user,
    alert
  };

}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App };
