import React from 'react';
import {
    Container, Row, Card,CardBody 
} from 'reactstrap';

import './Static.css';

const About = () => (
  <Container>
      <Row>
        <h1 className="display-7">About</h1>
        <hr className="my-2" /><br />
      </Row>
      <Row>
        <p>
          This web site is managed and operated by National Enquiry Point for the WTO TBT based at Kenya Bureau of Standards.
        </p>
        <Card style={{marginTop:10, width: '100%'}}>
            <CardBody style={{padding: 10}}>
               <strong>Purpose</strong><br />
               The purpose of NotifyKenya TBT is to disseminate WTO Technical Barriers to Trade notifications from foreign countries 
               that are of interest to Kenyan entities. Member countries of the World Trade Organization (WTO) are required under the Agreement on Technical Barriers to Trade (TBT Agreement) to report to the WTO all proposed technical 
               regulations that could affect trade with other Member countries. The WTO Secretariat distributes this information in the 
               form of "notifications" to all Member countries.
            </CardBody>
        </Card>
         <Card style={{marginTop:10, width: '100%'}}>
            <CardBody style={{padding: 10}}>
               <strong>Users</strong><br />
                By using the NotifyKenyaTBT Service, you can be updated regurlarly on TBT Notifications by subcribing to this website. 
                Based on your subscription, you will reveive email alerts or find relevant TBT notifications on your dashboard, once you log in.
                If you are interested in this service, please go ahead and sign-up, if you haven't done that already. 
              </CardBody>
        </Card>
      </Row>
    </Container>
);

export default About;