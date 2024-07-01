import { createContext, useState, useEffect } from "react";
const MyContext = createContext(null);

export const MyProvider = ({ children }) => {

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
  
    const handleAddContactClick = () => {
      setIsAdding(true);
    };
  
    const handleGoBack = () => {
      setIsAdding(false);
      setIsEditing(false);
      setContact({
        name: "",
        phone: "",
        email: "",
        address: "",
      });
    };

    let theContext = { contact, setContact, list, setList, fetchContacts, addContact, deleteContact, isAdding, setIsAdding, editContact,  isEditing, setIsEditing, setCurrentContactId, currentContactId, handleAddContactClick, handleGoBack }

    return (
        <MyContext.Provider value={theContext}>
          {children}
        </MyContext.Provider>
      );
}

export default MyContext