import React, { Fragment } from 'react'; 
import { Row, ListGroup,  ListGroupItem, tbody, thead, th, Table } from 'reactstrap';
import Comment from './Comments';
import './LatestNotifications.css';

class MyComments extends React.Component {    
  
  render() {
    const { comments } = this.props.comments;
    return (
       <Fragment>
          <Row noGutters className="position-relative w-100 align-items-center">
             <ListGroup>
                <ListGroupItem 
                  className="justify-content-between" 
                  color="info" 
                  action
                  >
                  <Table striped>
                    <thead style={{background: 'rgba(201, 76, 76, 0.3)'}}>
                      <tr>
                        <th>Date</th>
                        <th>Notification No.</th>
                        <th>Comment</th>
                        <th>Upload</th>
                      </tr>
                      </thead>
                      <tbody>
                      {    
                        comments && comments.length > 0  ?
                          comments.map((values,i)=>{
                            return( 
                                <Comment
                                  key={comments[i].id} 
                                  id={comments[i].id} 
                                  comment_date={comments[i].comment_date}
                                  notification_number={comments[i].notification_number}
                                  comment = {comments[i].comment}
                                  comment_file = {comments[i].comment_file}
                                />
                                );
                              }
                            )
                          :
                          <tr>
                            <td>______</td>
                            <td>______</td>
                            <td>You have not posted any comments</td>
                            <td>______</td>
                          </tr>   
                       } 
                      </tbody>
                    </Table>
                  </ListGroupItem> 
              </ListGroup>
            </Row>
        </Fragment>
    );
  }
}

export default MyComments;
