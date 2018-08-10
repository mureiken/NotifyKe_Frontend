import React from 'react';
import logo from '../Logo.png';

import {
  Container, Row, Col, Collapse, Navbar, NavbarToggler, Nav,
  NavbarBrand, NavLink, NavItem
} from 'reactstrap';

export default class Header extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <header>
         <Navbar fixed="top" color="light" light expand="md" className="border-bottom border-gray bg-white" style={{ height: 80 }}>
           <Container>
            <Row noGutters className="position-relative w-100 align-items-center">
              <Col className="d-lg-flex justify-content-start">
                <NavbarBrand className="d-inline-block p-0" href="/" style={{ width: 200 }}>
                    <img src={logo} alt="logo" className="position-relative img-fluid" />
                </NavbarBrand>
                <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={this.state.isOpen} navbar>
                  <Nav className="ml-auto" navbar>
                    <NavItem className="d-flex align-items-center">
                      <NavLink className="font-weight-bold" href="/">About</NavLink>
                    </NavItem>
                    
                    <NavItem className="d-flex align-items-center">
                      <NavLink className="font-weight-bold" href="/">FAQs</NavLink>
                    </NavItem>

                     <NavItem className="d-flex align-items-center">
                      <NavLink className="font-weight-bold" href="/">Resources</NavLink>
                    </NavItem>

                    <NavItem className="d-flex align-items-center">
                      <NavLink className="font-weight-bold" href="/">Contacts</NavLink>
                    </NavItem>
                  </Nav>
                  </Collapse>
                </Col>
                <Col className="d-none d-lg-flex justify-content-end">
                  <a href="/login" color="info" className="btn btn-info  mr-3" role="button">Sign-in</a>
                  <a href="/" color="info" className='btn btn-outline-info' role="button">Sign-up</a>
                </Col> 
            </Row>
           </Container>
          </Navbar>
         </header>
    );
  }
}
