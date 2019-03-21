import React from 'react';
import Moment from 'moment';
import { tr, td } from 'reactstrap';

class Comment extends React.Component { 
    render() {
      return (
        <tr>
          <td>{Moment(this.props.comment_date).format('DD/MM/YYYY')}</td>
          <td>{this.props.notification_number}</td>
          <td>{this.props.comment}</td>
          <td><a href={this.props.comment_file}>Download</a></td>
        </tr>
     );
  }
}
export default Comment; 