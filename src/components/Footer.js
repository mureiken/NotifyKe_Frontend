import React, { Fragment } from 'react';
import './LatestNotifications.css';
import kebs_logo from '../kebs_logo.png';

export default class Footer extends React.Component {
  render() {
    return (
      <Fragment>
       <footer className="pt-4 my-md-5 pt-md-5 mt-1 border-top">
        <div className="row">
          <div className="col-12 col-md ml-5">
            <small className="d-block mb-3 text-muted">Notification Authority of Kenya</small>
            <small className="d-block mb-3 text-muted">&copy;2018-2019</small>
          </div>
          <div className="col-12 col-md ml-5">
            <h5>Features</h5>
            <ul className="list-unstyled text-small">
              <li><a className="text-muted" href="/userguide#e">Email alerts</a></li>
              <li><a className="text-muted" href="/userguide#c">Personal profile</a></li>
              <li><a className="text-muted" href="/userguide#c">Filter TBT Preferences</a></li>
            </ul>
          </div>
          <div className="col-12 col-md ml-5">
            <h5>Resources</h5>
            <ul className="list-unstyled text-small">
              <li><a className="text-muted" href="/userguide">User Guide</a></li>
              <li><a className="text-muted" href="https://www.wto.org/english/thewto_e/whatis_e/tif_e/org6_e.htm" target="_blank" rel="noopener noreferrer">WTO Members</a></li>
              <li><a className="text-muted" href="/faq">FAQs</a></li>
            </ul>
          </div>
          <div className="col-12 col-md ml-5">
            <h5>About</h5>
            <ul className="list-unstyled text-small">
              <li><a href="#" className="text-muted">Team</a></li>
              <li><a href="#" className="text-muted" >Locations</a></li>
              <li><a className="text-muted" href="/privacypolicy">Privacy</a></li>
            </ul>
          </div>
          <div className="col-12 col-md ml-5">
            <img src={kebs_logo} width='200' alt='Kebs Logo' />
          </div>
        </div>
      </footer>
      </Fragment>
    );
  }
}