import React from 'react';
import SideCard from './SideCard';

import { Row, Col } from 'reactstrap';
import SignupForm from './SignupForm';


class HomePage extends React.Component  {
      render () {
        const { alert } = this.props;
        return (
               <Row noGutters className="pt-2 pt-md-5 w-100 px-4 px-xl-0 position-relative">
                  <Col xs={{ order: 2 }} md={{ size: 5, order: 1 }} tag="aside" className="pb-5 mb-5 pb-md-0 mb-md-0 mx-auto mx-md-0">
                    <SideCard />
                  </Col>
                  <Col xs={{ order: 1 }} md={{ size: 6, offset: 1 }} tag="section" className="py-5 mb-5 py-md-0 mb-md-0">
                    <SignupForm alert={alert}/>
                  </Col>
                </Row>  
          );
      }
    }

export default HomePage; 