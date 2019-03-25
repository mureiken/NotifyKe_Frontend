import React, { Component } from 'react';
import {
   Col, Form,
  FormGroup, Input,
  Button
} from 'reactstrap';
import './Form.css'

class PasswordResetRequestForm extends Component {
  constructor(props) {
        super(props);
        this.state = {
            email: '',
            submitted: false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    passwordReset (email) {
    fetch(`${process.env.REACT_APP_DJANGO_API}/user/rest-auth/password/reset/`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(email)
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
        const { email } = this.state;
        if (email) {
           this.passwordReset({ email });
        }      
    }
  
  render() {
    const { email, submitted } = this.state;
    return (
      <div className="col-9 mx-auto" >
        <Col className="slight-shadow"> 
        {submitted && <p><span className="alert alert-info">Check your inbox to reset your password</span></p>}
        <h3>Password Recovery</h3>
        <Form name="form" onSubmit={this.handleSubmit}>
          <FormGroup>
            <Input
              type="email"
              name="email"
              id="userEmail"
              placeholder="myemail@email.com"
              value={email} 
              onChange={this.handleChange}
            />
            {submitted && !email &&
              <div className="text-danger">You must enter your email</div>
            }
          </FormGroup>
          <Button className="mt-2" outline color="secondary">Submit</Button>
        </Form>
      </Col>
    </div>
    );
  }
}

export default PasswordResetRequestForm

