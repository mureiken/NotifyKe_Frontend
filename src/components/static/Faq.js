import React from 'react';
import {
    Container, Row
} from 'reactstrap';

import './Static.css';

const Faq = () => (
  <Container>
      <Row>
        <h1 className="display-6">FAQs</h1>
        <hr className="my-2" />
      </Row>
      <Row>
        <p>
           <strong>What is WTO TBT Agreement?</strong><br />
           The Technical Barriers to Trade (TBT) Agreement aims to ensure that technical regulations, standards, and conformity 
           assessment procedures are non-discriminatory and do not create unnecessary obstacles to trade. At the same time, it 
           recognises WTO members' right to implement measures to achieve legitimate policy objectives, such as the protection of 
           human health and safety, or protection of the environment. The TBT Agreement strongly encourages members to base their 
           measures on international standards as a means to facilitate trade. Through its transparency provisions, it also aims to 
           create a predictable trading environment
         </p>
          <p>
            <strong>Why should I care about TBT notifications?</strong><br />
             By registering to this website,  you recieves  updates on TBT notifications based on preferences you set i.e target markets i.e countries 
             and product categories based on HS Code and ICS codes.
             This notifications are  usually sent once a week. 

             By receiving and reacting to TBT notifications, you are able to comment on potential barriers that may affect your trade
             with foreign markets before they are implemented and become law. 
         </p>
         <p>
            <strong>What are HS Codes?</strong><br />
            The Harmonized Commodity Description and Coding System (HS Code), is a common standard worldwide for describing the type of 
            commodity that is shipped. Every commodity that enters or crosses most international borders has to be declared to customs 
            using this code. Therefore, the code helps to standardize and identify cargo in the same manner whether it is in 
            Mombasa, Durban or Dar-es-Salaam.
         </p>
          <p>
            <strong>What about ICS Codes?</strong><br />
            International Classification for Standards (ICS) is an international classification system for technical standards. 
            It is designed to cover every economic sector and virtually every activity of the humankind where technical standards 
            may be used. It's developed and maintained by the International Organization for Standardization.
          </p>
           
      </Row>
    </Container>
);

export default Faq;