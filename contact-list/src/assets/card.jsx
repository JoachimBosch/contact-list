import React from "react";
import { useState, useContext } from "react";
import MyContext from "../context/context";
import './Schwarzenegger.jpg';
import Form from "./form";


function Card(props) {
  const [isEditing, setIsEditing] = useState(false);
  const { deleteContact } = useContext(MyContext);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleDeleteClick = () => {
    deleteContact(props.index);
  };

  return (
    <div>
      {isEditing ? (
        <Form contact={props.contact} setIsEditing={setIsEditing} />
      ) : (
        <div className="container border rounded d-flex flex-row mb-2" style={{ width: '50vw' }}>
          <div className="col-3">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Arnold_Schwarzenegger_by_Gage_Skidmore_4.jpg/330px-Arnold_Schwarzenegger_by_Gage_Skidmore_4.jpg" className="img-thumbnail rounded-circle my-2" style={{ width: "150px", height: "150px" }} />
          </div>
          <div className="col-7 d-flex flex-column align-items-start ps-3" >
            <div><p>{props.name}</p></div>
            <div className="d-flex flex-row"><i className="fa-solid fa-location-pin"></i>&nbsp;&nbsp;<p>{props.address}</p></div>
            <div className="d-flex flex-row"><i className="fa-solid fa-phone"></i>&nbsp;&nbsp;<p>{props.phone}</p></div>
            <div className="d-flex flex-row"><i className="fa-solid fa-envelope"></i>&nbsp;&nbsp;<p>{props.email}</p></div>
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