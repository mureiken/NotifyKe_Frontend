import React, { Fragment } from 'react';
import './LatestNotifications.css';

export default class Footer extends React.Component {
  render() {
    return (
      <Fragment>
       <footer className="pt-4 my-md-5 pt-md-5 border-top">
        <div className="row">
          <div className="col-12 col-md">
            <small className="d-block mb-3 text-muted">Notification Authority of Kenya</small>
            <small className="d-block mb-3 text-muted">&copy;2018-2019</small>
          </div>
          <div className="col-6 col-md">
            <h5>Features</h5>
            <ul className="list-unstyled text-small">
              <li><a className="text-muted" href="">Email alerts</a></li>
              <li><a className="text-muted" href="">Personal profile</a></li>
              <li><a className="text-muted" href="">Filter Preferences</a></li>
            </ul>
          </div>
          <div className="col-6 col-md">
            <h5>Resources</h5>
            <ul className="list-unstyled text-small">
              <li><a className="text-muted" href="">User Guide</a></li>
              <li><a className="text-muted" href="">WTO Members</a></li>
              <li><a className="text-muted" href="">FAQs</a></li>
            </ul>
          </div>
          <div className="col-6 col-md">
            <h5>About</h5>
            <ul className="list-unstyled text-small">
              <li><a className="text-muted" href="">Team</a></li>
              <li><a className="text-muted" href="">Locations</a></li>
              <li><a className="text-muted" href="">Privacy</a></li>
              <li><a className="text-muted" href="">Terms</a></li>
            </ul>
          </div>
        </div>
      </footer>
      </Fragment>
    );
  }
}