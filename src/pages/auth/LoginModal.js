import React, { Component } from 'react';
import { MDBInput, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
import { connect } from 'react-redux';
import {loginUser, getToken} from './../../actions/users';

class LoginModal extends Component {

  state = {
    email: '',
    password: '',
    validationError: false,
    modal: true,
  };

  login = () => {
    console.log(this.state);
    if (this.state.email !== '' && this.state.password !== '') {
      this.setState({ validationError: false });
      let user = {
        'email': this.state.email,
        'password': this.state.password,
      };
      if(!this.props.userDetails.isFetching)
        this.props.loginUser(user);
    } else {
      this.setState({ validationError: true });
    }
  };

  myChangeHandler = (event) => {
    console.log(event.target.id);
    if(event.target.id === 'email')
      this.setState({email: event.target.value});
    else if(event.target.id === 'password')
      this.setState({password: event.target.value});
  }
toggle = () => {
  this.setState({
    modal: !this.state.modal
  });
}

render() {
  if(this.props.userDetails.isAuthenticated)
    window.open('/chat', '_self');
  return (
    <div>
      <MDBBtn onClick={this.toggle}>Login</MDBBtn>
      <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
        <MDBModalHeader toggle={this.toggle}>User Authentication</MDBModalHeader>
        <MDBModalBody>
        <form className="modal-form" >
            <p className="h5 text-center mb-4">Sign in</p>
            <div className="grey-text">
            <MDBInput id="email" label="Type your email" icon="envelope" group type="email" 
              onChange={this.myChangeHandler}
              validate error="wrong"
              
                success="right" />
            <MDBInput id="password" label="Type your password" icon="lock" group type="password"
              onChange={this.myChangeHandler}
              validate />
            </div>
            <div className="text-center">
            <MDBBtn onClick={this.login} >Login</MDBBtn>
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
  userDetails: state.userLogin,
});
const mapDispatchToProps = {
  loginUser
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginModal);
