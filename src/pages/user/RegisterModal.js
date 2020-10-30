import React, { Component } from 'react';
import { MDBInput, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import {createUser, fetchUsers, getToken} from './../../actions/users';

class RegisterModal extends Component {

  state = {
    email: '',
    password: '',
    name: '',
    phonenumber: '',
    validationError: false,
    modal: false,
  };

  login = () => {
    console.log(this.state);
    if (this.state.email !== '' && this.state.name !== '' && this.state.phonenumber !== '' && this.state.password !== '') {
      this.setState({ validationError: false });
      let user = {
        'email': this.state.email,
        'name': this.state.name,
        'phonenumber': this.state.phonenumber,
        'password': this.state.password,
      };
      if(!this.props.newUserDetails.isFetching)
        this.props.createUser(user);
    } else {
      this.setState({ validationError: true });
    }
  };

  myChangeHandler = (event) => {
    console.log(event.target.id);
    if(event.target.id === 'email')
      this.setState({email: event.target.value});
    else if(event.target.id === 'name')
      this.setState({name: event.target.value});
    else if(event.target.id === 'phonenumber')
      this.setState({phonenumber: event.target.value});
    else if(event.target.id === 'password')
      this.setState({password: event.target.value});
  }
toggle = () => {
  this.setState({
    modal: !this.state.modal
  });
}

componentDidUpdate(prevProps) {
  // Typical usage (don't forget to compare props):
  if (this.props.newUserDetails !== prevProps.newUserDetails) {
    if (this.props.newUserDetails.isSignedUp){
      toast(':) User Registered! Go ahead and signIn mate!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      this.toggle();
    }
  }
}

render() {
  return (
    <div>
      <MDBBtn color="primary" onClick={this.toggle}>Register</MDBBtn>
      <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
        <MDBModalHeader toggle={this.toggle}>User Registration</MDBModalHeader>
        <MDBModalBody>
        <form className="modal-form">
            <p className="h5 text-center mb-4">Sign up</p>
            <div className="grey-text">
            <MDBInput id="email" label="Type your email" icon="envelope" group type="email" 
              onChange={this.myChangeHandler}
              validate error="wrong"
                success="right" />
            <MDBInput id="name" label="Type your name" icon="envelope" group type="text" 
              onChange={this.myChangeHandler}
              validate error="wrong"
                success="right" />
            <MDBInput id="phonenumber" label="Type your phone number" icon="envelope" group type="text" 
              onChange={this.myChangeHandler}
              validate error="wrong"
                success="right" />
            <MDBInput id="password" label="Type your password" icon="lock" group type="password"
              onChange={this.myChangeHandler}
              validate />
            </div>
            <div className="text-center">
            <MDBBtn onClick={this.login} >Register</MDBBtn>
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
  newUserDetails: state.userSignup,
  userDetails: state.fetchUsers,
});
const mapDispatchToProps = {
  createUser,
  fetchUsers,
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterModal);
