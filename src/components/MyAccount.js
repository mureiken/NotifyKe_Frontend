import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userActions } from '../actions';
import { authHeader } from '../helpers';
import {
  Container, Col, Form, FormGroup, Label, Input, Alert,
  Button, Nav, NavLink, Breadcrumb, BreadcrumbItem 
} from 'reactstrap';

class MyAccountForm extends Component {
 constructor(props) {
        super(props);
        const { location, organisation } = this.props.profile.profile
        this.state = {
            email: '',
            first_name: '',
            last_name: '',
            location: location,
            organisation: organisation,
            updated_user_info: {},
            updating: false,
            submitted: false
        };

        this.props.dispatch(userActions.getUserDetails());
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
    	setTimeout(()=> {
	    	const { email, first_name, last_name } = this.props.user_info
	    	this.setState({
	    		email: email,
	            first_name: first_name,
	            last_name: last_name,
	    	})
	    	},100);	    
    }
   handleChange(e) {
      const { name, value } = e.target;
      this.setState({ [name]: value });
  }
  handleSubmit(e) {
  	  e.preventDefault();
  	  this.setState({ updating: true, submitted: false });
      const { email, first_name, last_name, location, organisation} = this.state;
      const profile = {
        location: location,
        organisation: organisation
      }
      const updated_user_details = {
      	   'email': email,
      	   'first_name':first_name,
      	   'last_name':last_name,
      	    profile
      }

    const  {Authorization}  = authHeader();
     setTimeout(()=> {
	    fetch(`${process.env.REACT_APP_DJANGO_API}/user/update/`, {
	        method: 'put',
	        headers: {Authorization, 'Content-Type': 'application/json'},
	        body: JSON.stringify(updated_user_details)
	      })
	    .then(response => response.json())
	    .then(this.setState({ submitted: true }))
      },300);
   }
  render() { 
    // const {loggingIn } = this.props;
    const { email, first_name, last_name, location, organisation, updating, submitted } = this.state
    // console.log(error);
    return (
      <Container className="slight-shadow">
        <div>
	      <Breadcrumb>
		      <BreadcrumbItem><a href="/profile">Home</a></BreadcrumbItem>
		      <BreadcrumbItem active>My Account</BreadcrumbItem>
	      </Breadcrumb>
	      <Nav>
	      	<NavLink disabled href="/myaccount">My Account</NavLink><NavLink href="/changepassword">Change Password</NavLink> 
	      </Nav>
	      </div>
	      <Form name="form" method='post' onSubmit={this.handleSubmit}>
	          <Col>
	            <FormGroup>
	              <Label>Email</Label>
	              <Input
	                type="email"
	                name="email"
	                id="exampleEmail"
	                disabled
	                value={email}
	              />
	            </FormGroup>
	          </Col>
	          <Col>
	            <FormGroup>
	              <Label for="examplePassword">Password</Label>
	              <Input
	                type="password"
	                name="password"
	                id="examplePassword"
	                placeholder="********"
	                disabled
	              />
	            </FormGroup>
	            <FormGroup>
	              <Label>First Name</Label>
	              <Input
	                type="text"
	                name="first_name"
	                id="first_name"
	                onChange={this.handleChange}
	                value={first_name}
	              />
	            </FormGroup>
	            <FormGroup>
	              <Label>Last Name</Label>
	              <Input
	                type="text"
	                name="last_name"
	                id="last_name"
	                onChange={this.handleChange}
	                value = {last_name}
	              />
	            </FormGroup>
	           <FormGroup>
	              <Label for="location">Location</Label>
	              <Input
	                type="text"
	                name="location"
	                id="location"
	                onChange={this.handleChange}
	                value={location}
	              />
	            </FormGroup>
	            <FormGroup>
	              <Label for="organisation">Organisation</Label>
	              <Input
	                type="text"
	                name="organisation"
	                id="organisation"
	                onChange={this.handleChange}
	                value={organisation}
	              />
	            </FormGroup>
	            <Button className="mt-2" color="secondary">Change my account info</Button>
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


function mapStateToProps(state) {
    const { userdetails, profile, authentication } = state;
    const { user } = authentication;
    const { user_info } = userdetails;

    return {
    	user,
        user_info,
        profile
    };
}
const connectedMyAccountForm = connect(mapStateToProps)(MyAccountForm);
export default connectedMyAccountForm;