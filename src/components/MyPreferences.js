import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { userActions } from '../actions';
import { authHeader } from '../helpers';
import AsyncSelect from 'react-select/lib/Async';
import { WTOMembers } from '../data/countries';
import { HSCodes } from '../data/hsCodes';
import { ICSCodes } from '../data/icsCodes';
import {
  Container, Col, Form, FormGroup, Label, Alert,
  UncontrolledAlert, Button, Breadcrumb, BreadcrumbItem,
  Card, CardTitle, Row
} from 'reactstrap';

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

class MyPreferences extends Component {
 constructor(props) {
        super(props);
        const { countries, hs_products, ics_products } = this.props.profile.profile
        this.state = {
        	email: '',
            countries: countries,
            hs_products: hs_products,
            ics_products: ics_products,
            current_hs_products: '',
            current_ics_products: '',
            current_countries: '',
            countries_list: [],
            ics_products_list: [],
            hs_products_list: [],
            updated_user_info: {},
            updating: false,
            submitted: false,
            visible: true,
        };

        this.props.dispatch(userActions.getUserDetails());
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onDismiss = this.onDismiss.bind(this);
    }

	componentDidMount() {
		setTimeout(()=> {
	    	const { email } = this.props.user_info
	    	this.setState({ email: email });
	    	this.getCountries();
	    	this.getICSProducts();
	    	this.getHSProducts();
	    },150);	

 	 }

 	removeItem(oldItem, type) { 
 		switch(type) {
 			case 'hs_products':
 				const hs_products = _.remove(this.state.hs_products, item => item !== oldItem); 
	 			console.log (hs_products)
	 			this.setState({ hs_products });
	 			break;
	 			
	 		case 'ics_products':
 				const ics_products = _.remove(this.state.ics_products, item => item !== oldItem); 
	 			console.log (ics_products)
	 			this.setState({ ics_products });
	 			break;
	 			
	 		case 'countries':
 				const countries = _.remove(this.state.countries, item => item !== oldItem); 
	 			console.log (countries)
	 			this.setState({ countries });
		 		break;
		 		default:
		 			console.log('do nothing')
	 		}

	 	setTimeout(()=> this.submitChanges(),100);
 		 		
 	} 

 	submitChanges() {
 		const { email, countries, hs_products, ics_products } = this.state;
      	
	    let profile = { countries, ics_products, hs_products };
		 	
	 	const updated_user_details = { email, profile }

		const  {Authorization}  = authHeader();
	    fetch('http://localhost:8000/user/update/', {
	        method: 'put',
	        headers: {Authorization, 'Content-Type': 'application/json'},
	        body: JSON.stringify(updated_user_details)
	      })
	    .then(response => response.json())
 	}

 	 getCountries () {
		const { countries } = this.state;
		this.setState({
  		current_countries: countries.map((item)=>(
  			<a  style={{backgroundColor:'transparent', borderColor: 'transparent', padding: 0}} key={item} onClick={()=>this.removeItem(item, 'countries')} >
  				<UncontrolledAlert key={item} id={item} color="info">
  					{item}
  				</UncontrolledAlert>
				</a>
  			))
  		});
	}

	getHSProducts () {
		const { hs_products } = this.state;
		this.setState({
  		current_hs_products: hs_products.map((item)=>(
  			<a style={{backgroundColor:'transparent', borderColor: 'transparent', padding: 0}} key={item} onClick={()=>this.removeItem(item, 'hs_products')} >
  				<UncontrolledAlert key={item} id={item} color="info">
  					{item}
  				</UncontrolledAlert>
			</a>
  			))
  		});
	}

	getICSProducts () {
		const { ics_products } = this.state;
		this.setState({
  		current_ics_products: ics_products.map((item)=>(
  			<a style={{backgroundColor:'transparent', borderColor: 'transparent', padding: 0}} key={item} onClick={()=>this.removeItem(item, 'ics_products')} >
  				<UncontrolledAlert key={item} id={item} color="info">
  					{item}
  				</UncontrolledAlert>
			</a>
  			))
  		});
	}

	
 	onDismiss() {
    	this.setState({ visible: false });
    	console.log('I feel you!')
  	}

  	createArray(array) {
  		let newArray =[];
  		array.forEach(function (item) {
  			newArray.push(item.value);
  		});
  		
  		return newArray
  	}

  	updateList(newList, oldList) {
  		if (newList.length > 0) {
  			 let updatedList = this.createArray(newList);
  			 updatedList = updatedList.concat(oldList);
  			 
  			 return updatedList
  		}		
  	}


  	handleChange(e) {
      const { name, value } = e.target;
      this.setState({ [name]: value });
  	}

  	handleSubmit(e) {
  		e.preventDefault();
  	  	this.setState({ updating: true, submitted: false });
  	  	const { 
      		email, 
      		countries, 
      		hs_products, 
      		ics_products, 
      		countries_list, 
      		hs_products_list, 
      		ics_products_list 
      	} = this.state;
      	
    	let profile = { countries, ics_products, hs_products };

    	profile.countries = this.updateList(countries_list, countries);
    	profile.ics_products = this.updateList(ics_products_list, ics_products);
    	profile.hs_products = this.updateList(hs_products_list, hs_products);
	 	
 		const updated_user_details = { 'email': email, profile }
    
	    const  {Authorization}  = authHeader();
	     setTimeout(()=> {
		    fetch('http://localhost:8000/user/update/', {
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
    const { current_countries, current_hs_products, current_ics_products, updating, submitted } = this.state
    // console.log(error);
    return (
      <Container className="slight-shadow">
        <div>
	      <Breadcrumb>
		      <BreadcrumbItem><a href="/profile">Home</a></BreadcrumbItem>
		      <BreadcrumbItem active>My Preferences</BreadcrumbItem>
	      </Breadcrumb>
	      </div>
	      <div>
	      	<Row>
                <Col sm="6">
                  <Card body>
                    <CardTitle>Country Preferences</CardTitle>
				      {current_countries}
				    </Card>
				  </Col>
				  <Col sm="6">
                  	<Card body>
                    	<CardTitle>ICS Products Preferences</CardTitle>
				      	{current_ics_products}
				    </Card>
				  </Col>
				  <Col sm="6" style={{ marginTop: 20, marginBottom: 30 }}>
	                  <Card body>
	                    	<CardTitle>HS Products Preferences</CardTitle>
					      	{current_hs_products}
					   </Card>
				  	</Col>
				</Row>
	      </div>
	      <hr />
	      <Form name="form" method='post' onSubmit={this.handleSubmit}>
	      	<fieldset className="pref-fieldset" style={{backgroundColor: 'white'}}>
              <legend className="pref-legend"><span className="glyphicon-class"></span>Add TBT Notifications Preferences</legend>
               <FormGroup>
                <Label for="Countries">Countries</Label>
                <AsyncSelect
                  isMulti
                  cacheOptions 
                  defaultOptions
                  hasValues
                  name="countries" 
                  loadOptions={WTOMembersPromiseOptions}
                  onChange={(countries_list) => this.setState({ countries_list })}
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
                  onChange={(ics_products_list) => this.setState({ ics_products_list })}
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
                  onChange={(hs_products_list) => this.setState({ hs_products_list })}
                 />
              </FormGroup>
            </fieldset>
	        <Button className="mt-2" color="secondary">Submit</Button>
	        {updating && !submitted &&
            	<img alt="loading" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
          	} 
          	{submitted && 
            	<Alert color="info" className="col-sm-2 mt-2">Saved!</Alert>
            }
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
const connectedMyPreferences = connect(mapStateToProps)(MyPreferences);
export default connectedMyPreferences;