import React, { Component } from 'react';
import {
   Col, Form,
  FormGroup, Input,
  Button
} from 'reactstrap';
import './Form.css'

class PasswordResetForm extends Component {
  constructor(props) {
        super(props);
        this.state = {
            new_password1: '',
            new_password2: '',
            submitted: false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    passwordReset(passwordResetData) {
      console.log('hit here');
      fetch('http://localhost:8000/user/rest-auth/password/reset/confirm/', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(passwordResetData)
      })
      .then(response => response.json())
      .then(response => {
         if (!response.ok) {
            if (response.status === 401) {
                return "Sorry, something went wrong"
            }
        } else {
            return response
        }
      })
      .catch (err =>console.log(err));      
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();        
        this.setState({ submitted: true });
        const { new_password1, new_password2 } = this.state;
        const  { uid, token } = this.props.match.params;
        const passwordResetData = { new_password1, new_password2, uid, token }
        this.passwordReset(passwordResetData);           
    }
  
  render() {
    const { new_password1, new_password2, submitted } = this.state;
    return (
      <div className="col-7 mx-auto" >
        <Col className="slight-shadow"> 
        {submitted && <p><span className="alert alert-info">Please login with your new password.</span></p>}
        <h3>Password Recovery</h3>
        <Form name="form" onSubmit={this.handleSubmit}>
          <FormGroup>
            <label>Password</label>
            <Input
              type="password"
              name="new_password1"
              id="new_password1"
              placeholder="*********"
              value={new_password1} 
              onChange={this.handleChange}
            />
            {submitted && !new_password2 &&
              <div className="text-danger">You must enter password</div>
            }
          </FormGroup>
          <FormGroup>
            <label> Re-enter password</label>
            <Input
              type="password"
              name="new_password2"
              id="new_password2"
              placeholder="*********"
              value={new_password2} 
              onChange={this.handleChange}
            />
            {submitted && !new_password2  && 
              <div className="text-danger">You must re -enter password</div>
            }
          </FormGroup>
          <Button className="mt-2" outline color="secondary">Submit</Button>
        </Form>
      </Col>
    </div>
    );
  }
}

export default PasswordResetForm

