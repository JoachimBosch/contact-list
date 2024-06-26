import MyContext from "../context/context";
import { useState, useContext } from "react";

function Form(props) {
  const { contact, setContact, addContact } = useContext(MyContext);
  
  return (
  
    <div className="container border rounded" style={{ width: '50vw' }}>
      <div className="mt-3 mb-5">
        <h2>{contact ? 'Edit contact' : 'Add a new contact'}</h2>
      </div>
      <form>
        <div className="form-group d-flex flex-column align-items-start pb-2">
          <label className="pb-1" htmlFor="name">Full Name:</label>
          <input name="name" value={contact.name} type="text" className="form-control" id="name" onChange={(e) => setContact({
                                ...contact,
                                name: e.target.value})} required />
        </div>
        <div className="form-group d-flex flex-column align-items-start pb-2">
          <label className="pb-1" htmlFor="email">Email address:</label>
          <input name="email" value={contact.email} type="email" className="form-control" id="email" onChange={(e) => setContact({
                                ...contact,
                                email: e.target.value})} required />
        </div>
        <div className="form-group d-flex flex-column align-items-start pb-2">
          <label className="pb-1" htmlFor="phone">Phone Number:</label>
          <input name="phone" value={contact.phone} type="text" className="form-control" id="phone" onChange={(e) => setContact({
                                ...contact,
                                phone: e.target.value})} required />
        </div>
        <div className="form-group d-flex flex-column align-items-start pb-2">
          <label className="pb-1" htmlFor="address">Location:</label>
          <input name="address" value={contact.address} type="text" className="form-control" id="address" onChange={(e) => setContact({
                                ...contact,
                                address: e.target.value})} required />
        </div>
        <div className="mt-3 mb-3 d-flex align-items-center">
          <button type="submit" className="btn btn-primary" style={{ width: '50vw' }} onSubmit={addContact}>Save contact</button>
        </div>
      </form>
    </div>

  )};

export default Form;
