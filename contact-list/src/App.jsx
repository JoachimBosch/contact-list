
import { useState, useEffect, useContext } from 'react';
import './App.css';
import MyContext from './context/context';
import Card from './assets/card';
import Form from './assets/form';


function App() {
  const [list, setList] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentContactId, setCurrentContactId] = useState(null);

  const [contact, setContact] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  });

  const fetchContacts = async () => {
    try {
      const response = await fetch('https://playground.4geeks.com/contact/agendas/joachimbosch/contacts/');
      const apiList = await response.json();
      setList(apiList.contacts);
      console.log(apiList.contacts);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const addContact = async () => {
    try {
      let body = JSON.stringify({
        name: contact.name, 
        phone: contact.phone, 
        email: contact.email,
        address: contact.address,
      })
      const response = await fetch(`https://playground.4geeks.com/contact/agendas/joachimbosch/contacts/`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: body});
        await response.json();
        console.log(response);
    } catch (error) {
      console.error('Error adding contact:', error);
    };
    fetchContacts();
  };

  const deleteContact = async (index) => {
    try {
        await fetch(`https://playground.4geeks.com/contact/agendas/joachimbosch/contacts/${list[index].id}`, {
        method: "DELETE"
    });
      fetchContacts();
    } catch (error) {
    console.error('Error deleting contact:', error)
    }
  };

  const editContact = async (currentContactId) => {
    try {
      let body = JSON.stringify({
        name: contact.name, 
        phone: contact.phone, 
        email: contact.email,
        address: contact.address,
      })
      const response = await fetch(`https://playground.4geeks.com/contact/agendas/joachimbosch/contacts/${currentContactId}`, {
                                method: 'PUT', 
                                headers: {"Content-type": "application/json"}, body: body});
                                await response.json();
                                console.log(response);
    } catch (error) {
      console.error('Error adding contact:', error);
    };
    fetchContacts();
    setContact({
      name: "",
      phone: "",
      email: "",
      address: "",
    })
  };

  let context = { contact, setContact, list, setList, fetchContacts, addContact, deleteContact, isAdding, setIsAdding, editContact,  isEditing, setIsEditing, setCurrentContactId, currentContactId };

  const handleAddContactClick = () => {
    setIsAdding(true);
  };

  const handleGoBack = () => {
    setIsAdding(false);
    setIsEditing(false);
  };

  return (
    <>
      <MyContext.Provider value={context}>
        <div>
          {isAdding  || isEditing ? (
            <Form initialContact={contact} setIsAdding={setIsAdding}/>
          ) : (
            <div>
              <div className="container d-flex flex-row justify-content-end mb-3" style={{ width: '50vw' }}>
                <button type="button" className="btn btn-success" onClick={handleAddContactClick}>Create new contact</button>
              </div>
              <div>
              {list && list.map((el, index) => (
                  <Card key={el.id} name={el.name} address={el.address} phone={el.phone} email={el.email} index={index} id={el.id}/>
                ))}
              </div>
            </div>
          )}
          {isAdding && <div className="mt-3 mb-3">
            <button onClick={handleGoBack} className="btn btn-success" style={{ width: '50vw' }}>Go back to contacts list</button></div>}
        </div>
      </MyContext.Provider>
    </>
  );
}

export default App;
