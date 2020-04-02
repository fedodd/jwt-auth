import React from 'react';
import { connect } from "react-redux";

import { userActions } from "../_actions";
import { userService, authenticationService } from '@/_services';

class HomePage extends React.Component {

    componentDidMount() {
        //console.log(this.props.user);

        this.props.dispatch(userActions.getById(this.props.user.id));
    }

    render() {
        const { user } = this.props;
        return (
            <div>
                <h1>Home</h1>
                <p>You're logged in with React & JWT!!</p>
                <p>Your role is: <strong>{user.role}</strong>.</p>
                <p>This page can be accessed by all authenticated users.</p>
                <div>
                    Current user from secure api end point:
                    <ul>
                        <li>{user.firstName} {user.lastName} - {user.division}</li>
                    </ul>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
  const { authentication } = state;
  const { user } = authentication;
  return {
    user
  };
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };
