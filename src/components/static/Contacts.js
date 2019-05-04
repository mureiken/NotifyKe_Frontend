import React from 'react';
import {
    Container, Row
} from 'reactstrap';

import './Static.css';

const Contacts = () => (
  <Container>
      <Row>
        <h1 className="display-6">Contacts</h1>
        <hr className="my-2" />
      </Row>
      <Row>
        <p>
           National Enquiry Point,<br />
           Kenya Bureau of Standards,<br />
           Popo Road,<br />
           Off Mombasa Road,<br />
           P.O. Box 54974 - 00200,<br />
           Nairobi, Kenya.<br /><br />
           <strong>Tel:</strong> + 254 (20) 694 8000 <br />
           <strong>Mobile:</strong> 0722 202 137 or 0734 600 471/2 <br />
           <strong>PVOC:</strong> 0724 255 242 <br />
           <strong>Email:</strong> wto.nep@kebs.org
         </p> 
      </Row>
    </Container>
);

export default Contacts;