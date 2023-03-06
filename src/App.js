import './App.css';
import 'bulma/css/bulma.css';
import { useState, useEffect } from 'react';
import Contact from './Contact';

function App() {
  let apiData =[];
  const [Contacts,SetContacts] = useState([]);
  const FetchData = async() =>{
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await response.json();
    for(let i=0;i<data.length;i++){
      apiData.push({ 
        phone:data[i].phone,
        name:data[i].name,
        email:data[i].email});
    }
    // SetContacts(apiData);
  }

  // useEffect(() => {
  //   // first
  
  //   // return () => {
  //   //   second
  //   // }
  //   FetchData();
  // }, [FetchData])
  
  // FetchData();
  const [Value,setValue]= useState({
    phone:"",
    name:"",
    email:""
  })
  
  const [IsEditing,SetEditing] = useState(false);

  const [Show,SetShow] = useState(false);
  const ShowInput= () => {
    SetShow(!Show);
  }

  const AddContact = (e) =>{
    if(!Value) return;
    SetContacts([...Contacts,{
      id:crypto.randomUUID().split("-")[0],
      phone:Value.phone,
      email:Value.email,
      name:Value.name
    }])
    SetShow(false);
    console.log(Contacts);
  }

  const EditContact = (id) =>{
    console.log("update");
    SetEditing(true);
    const idx = Contacts.findIndex(elem => elem.id === id);
    const Element_to_edit = Contacts[idx];
    setValue({
      phone:Element_to_edit.phone,
      name:Element_to_edit.name,
      email:Element_to_edit.email
     });
    ShowInput();
  }
  const DeleteContact=(id)=>{
    console.log("Hello");
    const filteredArr = Contacts.filter(elem => elem.id != id);
    SetContacts([...filteredArr]);
  }
  
  const UpdateValue = () =>{
    console.log("Update Value");
    const idx = Contacts.findIndex(elem => elem.name === Value.name);
    const Element_to_edit = Contacts[idx];
    console.log(Element_to_edit);
    Contacts[idx] = { ...Contacts[idx],
                        phone:Value.phone,
                        name:Value.name,
                        email:Value.email}
    console.log(Contacts[idx]);
    SetShow(false);
  }
 
  return (
    <>
       <div>
         <div id="Main-container">
            <header id="header">
              <h1>Contact List</h1>
            </header>

            <div id="box">
                <span id="button" onClick={()=>ShowInput()}>{IsEditing? "Update":"Add Contact"}</span>
                { Show == true && <form action="" id="form">
                  <p><input 
                        type="text"
                        value={Value.name}
                        placeholder="name"
                        onChange={(e)=>setValue({name:e.target.value})}/>
                  </p>
                  <p><input 
                        type="text"
                        placeholder="phone"
                        value={Value.phone}
                        onChange={(e)=>setValue({...Value,phone:e.target.value})}
                        />
                  </p>
                  <p><input 
                        type="email"
                        placeholder="email"
                        value={Value.email}
                        onChange={(e)=>setValue({...Value,email:e.target.value})}
                        />
                  </p>
                  <p><input type="button" value={IsEditing? "Update":"Add Contact"} onClick={IsEditing ? (()=>UpdateValue()):(()=>AddContact())} /></p>
                </form>}
            </div>

            {/* <div className='input-container'>
              <form>
                <label className='label'>Name</label>
                <input className='input' type="text" placeholder='Name'></input>
                <label className='label'>Number</label>
                <input className='input' type="text" placeholder='number'></input>
                <label className='label'>Email</label>
                <input className='input' type="email" placeholder='Email'></input>
                <button type="submit">Submit</button>
              </form>
            </div>  */}
           
            {/* contact cards display */}
            <section>
               {Contacts.map((contact,index)=>
                 (
                  
                  <Contact contact={contact} index={index} EditContact={EditContact} DeleteContact={DeleteContact}/>
                    
                 ))}   
            </section>
         </div>
       </div>    
    </>
  );
}

export default App;
