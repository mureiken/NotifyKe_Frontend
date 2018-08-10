import React, { Fragment } from 'react';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
 
import { history } from './helpers';
import { alertActions } from './actions';
import PrivateRoute from './components/PrivateRoute';
import ConnectedProfilePage from './components/ProfilePage';

import {Container} from 'reactstrap';

import HomePage from './components/HomePage';
import ConnectedSignInForm from './components/SignInForm';
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
      render () {
        const { alert } = this.props;
        return (
          <Fragment>
            <Header />
            <main className="my-5 py-5">
              <Container className="px-0">
                {alert.message && <span className={`alert ${alert.type}`}>{alert.message}</span>}
                <Router history={history}>
                  <div>
                    <PrivateRoute  path="/profile" component={ConnectedProfilePage} />
                    <Route exact path="/" component={HomePage}/>
                    <Route path="/login" component={ConnectedSignInForm} />
                    </div>
                  </Router>
                  <Footer />
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