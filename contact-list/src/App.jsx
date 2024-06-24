import { useState, useEffect, useContext } from 'react';
import './App.css';
import axios from 'axios';
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

  async function fetchContacts() {
    try {
      const response = await axios.get('https://playground.4geeks.com/contact/agendas/joachimbosch/contacts');
      console.log(response.data);
      setList([response.data]);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const addContact = async () => {
    try {
      const response = await axios.post('https://playground.4geeks.com/contact/agendas/joachimbosch/contacts', form);
      fetchContacts();
      setForm({
        fullName: "",
        phone: "",
        email: "",
        address: "",
        id: "",
      });
      setIsAdding(false)
      console.log(response.data);
    } catch (error) {
      console.error('Error adding contact:', error);
    }
  };

  const deleteContact = async (index) => {
    try {
      await axios.delete(`https://playground.4geeks.com/contact/agendas/joachimbosch/contacts/${id}`);
      fetchContacts();
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };

  let context = { contact, setContact, list, setList, fetchContacts, addContact, deleteContact, form, setForm, isAdding, setIsAdding };

  const handleAddContactClick = () => {
    setIsAdding(true);
  };

  const handleGoBack = () => {
    setIsAdding(false);
    fetchContacts();
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
                  <Card key={index} contact={contact} />
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
