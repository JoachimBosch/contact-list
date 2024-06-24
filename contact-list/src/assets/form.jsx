import MyContext from "../context/context";
import { useState, useContext } from "react";
import axios from "axios";

function Form({ contact, setIsEditing }) {
  const { setContact, addContact, fetchContacts, setIsAdding } = useContext(MyContext);
  const [form, setForm] = useState(contact || {
    name: '',
    email: '',
    phone: '',
    address: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (contact) {
      axios.put(`https://playground.4geeks.com/contact/agendas/joachimbosch/contacts/${contact.id}`, form)
        .then(response => {
          setContacts(prevContacts => prevContacts.map(el => el.id === contact.id ? response.data : el));
          setIsEditing(false);
        })
        .catch(error => console.error('Error updating contact:', error));
    } else {
      axios.post('https://playground.4geeks.com/contact/agendas/joachimbosch/contacts', form)
        .then(response => {
          setContact(prevContacts => [...prevContacts, response.data]);
          setForm({
            name: '',
            email: '',
            phone: '',
            address: '',
          });
        })
        .catch(error => console.error('Error adding contact:', error));
    }
  };

  return (
    <div className="container border rounded" style={{ width: '50vw' }}>
      <div className="mt-3 mb-5">
        <h2>{contact ? 'Edit Contact' : 'Add a new contact'}</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group d-flex flex-column align-items-start pb-2">
          <label className="pb-1" htmlFor="name">Full Name:</label>
          <input name="name" value={form.name} type="text" className="form-control" id="name" onChange={handleChange} required />
        </div>
        <div className="form-group d-flex flex-column align-items-start pb-2">
          <label className="pb-1" htmlFor="email">Email address:</label>
          <input name="email" value={form.email} type="email" className="form-control" id="email" onChange={handleChange} required />
        </div>
        <div className="form-group d-flex flex-column align-items-start pb-2">
          <label className="pb-1" htmlFor="phone">Phone Number:</label>
          <input name="phone" value={form.phone} type="text" className="form-control" id="phone" onChange={handleChange} required />
        </div>
        <div className="form-group d-flex flex-column align-items-start pb-2">
          <label className="pb-1" htmlFor="address">Location:</label>
          <input name="address" value={form.address} type="text" className="form-control" id="address" onChange={handleChange} required />
        </div>
        <div className="mt-3 mb-3 d-flex align-items-center">
          <button type="submit" className="btn btn-primary" style={{ width: '50vw' }}>Save contact</button>
        </div>
      </form>
    </div>
  );
}

export default Form;
