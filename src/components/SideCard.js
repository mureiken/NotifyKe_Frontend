import React, { Fragment } from 'react';

import {
   Jumbotron, Button 
} from 'reactstrap';

import './SideCard.css';

const SideCard = () => (
  <Fragment>
      <Jumbotron className=" bg_jumbo">
        <h1 className="display-7">Timely alerts of TBT Notifications</h1>
        <hr className="my-2" />
        <p className="lead">NotifyKenyaTBT offers free subscription for WTO-TBT notifications. Those who subscribe can also comment on TBT notifications on this platform. 
          This is important because reviewing and commenting on proposed standards, technical regulations and conforminity assesment procedures from WTO members, enables local business community views to be known
          before adoption. It's vital for business to be aware of these notifications because they have potential to affect trade with foreign markets.
          NotifyKenyaTBT will receive comments from <strong>Kenyan citizens only</strong> before forwarding them to notifying members.</p>
        <p className="lead">
          <Button outline color="success">Learn More</Button>
        </p>
      </Jumbotron>
    </Fragment>
);

export default SideCard;