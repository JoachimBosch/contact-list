
import { useContext } from 'react';
import './App.css';
import MyContext from './context/context';
import Card from './assets/card';
import Form from './assets/form';


function App() {
  const { isAdding, isEditing, setIsAdding, handleAddContactClick, list, handleGoBack, contact } = useContext(MyContext)

  return (
    <>
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
          {isEditing && <div className="mt-3 mb-3">
            <button onClick={handleGoBack} className="btn btn-success" style={{ width: '50vw' }}>Cancel Edit</button></div>}
        </div>
    </>
  );
}

export default App;
