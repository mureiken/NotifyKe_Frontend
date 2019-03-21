import React, { Fragment } from 'react';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
 
import { history } from './helpers';
import { alertActions } from './actions';
import PrivateRoute from './components/PrivateRoute';
import ConnectedProfilePage from './components/ProfilePage';
import connectedMyAccountForm from './components/MyAccount';
import connectedMyPreferences from './components/MyPreferences';
import ChangePasswordForm from './components/ChangePassword';

import About from './components/static/About';
import Faq from './components/static/Faq';
import UserGuide from './components/static/UserGuide';
import Resources from './components/static/Resources';
import Privacy from './components/static/PrivacyPolicy';

import {Container} from 'reactstrap';
import ErrorBoundary from './components/ErrorBoundry';


import HomePage from './components/HomePage';
import ConnectedSignInForm from './components/SignInForm';
import PasswordResetRequestForm from './components/PasswordResetRequestForm';
import PasswordResetForm from './components/PasswordResetForm';
import Footer from './components/Footer';
import Header from './components/Header';


class App extends React.Component  {
  constructor(props) {
          super(props);

          const { dispatch } = this.props;
          history.listen((location, action) => {
              // clear alert on location change
              dispatch(alertActions.clear());
          });
      }
  
      MyHomePage = (props) => {
        return (
          <HomePage alert = {this.props.alert} />
        );
      }

      SignInPage = (props) => {
        return (
          <ConnectedSignInForm alert = {this.props.alert} />
        );
      }

      PasswordResetRequestFormPage = (props) => {
        return (
          <PasswordResetRequestForm alert = {this.props.alert} />
        );
      }

      render () {
        return (
          <Fragment>
            <Header />
            <main className="my-5 py-5">
              <Container className="px-0">
              {alert.email && <span className={`alert ${alert.type}`}>{alert.email}</span>}
                <ErrorBoundary>
                  <Router history={history}>
                    <div>
                      <PrivateRoute  path="/profile" component={ConnectedProfilePage} />
                      <PrivateRoute  path="/myaccount" component={connectedMyAccountForm} />
                      <PrivateRoute  path="/changepassword" component={ChangePasswordForm} />
                      <PrivateRoute  path="/mypreferences" component={connectedMyPreferences} />
                      <Route exact path="/" render={this.MyHomePage}  />
                      <Route path="/login" component={this.SignInPage} />
                      <Route path="/passwordrecovery" component={this.PasswordResetRequestFormPage} />
                      <Route path="/user/rest-auth/password/reset/confirm/:uid/:token" component={PasswordResetForm} />
                      <Route path="/about" component={About} />
                      <Route path="/faq" component={Faq} />
                      <Route path="/userguide" component={UserGuide} />
                      <Route path="/resources" component={Resources} />
                      <Route path="/privacypolicy" component={Privacy} />
                    </div>
                  </Router>
                  <Footer />
                </ErrorBoundary>
              </Container>              
            </main>
           
          </Fragment>  
        
          );
      }
    }

function mapStateToProps(state) {
    const { alert } = state;
    return {
        alert
    };
}

const connectedApp = connect(mapStateToProps)(App);
export default connectedApp; 