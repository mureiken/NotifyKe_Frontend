import React, { Fragment } from 'react'; 
import { Row, ListGroup, ListGroupItem, Table } from 'reactstrap';
import Notification from './Notification';
import './LatestNotifications.css';

class MyNotifications extends React.Component {    
  
  render() {
    const { notifications } = this.props.notifications;
    return (
       <Fragment>
          <Row noGutters className="position-relative w-100 align-items-center">
             <ListGroup >
              {    
                   notifications && notifications.length > 0  ?
                     notifications.map((values,i)=>{
                      return( 
                        <Notification 
                          key={notifications[i].id} 
                          id={notifications[i].id} 
                          notificationdate={notifications[i].date_logged}
                          tbt_notifications = {notifications[i].notification.document}
                          user = {notifications[i].user}
                          />
                          );
                       }
                     )
                    :
                   <ListGroupItem 
                    className="justify-content-between" 
                    color="warning" 
                    action
                    >
                      <Table striped>
                        <thead style={{background: 'rgba(201, 76, 76, 0.3)'}}>
                          <tr className='d-flex'>
                            <th className='col-2'>Notifying Member</th>
                            <th className='col-4'>Title, symbol & Description</th>
                            <th className='col-2'>Products</th>
                            <th className='col-2'>Comment Deadline</th>
                            <th className='col-1'>Links</th>
                            <th className='col-1'>Full Text</th>
                          </tr>
                        </thead>
                        <tbody> 
                          <tr className='d-flex'>
                            <td className='col-2'>__________</td>
                            <td className='col-4'>You don't have any notifications</td>
                            <td className='col-2'>______</td>
                            <td className='col-2'>______</td>
                            <td className='col-1'>______</td>
                            <td className='col-1'>______</td>
                          </tr>   
                      </tbody>
                    </Table>
                  </ListGroupItem> 
               }  
               </ListGroup>
          </Row>
       </Fragment>
    );
  }
}

export default MyNotifications;
