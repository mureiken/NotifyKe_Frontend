import React from 'react';
import { connect } from 'react-redux';
import { userActions } from '../actions';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';

import NotificationList from './NotificationList';
import CommentList from './CommentList';

class ProfilePage extends React.Component {
  constructor(props) {
          super(props);
          const { username } = this.props;
          this.toggle = this.toggle.bind(this);
          this.state = {
            current_username: username,
            activeTab: '1',
          }   
          this.props.dispatch(userActions.getUserProfile(this.state.current_username));   
      }
  toggle(tab) {
      if (this.state.activeTab !== tab) {
        this.setState({
          activeTab: tab
        });
      }
    }
  
  render() { 
    const { notifications, comments } = this.props;
    return (
         <div>
          <Nav tabs>
            <NavItem>
              <NavLink
                className={classnames({ active: this.state.activeTab === '1' })}
                onClick={() => { this.toggle('1'); }}
              >
                Profile
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: this.state.activeTab === '2' })}
                onClick={() => { 
                  setTimeout(()=>this.toggle('2'),150) 
                  }}
              >
                Notifications
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: this.state.activeTab === '3' })}
                onClick={() => { 
                  setTimeout(()=>this.toggle('3'),150) 
                  }}
              >
                Comments
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={this.state.activeTab} style={{position: 'relative', margin: '1.5em 0'}}>
            <TabPane tabId="1" className='pt-10'>
              <Row>
                <Col sm="6">
                  <Card body>
                    <CardTitle>Preferences</CardTitle>
                    <CardText>You can view and change your WTO TBT Notification preferences for Countries, ICS and HS products categories.</CardText>
                     <a href="/mypreferences" color="secondary" className="btn btn-secondary" role="button">View Preferences</a>
                  </Card>
                </Col>
                <Col sm="6">
                  <Card body>
                    <CardTitle>My Account</CardTitle>
                    <CardText>You can provide NotifyKenya with additional information about yourself or change existing ones.</CardText>
                    <a href="/myaccount" color="secondary" className="btn btn-secondary" role="button">View Account Details</a>
                  </Card>
                </Col>
              </Row>
            </TabPane>
            <TabPane tabId="2">
              <Row>
                <Col sm="12">
                  <NotificationList notifications={notifications} active={this.state.activeTab}  />
                </Col>
              </Row>
            </TabPane>
            <TabPane tabId="3">
              <Row>
                <Col sm="12">
                    <CommentList comments={comments} active={this.state.activeTab}  />
                </Col>
              </Row>
            </TabPane>
          </TabContent>
      </div>
    );
  }
}
function mapStateToProps(state) {
    const { profile, authentication, notifications, comments } = state;
    const { user, username } = authentication;
    return {
        user,
        username,
        profile,
        notifications, 
        comments
    };
}
const connectedProfilePage = connect(mapStateToProps)(ProfilePage);
export default connectedProfilePage;