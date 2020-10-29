import React, { Component } from "react";
import { MDBCard, MDBCardBody} from "mdbreact";

import {convertDate, trunc} from './../config/functions';

const ChatMessage = ({ message: { author, creator, createdAt, message } }) => (
  <li className="chat-message d-flex justify-content-between mb-4">
    <img
      tag="img"
      src={creator.picture}
      alt="avatar"
      style={{width: "57px", height: "57px"}}
      className="mx-2 z-depth-1"
    />
    <MDBCard>
      <MDBCardBody>
        <div>
          <strong className="primary-font">{creator.name}</strong>
          <small className="pull-right text-muted">
            <i className="far fa-clock" /> {convertDate(createdAt)}
          </small>
        </div>
        <hr />
        <p className="mb-0">{message}</p>
      </MDBCardBody>
    </MDBCard>
  </li>
);

export default ChatMessage;