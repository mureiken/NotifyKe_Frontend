import React from 'react';
import {
    Container, Row, Card, CardBody,ListGroupItem
} from 'reactstrap';

import './Static.css';

const Resources = () => (
  <Container>
      <Row>
        <h1 className="display-7">Resources</h1>
        <hr className="my-2" /><br />
      </Row>
      <Row>
        <p className="lead">
           Links to information resources that you may be interested in.
        </p>
      </Row>
      <Row>
          <Card style={{marginTop:10, width: '100%'}}>
            <CardBody style={{padding: 10}}>
              <ListGroupItem color="warning" tag="b" href="#" style={{marginBottom:10, padding:10}}>World Trade Trade Organisation</ListGroupItem>
                  <a href="https://www.wto.org" target='_blank' rel="noopener noreferrer">https://www.wto.org</a>
            </CardBody>
      </Card>
     </Row>
     <Row>
        <Card style={{marginTop:10, width: '100%'}}>
            <CardBody style={{padding: 10}}>
              <ListGroupItem color="warning" tag="c" href="#" style={{marginBottom:10, padding: 10}}>WTO Members</ListGroupItem>
                  <a href='https://www.wto.org/english/thewto_e/whatis_e/tif_e/org6_e.htm' target='_blank' rel="noopener noreferrer">https://www.wto.org/english/thewto_e/whatis_e/tif_e/org6_e.htm</a>
            </CardBody>
        </Card>
    </Row>
    <Row>
      <Card style={{marginTop:10, width: '100%'}}>
            <CardBody style={{padding: 10}}>
              <ListGroupItem color="warning" tag="e" href="#" style={{marginBottom:10, padding: 10}}>TBT Agreement</ListGroupItem>
                <a href='https://www.wto.org/english/tratop_e/tbt_e/tbt_e.htm' target='_blank' rel="noopener noreferrer">https://www.wto.org/english/tratop_e/tbt_e/tbt_e.htm</a>
          </CardBody>
      </Card>
    </Row>
  </Container>
);

export default Resources;