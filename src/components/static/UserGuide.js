import React from 'react';
import {
    Container, Row, Card, CardBody,ListGroupItem
} from 'reactstrap';

import './Static.css';

const UserGuide = () => (
  <Container>
      <Row>
        <h1 className="display-7">User Guide</h1>
        <hr className="my-2" /><br />
      </Row>
      <Row>
        <p className="lead">
          To use this website is easy and straightforward. However, here are brief instructions to guide you on how to use this website
        </p>
        <Card>
            <CardBody style={{paddingTop: 10}}>
              <ListGroupItem color="info" tag="a" href="#" style={{marginBottom:10}}>Signing up (Registeration)</ListGroupItem>
              <p>To register, use the sign-up page. This is for new users who want to be register and start receiving automatic updates on WTO TBT Notifications. 
              When you sign-in up, please provide preferences of the type of notification you would like to receive based on 
              country and HS Code and/or ICS Code. <br />
              You will receive notifications through email. You can also access all your TBT notifications curated for you in your dashboard when you log in.</p>
            </CardBody>
          </Card>
      </Row>
    <Row>
      <Card style={{marginTop:10, width: '100%'}}>
            <CardBody style={{paddingTop: 10}}>
              <ListGroupItem color="info" tag="b" href="#" style={{marginBottom:10}}>Signing in</ListGroupItem>
                  <p>Log in using your username and password on the sign-in page to access your dashboard. In your dashboard you have 2 sections, 
                  i.e "My Profile" and "My Notifications". Those sections are described below.</p>
                  </CardBody>
          </Card>
     </Row>
     <Row>
        <Card style={{marginTop:10, width: '100%'}}>
            <CardBody style={{paddingTop: 10}}>
              <ListGroupItem color="info" tag="c" href="#" style={{marginBottom:10}}>My Profile</ListGroupItem>
                  Under 'My Profile' you have 'Preferences' & 'My Account' sub-sections. These are described below:- <br /><br />
                  <em>Preferences</em><br />You can change the preferences you provided when you first signed up i.e. you can remove/add countries, HS Codes and ICS Codes preferences.<br />
                  <em>My Account</em><br /> 
                  You can add personal information such as  you names, organization  etc on this section. You can also change your password if you wish.
              </CardBody>
        </Card>
    </Row>
    <Row>
      <Card style={{marginTop:10, width: '100%'}}>
            <CardBody style={{paddingTop: 10}}>
              <ListGroupItem color="info" tag="d" href="#" style={{marginBottom:10}}>My Notifications</ListGroupItem>
              You will find all notifications based your preferences curated for you in this section. You can also post comments on each notification here.
             </CardBody>
       </Card>
    </Row>
    <Row>
      <Card style={{marginTop:10, width: '100%'}}>
            <CardBody style={{paddingTop: 10, paddingBottom: 2}}>
              <ListGroupItem color="info" tag="e" href="#" style={{marginBottom:10}}>Email Alerts</ListGroupItem>
                <p>You will receive regular TBT notifications on your email based on your preferences.</p>
          </CardBody>
      </Card>
      </Row>
      <Row>
      <Card style={{marginTop:10, width: '100%'}}>
            <CardBody style={{paddingTop: 10}}>
              <ListGroupItem color="warning" tag="f" href="#" style={{marginBottom:10}}>Lost password?</ListGroupItem>
                <p>In case you have forgotten your password, use 'forgot password?' link  on the sign-in page to reset your password. An email with a instructions and a link to change your password will be sent to you.</p>
              </CardBody>
      </Card>
      </Row>
    </Container>
);

export default UserGuide;