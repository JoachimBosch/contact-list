import { useState, useEffect, useContext } from 'react';
import './App.css';
import MyContext from './context/context';
import Card from './assets/card';
import Form from './assets/form';

function App() {
  const [contact, setContact] = useState("");
  const [list, setList] = useState([]);
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    id: "",
  });
  const [isAdding, setIsAdding] = useState(false);

  const fetchContacts = async () => {
    try {
      const response = await fetch('https://playground.4geeks.com/contact/agendas/joachimbosch/contacts');
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
      await fetch(`https://playground.4geeks.com/contact/agendas/joachimbosch/contacts}`, {
        method: 'POST', 
        headers: {"Content-type": "application/json"},
        body: JSON.stringify({
          name: form.fullName, 
          phone: form.phone, 
          email: form.email,
          address: form.address,
          })
        });
        fetchContacts();
        setForm({
          fullName: "",
          phone: "",
          email: "",
          address: "",
          id: "",
        });
        setIsAdding(false);
        fetchContacts();
      } catch (error) {
        console.error('Error adding contact:', error);
      }
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

  let context = { contact, setContact, list, setList, fetchContacts, addContact, deleteContact, form, setForm, isAdding, setIsAdding };

  const handleAddContactClick = () => {
    setIsAdding(true);
  };

  const handleGoBack = () => {
    setIsAdding(false);
  };

  return (
    <>
      <MyContext.Provider value={context}>
        <div>
          {isAdding ? (
            <Form />
          ) : (
            <div>
              <div className="container d-flex flex-row justify-content-end mb-3" style={{ width: '50vw' }}>
                <button type="button" className="btn btn-success" onClick={handleAddContactClick}>Create new contact</button>
              </div>
              <div>
              {Array.isArray(list) && list.map((contact, index) => (
                  <Card key={index} contact={contact} index={index}/>
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
