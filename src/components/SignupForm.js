import React, { Component } from 'react';
import {
  Container, Col, Row, Form,
  FormGroup, Label, Input,
  Button, fieldset, legend
} from 'reactstrap';
import { WTOMembers } from '../data/countries'
import { HSCodes } from '../data/hsCodes'
import { ICSCodes } from '../data/icsCodes'
import AsyncSelect from 'react-select/lib/Async';
import { connect } from 'react-redux';
import { userActions } from '../actions';
import './Form.css';

const getOptions = (data) => {
  return inputValue =>
    new Promise(resolve => {
      setTimeout(() => {
        resolve(data(inputValue));
      }, 1000);
    });
}

const HSpromiseOptions = getOptions(HSCodes);
const ICSpromiseOptions = getOptions(ICSCodes);
const WTOMembersPromiseOptions = getOptions(WTOMembers);


class SignupForm extends Component {
  constructor(props) {
        super(props);
        this.state = {
            name: '',
            value: '',
            email: '',
            password: '',
            countries: [],
            ics_products: [],
            hs_products: [],
            profile:{hs_products: '', ics_products: ''},
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
      
      const { email, password, countries, ics_products, hs_products} = this.state;
      let profile = {};
      const createArray = (array) => {
        let newArray =[];
        array.forEach(function (item) {
           newArray.push(item.value);
          });
        return newArray
      }

      const countryArray = createArray(countries);
      const icsArray = createArray(ics_products);
      const hsArray = createArray(hs_products);
      profile = {
        countries: countryArray,
        hs_products: hsArray,
        ics_products: icsArray
      }
      this.setState({profile: profile });
      if (this.props.alert)  {
        this.setState({error: 'User with this email already exists.'});
    }
      
      const { dispatch } = this.props;
      if (email && password) {
          dispatch(userActions.register(email, password, profile));
      }
      
    }
   
  render() { 
    const {loggingIn } = this.props;
    const { email, password, submitted, error } = this.state;
    console.log(error);
    return (
      <Container className="slight-shadow">
      {error && <p><span className="alert alert-warning">{error}</span></p>}
        <h3>Register for WTO-TBT Alerts</h3>
        <Form name="form" onSubmit={this.handleSubmit}>
          <Col>
            <FormGroup>
              <Label>Email</Label>
              <Input
                type="email"
                name="email"
                id="exampleEmail"
                placeholder="myemail@email.com"
                onChange={this.handleChange}
                value={email} 
              />
            </FormGroup>
            {submitted && !email &&
              <div className="text-danger">Email is required</div>
            }
          </Col>
          <Col>
            <FormGroup className={'form-group' + (submitted && !password ? ' has-error' : '')}>
              <Label for="examplePassword">Password</Label>
              <Input
                type="password"
                name="password"
                id="examplePassword"
                placeholder="********"
                onChange={this.handleChange}
              />
            </FormGroup>
            {submitted && !password &&
                 <div className="text-danger">Password is required</div>
            }
            <fieldset className="pref-fieldset">
              <legend className="pref-legend"><span className="glyphicon-class"></span>Filter preferences</legend>
               <FormGroup>
                <Label for="Countries">Countries</Label>
                <AsyncSelect
                  isMulti
                  cacheOptions 
                  defaultOptions
                  hasValues
                  name="countries" 
                  loadOptions={WTOMembersPromiseOptions}
                  onChange={(countries) => this.setState({ countries })}
                 />
              </FormGroup>
              <FormGroup>
                <Label for="icsCodes">ICS Codes</Label>
                <AsyncSelect
                  isMulti
                  cacheOptions 
                  defaultOptions
                  hasValues
                  name="ics_products" 
                  loadOptions={ICSpromiseOptions}
                  onChange={(ics_products) => this.setState({ ics_products })}
                 />
              </FormGroup>
               <FormGroup>
                <Label for="HSCodes">HS Codes</Label>
                <AsyncSelect
                  isMulti
                  cacheOptions 
                  defaultOptions
                  hasValues
                  name="hs_products" 
                  loadOptions={HSpromiseOptions}
                  onChange={(hs_products) => this.setState({ hs_products })}
                 />
              </FormGroup>
            </fieldset>
            <Button className="mt-2" outline color="secondary">Sign-Up</Button>
            {loggingIn &&
              <img alt="loading" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
          } 
          </Col>
          <Row className='mt-3 ml-3'>
            Are you already a user? <a href='/login' className='ml-1'>Login</a>
          </Row>
        </Form>
      </Container>
    );
  }
}

function mapStateToProps(state) {
    const { loggingIn } = state.authentication;
    return {
        loggingIn
    };
}

const connectedSignupForm = connect(mapStateToProps)(SignupForm);
export default connectedSignupForm; 