import React from 'react';
import {
    MDBEdgeHeader,
    MDBFreeBird,
    MDBCol,
    MDBRow,
    MDBCardBody,
  } from 'mdbreact';
import './HomePage.css';
import LoginModal from "./../auth/LoginModal";
import RegisterModal from './../user/RegisterModal';
import { connect } from 'react-redux';
class HomePage extends React.Component {
    gotoChats = () => {
      this.props.history.push("/chat");
    }
    render() {
      return (
        <>
          <MDBEdgeHeader color='indigo darken-3' className='sectionPage' />
          <div className='mt-3 mb-5'>
            <MDBFreeBird>
              <MDBRow>
                <MDBCol
                  md='10'
                  className='mx-auto float-none white z-depth-1 py-2 px-2'
                >
                  <MDBCardBody className='text-center'>
                    <h2 className='h2-responsive mb-4'>
                      <strong className='font-weight-bold'>
                        <img
                          src='https://mdbootstrap.com/img/Marketing/other/logo/logo-mdb-react-small.png'
                          alt='mdbreact-logo'
                          className='pr-2'
                        />
                        Chat App in React
                      </strong>
                    </h2>
                    <MDBRow />
                    <p>React Bootstrap with Material Design</p>
                    <p className='pb-4'>
                      This chat application was build on React MDB.
                    </p>
                    <MDBRow className='d-flex flex-row justify-content-center row'>
                      <LoginModal gotoChats={this.gotoChats} />
                      <RegisterModal/>
                    </MDBRow>
                  </MDBCardBody>
                </MDBCol>
              </MDBRow>
            </MDBFreeBird>
          </div>
        </>
      );
    }
  }
  const mapStateToProps = (state) => ({
  });
  const mapDispatchToProps = {
  }

export default connect(mapStateToProps , mapDispatchToProps)(HomePage);