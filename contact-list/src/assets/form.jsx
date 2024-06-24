import MyContext from "../context/context";
import { useState, useContext } from "react";

function Form({ contact, setIsEditing }) {
  const { setContact, fetchContacts, form, setForm } = useContext(MyContext);
  const [localForm, setLocalForm] = useState(contact || {
    name: '',
    email: '',
    phone: '',
    address: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalForm({
      ...localForm,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (contact) {
        const response = await fetch(`https://playground.4geeks.com/contact/agendas/joachimbosch/contacts/${contact.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(localForm),
        });
        if (!response.ok) {
          throw new Error('Error updating contact');
        }
        const updatedContact = await response.json();
        setContact((prevContact) =>
          prevContact.map((el) => (el.id === contact.id ? updatedContact : el))
        );
        setIsEditing(false);
      } else {
        const response = await fetch('https://playground.4geeks.com/contact/agendas/joachimbosch/contacts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(localForm),
        });
        if (!response.ok) {
          throw new Error('Error adding contact');
        }
        const newContact = await response.json();
        setContact((prevContact) => [...prevContact, newContact]);
        setForm({
          name: '',
          email: '',
          phone: '',
          address: '',
        });
      }
      fetchContacts();
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <div className="container border rounded" style={{ width: '50vw' }}>
      <div className="mt-3 mb-5">
        <h2>{contact ? 'Edit Contact' : 'Add a new contact'}</h2>
      </div>
      <form>
        <div className="form-group d-flex flex-column align-items-start pb-2">
          <label className="pb-1" htmlFor="fullName">Full Name:</label>
          <input name="fullName" value={localForm.fullName} type="text" className="form-control" id="name" onChange={handleChange} required />
        </div>
        <div className="form-group d-flex flex-column align-items-start pb-2">
          <label className="pb-1" htmlFor="email">Email address:</label>
          <input name="email" value={localForm.email} type="email" className="form-control" id="email" onChange={handleChange} required />
        </div>
        <div className="form-group d-flex flex-column align-items-start pb-2">
          <label className="pb-1" htmlFor="phone">Phone Number:</label>
          <input name="phone" value={localForm.phone} type="text" className="form-control" id="phone" onChange={handleChange} required />
        </div>
        <div className="form-group d-flex flex-column align-items-start pb-2">
          <label className="pb-1" htmlFor="address">Location:</label>
          <input name="address" value={localForm.address} type="text" className="form-control" id="address" onChange={handleChange} required />
        </div>
        <div className="mt-3 mb-3 d-flex align-items-center">
          <button type="submit" className="btn btn-primary" style={{ width: '50vw' }} onSubmit={handleSubmit}>Save contact</button>
        </div>
      </form>
    </div>
  );
}

export default Form;
