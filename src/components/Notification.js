import React, {Fragment} from 'react';
import Moment from 'moment';
import { 
  ListGroupItem, 
  Badge, 
  Button, 
  Modal, 
  ModalHeader, 
  ModalBody, 
  ModalFooter,
  Form, 
  FormGroup, 
  Label, 
  Input, 
  FormText,
  Card, 
  CardBody, 
  Collapse, 
  Table, 
  tbody, 
  thead, 
  th, 
  tr, 
  td,
  strong
} from 'reactstrap';

class Notification extends React.Component {
   constructor(props) {
    super(props);
    this.state = { 
      collapse: false, 
      linkid: null, 
      buttonid: null, 
      modal: false,
      comment: '',
      commentFile: null,
      submitted: false,
    };
    this.togglemodal = this.togglemodal.bind(this);
    this.inputElement = null;
    this.inputNotificationNumber = null;
    this.handleChange = this.handleChange.bind(this);
    this.handelChangeFile = this.handelChangeFile.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleChange(e) {
      const { value } = e.target;
      this.setState({
       comment: value,
   });
  }

  handelChangeFile(e) {
   let file = e.target.files[0];
   
   this.setState({
       commentFile: file,
   });
 }

  togglemodal() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  handleSubmit(e){
    e.preventDefault();
    this.setState({ submitted: true });
      
    let formData = new FormData();
    const user = this.props.user;
    formData.append('notification_number', this.inputNotificationNumber.props.value);
    const { comment, commentFile} = this.state;
    formData.append('comment',comment);
    if (commentFile) {
      formData.append('comment_file',commentFile);
    }
    if (comment !=='' || commentFile !== null ) {
      formData.append('user',user);
      fetch(`${process.env.REACT_APP_DJANGO_API}/api/comment/`, {
        method: 'POST',
        headers: {  Accept: 'application/json, text/plain, */*',},
        body:formData,
      }).then(res => res.json())
        .then((data) => {
          console.log(data);
        })
        .catch(err => console.log(err));

        this.setState(prevState => ({
            modal: !prevState.modal
          }));
      }
  }

  stripTags (OriginalString) { 
    if (OriginalString !=null) {
      let strippedString = OriginalString.replace(/(<([^>]+)>)/ig,"");
      return strippedString;
    } else {
      return '';
    }
  }
  Arrays(props, name) {
    const outerDivStyle = {
       background: 'rgba(201, 76, 76, 0.1)',
  }
  const innerDivStyle = {
      display: 'inline-block',
        margin: '5px',    
      }
      return (
        <div>
          <strong>{name}</strong>
          {props.map((item, i) => (
            // Without the `key`, React will fire a key warning
            <Fragment key={i}>
              <div style={outerDivStyle}>
                <div style={innerDivStyle}>{props[i].code}</div>
                <div style={innerDivStyle}>{props[i].name}</div>
              </div>
            </Fragment>
          ))}
        </div>
       
      );

    }
    render() {
      const { comment, commentFile, submitted } = this.state;
      return (
        <ListGroupItem 
          className="justify-content-between" 
          color="warning" 
          action
        >
        <strong>You have <Badge color="success">{this.props.tbt_notifications.length}</Badge> TBT Notifications logged on {Moment(this.props.notificationdate).format('DD/MM/YYYY')} </strong>
        <hr></hr>
          <Table striped>
            <thead style={{background: 'rgba(201, 76, 76, 0.3)'}}>
              <tr className='d-flex'>
                <th className='col-2'>Notifying Member</th>
                <th className='col-3'>Title, symbol & Description</th>
                <th className='col-3'>Products</th>
                <th className='col-2'>Comment Deadline</th>
                <th className='col-1'>Links</th>
                <th className='col-1'>Full Text</th>
              </tr>
            </thead>
            <tbody>
                {
                  this.props.tbt_notifications.map((values,i)=>{
                    const value = i;
                    const document_link_en = this.props.tbt_notifications[i].document_online_links.url[0];
                    const document_link_fr = this.props.tbt_notifications[i].document_online_links.url[1];
                    const document_link_es = this.props.tbt_notifications[i].document_online_links.url[2];
                    let  english_document_link = '#';
                    let french_document_link = '#';
                    let spanish_document_link ='#';
                    if (document_link_en) { 
                       english_document_link = document_link_en[Object.keys(document_link_en)[0]];
                    }
                    if (document_link_fr) {
                      french_document_link = document_link_fr[Object.keys(document_link_fr)[0]];
                    }
                    if (document_link_es){
                      spanish_document_link = document_link_es[Object.keys(document_link_es)[0]];
                    }
                    
                    return(
                        <tr key={i} id={i} className='d-flex'>
                          <td className='col-2'>
                              {this.props.tbt_notifications[i].notifying_member}
                           </td>
                            <td className='col-3'>
                             <strong>Notification:</strong> {this.props.tbt_notifications[i].document_symbol} <br />
                               <strong>Issue Date:</strong> {this.props.tbt_notifications[i].date_of_distribution}<br />
                               <strong>Title:</strong> {this.stripTags(this.props.tbt_notifications[i].notified_document_details.notified_document_title)}<br />
                               <a 
                                href={'#'+i} 
                                key={i}
                                onClick={
                                  () => {
                                    this.setState(state => ({ collapse: !state.collapse, linkid: value }));
                                    console.log(value);
                                  }
                                }
                                >View Content Detail 
                               </a> <strong>[+ / -]</strong>
                               <Collapse isOpen={(i===this.state.linkid) ? this.state.collapse: false}>
                                  <Card>
                                    <CardBody>
                                    <a id={'#'+i}> </a>
                                    {this.stripTags(this.props.tbt_notifications[i].description_of_content)}
                                    </CardBody>
                                  </Card>
                              </Collapse>
                            </td>
                            <td className='col-3'>
                              { 
                                this.props.tbt_notifications[i].ics_products ?
                                  this.props.tbt_notifications[i].ics_products.ics.isArray ?
                                    this.Arrays(this.props.tbt_notifications[i].ics_products.ics, 'ICS Products')
                                   : <dl>
                                     <Fragment>
                                         <dt>{this.props.tbt_notifications[i].ics_products.ics.code}</dt>
                                         <dd>{this.props.tbt_notifications[i].ics_products.ics.name}</dd>
                                       </Fragment>
                                   </dl>
                                : <dl>
                                     <Fragment>
                                         
                                       </Fragment>
                                   </dl>
                              }
                            </td>
                            <td className='col-2'>
                              {this.props.tbt_notifications[i].finaldate_for_comment}<br />
                              <Button 
                                color="primary" 
                                size="sm" onClick={
                                  () => {
                                   this.setState(prevState => ({modal: !prevState.modal, buttonid: value}));
                                 }}
                                >
                                Comment
                              </Button>{' '}
                              <Modal isOpen={(i===this.state.buttonid) ? this.state.modal: false} toggle={this.togglemodal} className={this.props.className}>
                                <ModalHeader toggle={this.togglemodal}>Comment on Notification: {this.props.tbt_notifications[i].document_symbol}</ModalHeader>
                                <ModalBody>
                                  {submitted && comment ==='' && commentFile === null && <p><span className="alert alert-warning">Enter your comment or upload a document with comments</span></p>}
                                  <Form>
                                    <FormGroup>
                                      <Label for="exampleText">Comment</Label>
                                      <Input 
                                        type="textarea" 
                                        name="comment" 
                                        id="comment" 
                                        value={this.state.comment}
                                        onChange={this.handleChange} 
                                      />
                                    </FormGroup>
                                    <FormGroup>
                                      <Label for="exampleFile">Upload</Label>
                                      <Input
                                        type="hidden"
                                        name="notificationNumber"
                                        id="notificationNumber"
                                        value={this.props.tbt_notifications[i].document_symbol}
                                        ref={(input) => { this.inputNotificationNumber = input; }}
                                      />
                                      <Input 
                                        type="file" 
                                        name="commentFile" 
                                        id="commentFile" 
                                        multiple={false}
                                        ref={(input) => { this.inputElement = input; }}
                                        accept=".txt,.doc,.docx,.pdf" 
                                        onChange={this.handelChangeFile} 
                                       />
                                      <FormText color="muted">
                                        You can upload your comments as word document(.doc, docx), a text file(.txt) or a PDF (.pdf).
                                      </FormText>
                                    </FormGroup>
                                  </Form>
                                </ModalBody>
                                <ModalFooter>
                                  <Button color="primary" onClick={this.handleSubmit}>Submit</Button>{' '}
                                  <Button color="secondary" onClick={this.togglemodal}>Cancel</Button>
                                </ModalFooter>
                              </Modal>
                            </td> 
                            <td className='col-1'>
                             <div><a href={english_document_link}>EN</a></div>
                             <div><a href={french_document_link}>FR</a></div>
                             <div><a href={spanish_document_link}>ES</a></div>
                            </td> 
                            <td className='col-1'>
                             <a href={this.props.tbt_notifications[i].notified_document_links.member_attachment_links}>Full Text</a>
                            </td>                  
                         </tr>  
                         
                       );
                    })
                 }
             </tbody>
            </Table>
        </ListGroupItem>
     );
  }
}
export default Notification; 