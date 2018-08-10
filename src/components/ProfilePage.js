import React from 'react';
import { Row } from 'reactstrap';
import { connect } from 'react-redux';
import { userActions } from '../actions';


import MyNotifications from './MyNotifications';

class ProfilePage extends React.Component {
   constructor(props) {
          super(props);
          const { username } = this.props;
          this.state = {
            current_username: username
          }
      }
  componentDidMount() {
         this.props.dispatch(userActions.getUserProfile(this.state.current_username));
    }
    render() {
        return (
	        <Row noGutters className="pt-2 pt-md-5 w-100 px-4 px-xl-0 position-relative">
              <h1>Hi {this.state.current_username}</h1>
	          <MyNotifications />
	        </Row>
        );
    }
}
function mapStateToProps(state) {
    const { profile, authentication } = state;
    const { user, username } = authentication;
    return {
        user,
        username,
        profile
    };
}
 
const connectedProfilePage = connect(mapStateToProps)(ProfilePage);
export default connectedProfilePage;