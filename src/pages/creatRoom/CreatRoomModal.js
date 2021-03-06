import React, { Component } from 'react';
import { MDBInput, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import { fetchUsers } from './../../actions/users';
import { createChatroom, fetchChatrooms } from './../../actions/chatroom';

class CreateRoomModal extends Component {

state = {
    checkedItems: new Map(),
    validationError: false,
    modal: false,
    page: 1,
    limit: 10,
};


create = () => {
  let participants = [];
  this.state.checkedItems.forEach((value, key) => {
    if(value)
      participants.push(key);
  });
  if(participants.length !== 0 ) {
    this.setState({ validationError: false });
    let chatroom = {
      'participants': participants,
    };
    if(!this.props.chatroomDetails.isFetching)
      this.props.createChatroom(chatroom);
  } else {
    this.setState({ validationError: true });
  }
};

myChangeHandler = (event) => {
    console.log(event.target.id);
    if(event.target.id === 'participants')
      this.setState({participants: event.target.value});
}

onCheckBoxChange = (event) => {
  const item = event.target.name;
  const isChecked = event.target.checked;
  this.setState(prevState => ({ checkedItems: prevState.checkedItems.set(item, isChecked) }));
}

toggle = () => {
  this.handleRefresh();
  this.setState({
    modal: !this.state.modal
  });
}

handleRefresh = () => {
  this.props.fetchUsers({ page: this.state.page, limit: this.state.limit, filter: 'none' });
}

componentDidMount() {
  this.handleRefresh();
}

componentDidUpdate(prevProps) {
  // Typical usage (don't forget to compare props):
  if (this.props.chatroomDetails !== prevProps.chatroomDetails) {
    if (this.props.chatroomDetails.isSuccess){
      toast('Chatroom created!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      this.props.reloadChatrooms();
      this.toggle();
    }
  }
}

render() {
  return (
    <div style={{display:"inline"}} >
      <MDBBtn onClick={this.toggle}>New</MDBBtn>
      <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
        <MDBModalHeader toggle={this.toggle}>Create Chatroom</MDBModalHeader>
        <MDBModalBody>
        <form className="modal-form" >
            <p className="h5 text-center mb-4">Chat with</p>
            <div className="grey-text">
            {/* Material unchecked */}
            {this.props.fetchedUsers.users.map(({id, name, picture})=>{
              return(
                <MDBInput key={id} label={name} name={id} value={id} onClick={this.onCheckBoxChange} type="checkbox" group id="checkbox1" />
              );
            })}
            </div>
            <div className="text-center">
            <MDBBtn onClick={this.create} >Chat</MDBBtn>
            </div>
        </form>
        </MDBModalBody>
        <MDBModalFooter>
          <MDBBtn color="secondary" onClick={this.toggle}>Close</MDBBtn>
        </MDBModalFooter>
      </MDBModal>
    </div>
    );
  }
}

const mapStateToProps = (state) => ({
  chatroomDetails: state.createChatroom,
  fetchedUsers: state.fetchUsers,
  fetchedRooms: state.fetchChatrooms,
});
const mapDispatchToProps = {
  createChatroom,
  fetchUsers,
  fetchChatrooms,
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateRoomModal);
