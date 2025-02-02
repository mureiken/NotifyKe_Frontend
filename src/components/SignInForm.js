import React, { Component } from 'react';
import {
   Col, Form,
  FormGroup, Label, Input, NavLink,
  Button
} from 'reactstrap';
import { connect } from 'react-redux';
import { userActions } from '../actions';
import './Form.css'

class SignInForm extends Component {
  constructor(props) {
        super(props);
        // reset login status
        this.props.dispatch(userActions.logout());

        this.state = {
            email: '',
            password: '',
            submitted: false,
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
        this.setState({ submitted: true });
        const { email, password } = this.state;
        
        const { dispatch } = this.props;
        if (email && password) {
            dispatch(userActions.login(email, password));
        }
        
    }
  componentDidUpdate() {
    setTimeout(()=> {  
        if (Object.keys(this.props.alert).length > 0 && this.props.alert.constructor === Object)  {
           this.setState({ error: 'Could not log you in. Email or password is incorrect' });
       }
    }, 300)
  }
    
  render() {
    const { loggingIn } = this.props;
    const { email, password, submitted, error } = this.state;
    return (
      <div className="col-9 mx-auto" >
        <Col className="slight-shadow">
        {error && <p><span className="alert alert-danger">{error}</span></p>}
        <h2>Sign In</h2>
        <Form name="form" onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label>Email</Label>
            <Input
              type="email"
              name="email"
              id="userEmail"
              placeholder="myemail@email.com"
              value={email} 
              onChange={this.handleChange}
            />
            {submitted && !email &&
              <div className="text-danger">Email is required</div>
            }
          </FormGroup>
          <FormGroup className={'form-group' + (submitted && !password ? ' has-error' : '')}>
            <Label for="examplePassword">Password</Label>
            <Input
              type="password"
              name="password"
              id="userPass"
              placeholder="********"
              value={password} 
              onChange={this.handleChange}
            />
            {submitted && !password &&
                 <div className="text-danger ">Password is required</div>
            }
          </FormGroup>
          <Button className="mt-2" outline color="secondary">Log in</Button> 
          {loggingIn &&
              <img alt="loading" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
          } 
           
        </Form>
        <Col style={{marginTop: 20, padding: 0}}>
          <NavLink href="/passwordrecovery" style={{margin: 0, padding: 0}} className="text-muted">Forgot Password?</NavLink>
        </Col>
      </Col>

    </div>
    );
  }
}

function mapStateToProps(state) {
    const { loggingIn } = state.authentication;
    return {
        loggingIn,
    };
}

const connectedSignInForm = connect(mapStateToProps)(SignInForm);
export default connectedSignInForm; 