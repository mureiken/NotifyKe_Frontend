import React, { Component } from 'react';
// import { authHeader } from '../helpers';
import { userService } from '../services';
import {
  Container, Col, Form, FormGroup, Label, Input, Alert,
  Button, Nav, NavLink, Breadcrumb, BreadcrumbItem 
} from 'reactstrap';

class ChangePasswordForm extends Component {
 constructor(props) {
        super(props);
        this.state = {
            new_password: '',
            new_password2: '',
            old_password: '',
            updating: false,
            error: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

  handleChange(e) {
      const { name, value } = e.target;
      this.setState({ [name]: value });
  }
    
  handleSubmit(e) {
      e.preventDefault();
      this.setState({ updating: true, submitted: false });;
      const { new_password, new_password2, old_password } = this.state;
      
      if (new_password !== new_password2) {
        this.setState({ error: 'Your new passwords do not match. Try again' });
      } else {
          const passwordChange = { 'old_password': old_password,'new_password':new_password }  
         let response = '';
         setTimeout(()=> {
             response  = userService.changePassword(passwordChange);
          },300);

         if (response === "success") {
            this.setState({ submitted: true })
         } else {
            this.setState({ error: response });
          }
       }
    }
  render() { 
    // const {loggingIn } = this.props;
     const { updating, submitted } = this.state
    // console.log(error);
    return (
      <Container className="slight-shadow">
        <Breadcrumb>
          <BreadcrumbItem><a href="/profile">Home</a></BreadcrumbItem>
          <BreadcrumbItem active>My Account</BreadcrumbItem>
         </Breadcrumb>
         <Nav>
            <NavLink href="myaccount">My Account</NavLink><NavLink disabled href="/changepassword">Change Password</NavLink> 
          </Nav>
        <Form name="form" onSubmit={this.handleSubmit}>
          <Col>
              <FormGroup>
                <Label for="oldPassword">Old Password</Label>
                <Input
                  type="password"
                  name="old_password"
                  id="oldpassword"
                  onChange={this.handleChange}
                  placeholder="********"
                />
               </FormGroup>
               <FormGroup>
                <Label for="NewPassword">New Password</Label>
                <Input
                  type="password"
                  name="new_password"
                  id="newpassword1"
                  onChange={this.handleChange}
                  placeholder="********"
                />
              </FormGroup>
              <FormGroup>
                <Label for="NewPassword2">Re-enter new password</Label>
                <Input
                  type="password"
                  name="new_password2"
                  id="newpassword2"
                  onChange={this.handleChange}
                  placeholder="********"
                />
            </FormGroup>
            <Button className="mt-2" outline color="secondary">Submit</Button>
            {updating && !submitted &&
                  <img alt="loading" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
              } 
              {submitted && 
                  <Alert color="info" className="col-sm-2 mt-2">Saved!</Alert>
                }
          </Col>
        </Form>
      </Container>
    );
  }
}


export default ChangePasswordForm; 