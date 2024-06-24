import React, { useState, useContext } from "react";
import MyContext from "../context/context";
import './Schwarzenegger.jpg';
import Form from "./form";
import axios from "axios";

function Card({ contact }) {
  const [isEditing, setIsEditing] = useState(false);
  const { setContacts, deleteContact, fetchContacts } = useContext(MyContext);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleDeleteClick = () => {
    deleteContact(contact.id);
  };

  return (
    <div>
      {isEditing ? (
        <Form contact={contact} setIsEditing={setIsEditing} />
      ) : (
        <div className="container border rounded d-flex flex-row" style={{ width: '50vw' }}>
          <div className="col-3">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/A._Schwarzenegger.jpg/220px-A._Schwarzenegger.jpg" className="img-thumbnail rounded-circle my-2" style={{ width: "150px", height: "150px" }} />
          </div>
          <div className="col-7 d-flex flex-column align-items-start ps-3">
            <div><p>{contact.name}</p></div>
            <div className="d-flex flex-row"><i className="fa-solid fa-location-pin"></i>&nbsp;&nbsp;<p>{contact.location}</p></div>
            <div className="d-flex flex-row"><i className="fa-solid fa-phone"></i>&nbsp;&nbsp;<p>{contact.phone}</p></div>
            <div className="d-flex flex-row"><i className="fa-solid fa-envelope"></i>&nbsp;&nbsp;<p>{contact.email}</p></div>
          </div>
          <div className="col-2 d-flex flex-row justify-content-end">
            <button className="bg-white d-flex justify-content-start" style={{ height: "40px" }} onClick={handleEditClick}><i className="fa-solid fa-pencil bg-white"></i></button>
            <button className="bg-white d-flex justify-content-start" style={{ height: "40px" }} onClick={handleDeleteClick}><i className="fa-solid fa-trash bg-white"></i></button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Card;