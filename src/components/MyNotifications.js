import React, { Fragment } from 'react';
import { Row, Col, Input, Button, Form, Table } from 'reactstrap';
import './LatestNotifications.css';

export default class MyNotifications extends React.Component {
  render() {
    return (
       <Fragment>
         <Row noGutters className="position-relative w-100 align-items-center mb-10">
         <Col className="d-none d-lg-flex justify-content-start">
          <h3>Latest TBT Notifications</h3>
         </Col>
          <Col className="d-none d-lg-flex justify-content-end">
              <Form inline>
                <Input type="search" className="mr-3" placeholder="Filter by Country" />
                <Button type="submit" color="info" outline>Search</Button>
              </Form>
            </Col>
          </Row>
          <Row noGutters className="position-relative w-100 align-items-center">
            <Table striped>
              <thead>
                <tr>
                  <th>Country</th>
                  <th>Notification</th>
                  <th>Products</th>
                  <th>Issued On</th>
                  <th>Documents</th>
                  <th>Comments by</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Singapore</td>
                  <td><a href='' className="link-item">G/TBT/N/SGP/44</a></td>
                  <td>Compact fluorescent lamp without integrated ballast (CFLni) for the illumination of an area with G24d lamp cap, that is designed to be connected to 230 volts mains voltage by means of a socket or lamp connector</td>
                  <td>18/07/2018</td>
                  <td><a href='' className="link-item">Download</a></td>
                  <td>28/07/2018</td>
                </tr>
                <tr>
                  <td>Argentina</td>
                  <td><a href='' className="link-item">G/TBT/N/ARG/336</a></td>
                  <td>Flexible aluminium tubes for product packaging</td>
                  <td>19/07/2018</td>
                  <td><a href='' className="link-item">Download</a></td>
                  <td>15/09/2018</td>
                </tr>
                <tr>
                  <td>United States of America</td>
                  <td><a href='' className="link-item">G/TBT/N/USA/1384</a></td>
                  <td>Residential garage door operators</td>
                  <td>19/07/2018</td>
                  <td><a href='' className="link-item">Request for document</a></td>
                  <td>21/08/2018</td>
                </tr>
              </tbody>
           </Table>
          </Row>
       </Fragment>
    );
  }
}