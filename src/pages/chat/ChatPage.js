import React, { Component } from "react";
import { connect } from 'react-redux';
import { fetchChatrooms, createChatroom } from './../../actions/chatroom';
import { fetchChatmessages, createChatmessage } from './../../actions/chatmessage';
import { MDBCard, MDBCardBody, MDBRow, MDBCol, MDBListGroup, MDBInput, MDBBtn} from "mdbreact";
import "./ChatPage.css";

//import components
import Chatroom from './../../components/Chatroom';
import ChatMessage from './../../components/ChatMessage';
import CreateRoomModal from './../creatRoom/CreatRoomModal';

class ChatPage extends Component {
constructor() {
super();
this.state = {
chatrooms: [
{
name: "John Doe",
avatar: "default-avatar.png",
message: "Hello, Are you there?",
when: "Just now",
toRespond: 1,
seen: false,
active: true
},
{
name: "Danny Smith",
message: "Lorem ipsum dolor sit",
avatar: "default-avatar.png",
when: "5 min ago",
toRespond: 0,
seen: false,
active: false
},
{
name: "Alex Steward",
message: "Lorem ipsum dolor sit",
avatar: "default-avatar.png",
when: "Yesterday",
toRespond: 0,
seen: false,
active: false
},
{
name: "Ashley Olsen",
message: "Lorem ipsum dolor sit",
avatar: "default-avatar.png",
when: "Yesterday",
toRespond: 0,
seen: false,
active: false
},
{
name: "Kate Moss",
message: "Lorem ipsum dolor sit",
avatar: "default-avatar.png",
when: "Yesterday",
toRespond: 0,
seen: false,
active: false
},
{
name: "Lara Croft",
message: "Lorem ipsum dolor sit",
avatar: "default-avatar.png",
when: "Yesterday",
toRespond: 0,
seen: false,
active: false
},
{
name: "Brad Pitt",
message: "Lorem ipsum dolor sit",
avatar: "default-avatar.png",
when: "5 min ago",
toRespond: 0,
seen: true,
active: false
}
],
messages: [
{
author: "Brad Pitt",
avatar: "default-avatar.png",
when: "12 mins ago",
message:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
},
{
author: "Lara Croft",
avatar: "default-avatar.png",
when: "13 mins ago",
message:
" Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium."
},
{
author: "Brad Pitt",
avatar: "default-avatar.png",
when: "14 mins ago",
message:
"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
}
],
currentChat:'',
roomsPage: 1,
roomsLimit: 10,
messagesPage: 1,
messagesLimit: 10,
};
}
setChatRoom = (roomId) => {
  // write code to set a particular chatroom here
  console.log('roomId ', roomId);
}
handleRefresh = () => {
  this.props.fetchChatrooms({ page: this.state.roomsPage, limit: this.state.roomsLimit, filter: 'none' });
  this.props.fetchChatmessages({ page: this.state.messagesPage, limit: this.state.messagesLimit, filter: 'none' });
}

sendMessage = () => {
  // write code here to send message
  console.log('ok');
}

componentDidMount() { 
  this.handleRefresh();
}


render() {
return (
<MDBCard className="grey lighten-3 chat-room">
  <MDBCardBody>
    <MDBRow className="px-lg-2 px-2">
      <MDBCol md="6" xl="4" className="px-0 mb-2 mb-md-0">
        <h6 className="font-weight-bold mb-3 text-lg-left">Member</h6>
        <CreateRoomModal/>
        <div>
          <div className="white z-depth-1 p-3">
          <MDBListGroup className="friend-list">
            {this.props.chatrooms.chatrooms.map(friend => (
              <Chatroom key={friend.id}  friend={friend} setChatRoom={this.setChatRoom} />
            ))}
          </MDBListGroup>
          </div>
        </div>
      </MDBCol>
      <MDBCol md="6" xl="8" className="pl-md-3 px-lg-auto mt-2 mt-md-0">
        <div className="scrollable-chat">
          <MDBListGroup className="list-unstyled pl-3">
            {this.props.chatmessages.chatmessages.map(message => (
            <ChatMessage key={message.id} message={message} />
            ))}
            <li>
              <div className="form-group basic-textarea">
                <MDBInput label="Enter text message here" />
                <MDBBtn
                        color="info"
                        rounded
                        size="sm"
                        className="float-right mt-4"
                        onClick={this.sendMessage}>
                        Send
                      </MDBBtn>
                    </div>
                  </li>
                </MDBListGroup>
              </div>
            </MDBCol>
          </MDBRow>
        </MDBCardBody>
      </MDBCard>
    );
  }
}

const mapStateToProps = state => {


    return {
        chatrooms: state.fetchChatrooms,
        chatmessages: state.fetchChatmessage,
    };
}

export default connect(mapStateToProps, { fetchChatrooms, fetchChatmessages })(ChatPage);