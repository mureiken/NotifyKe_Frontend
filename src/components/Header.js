import React from 'react';
import { connect } from 'react-redux';
import logo from '../Logo.png';
import Avatar from 'react-avatar';

import {
  Container, Row, Col, Collapse, Navbar, NavbarToggler, Nav,
  NavbarBrand, NavLink, NavItem, Badge
} from 'reactstrap';

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      total_notifications: 0
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

 getTotalNotifications() {
  let howMuch = 0;
  if (this.props.notifications.notifications != null) {
    this.props.notifications.notifications.map((values,i)=>
    {   
      howMuch = howMuch + this.props.notifications.notifications[i].notification.document.length;
      return howMuch;
    });
  }
  return howMuch;      
}

  render() {
    return (
      <header>
         <Navbar fixed="top" color="light" light expand="md" className="border-bottom border-gray bg-white" style={{ height: 80 }}>
           <Container>
            <Row noGutters className="position-relative w-100 align-items-center">
              <Col className="d-lg-flex justify-content-start">
              {
                this.props.loggedIn ?
                  <NavbarBrand className="d-inline-block p-0" href="/profile" style={{ width: 200 }}>
                      <img src={logo} alt="logo" className="position-relative img-fluid" />
                  </NavbarBrand>
                :
                  <NavbarBrand className="d-inline-block p-0" href="/" style={{ width: 200 }}>
                      <img src={logo} alt="logo" className="position-relative img-fluid" />
                  </NavbarBrand>
              }
                <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={this.state.isOpen} navbar>
                  <Nav className="ml-auto" navbar style={{background: '#fff'}}>
                    <NavItem className="d-flex align-items-center">
                      <NavLink className="font-weight-bold" href="/about">About</NavLink>
                    </NavItem>
                    
                    <NavItem className="d-flex align-items-center">
                      <NavLink className="font-weight-bold" href="/faq">FAQs</NavLink>
                    </NavItem>

                     <NavItem className="d-flex align-items-center">
                      <NavLink className="font-weight-bold" href="/resources">Resources</NavLink>
                    </NavItem>

                    <NavItem className="d-flex align-items-center">
                      <NavLink className="font-weight-bold" href="/contacts">Contacts</NavLink>
                    </NavItem>
                  </Nav>
                  </Collapse>
                </Col>  
                {
                  this.props.loggedIn ?
                    <Col className="d-none d-lg-flex justify-content-end">
                      <div className="d-inline-block mt-2 mr-2">
                        <NavLink className="font-weight-bold" href="/profile">
                          <Badge color="danger">{this.getTotalNotifications()} Notifications</Badge>
                        </NavLink>
                      </div>
                      <div className="d-inline-block" >
                          <NavLink className="font-weight-bold" href="/myaccount">
                             <Avatar skypeId="sitebase" size={40} round="20px" color='#808080' />
                          </NavLink>
                      </div>
                      <div className="d-inline-block mt-2">
                        <a href="/login" color="info" className="btn btn-info  mr-3" role="button">Sign-out</a>
                      </div>
                    </Col>
                  : 
                    <Col className="d-none d-lg-flex justify-content-end">
                      <a href="/login" color="info" className="btn btn-info  mr-3" role="button">Sign-in</a>
                      <a href="/" color="info" className='btn btn-outline-info' role="button">Sign-up</a>
                    </Col>
                 }
            </Row>
           </Container>
          </Navbar>
         </header>
    );
  }
}
function mapStateToProps(state) {
    const { userdetails, authentication, notifications } = state;
    const { loggedIn, username } = authentication;
    const { user_info } = userdetails;
    return {
        loggedIn,
        username,
        user_info,
        notifications
    };
}
const connectedHeader = connect(mapStateToProps)(Header);
export default connectedHeader;