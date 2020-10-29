import React from "react";
import { MDBListGroupItem, MDBBadge, MDBIcon} from "mdbreact";

import {convertDate, trunc} from './../config/functions';

const Chatroom = ({
  friend: { id, name, creator, user2, message, createdAt, participants, seen, toRespond, active },
  setChatRoom
}) => (
  <MDBListGroupItem
    href="#!"
    className="d-flex justify-content-between p-2 border-light"
    style={{ backgroundColor: active ? "#eeeeee" : "" }}
    onClick={() => setChatRoom(id)}
  >
    <img
      src={user2.picture}
      alt="avatar"
      style={{width: "57px", height: "57px", borderRadius:"57px"}}
      className="mr-2 z-depth-1"
    />
    <div style={{ fontSize: "0.95rem" }}>
      <strong>{user2.name}</strong>
      <p className="text-muted">{message}</p>
    </div>
    <div>
      <p className="text-muted mb-0" style={{ fontSize: "0.75rem" }}>
        {convertDate(createdAt)}
      </p>
      {seen ? (
        <span className="text-muted float-right">
          <i className="fa-check" aria-hidden="true" ></i>
        </span>
      ) : toRespond ? (
        <MDBBadge color="danger" className="float-right">
          {toRespond}
        </MDBBadge>
      ) : (
        <span className="text-muted float-right">
          <MDBIcon icon="reply" aria-hidden="true" />
        </span>
      )}
    </div>
  </MDBListGroupItem>
);


export default Chatroom;