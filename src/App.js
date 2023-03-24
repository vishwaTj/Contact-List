import './App.css';
import 'bulma/css/bulma.css';
import { useState, useEffect } from 'react';
import Contact from './Contact';

function App() {

  let apiData =[];
  // State variable to store contacts
  const [Contacts,SetContacts] = useState([{phone:"",name:"",email:""}]);

  // function to fetch data
  const FetchData = async() =>{
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await response.json();
    apiData = [...data];
    SetContacts(apiData);
  }

  useEffect(() => {
    FetchData();
  }, [])
  
  // state variable to fill the input box
  const [Value,setValue]= useState({
    phone:"",
    name:"",
    email:""
  })
  

  //state variable to check if is editing stage or adding stage
  const [IsEditing,SetEditing] = useState({
         editing:false,
         Edit_id:""}
        );

  //state variable to control the input box      
  const [Show,SetShow] = useState(false);
  const ShowInput= () => {
    SetShow(!Show);
  }

  // ---------------------  functions to control the web page ---------------------------

  // function to add a new contact
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

  //function to Edit a contact and store the id of the contact being edited
  const EditContact = (id) =>{
    if(IsEditing.editing){
        SetEditing({...IsEditing,
                    editing:false});
        setValue({});
        SetShow(false);
        return;
      }
      SetEditing({ 
              editing:true,
              Edit_id:id});
      const idx = Contacts.findIndex(elem => elem.id === id);
      const Element_to_edit = Contacts[idx];
      setValue({
          phone:Element_to_edit.phone,
          name:Element_to_edit.name,
          email:Element_to_edit.email
      });
      
      ShowInput();
  }


  //function to delete a contact
  const DeleteContact=(id)=>{
    console.log("Hello");
    const filteredArr = Contacts.filter(elem => elem.id !== id);
    SetContacts([...filteredArr]);
  }
  

  //function to update the edited contact value in the contact list
  const UpdateValue = () =>{
    console.log("Update Value");
    const idx = Contacts.findIndex(elem => elem.id === IsEditing.Edit_id);
    const Element_to_edit = Contacts[idx];
    console.log(Element_to_edit);
    Contacts[idx] = { ...Contacts[idx],
                        phone:Value.phone,
                        name:Value.name,
                        email:Value.email}
    console.log(Contacts[idx]);
    console.log(Value);
    SetEditing(false);
    setValue({});
    SetShow(false);
  }


 
  return (
    <>
       <div>
         <div id="Main-container">

           {/* Header and button section of HTML */}
            <header id="header">
              <h1>Contact List</h1>
            </header>

            <div id="box">
                <span id="button" onClick={()=>ShowInput()}>{IsEditing.editing ? "Update":"Add Contact"}</span>
                { Show === true && <form action="" id="form">
                  <p><input 
                        type="text"
                        value={Value.name}
                        placeholder="name"
                        onChange={(e)=>setValue({...Value,name:e.target.value})}/>
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
                  <p><input type="button" value={IsEditing.editing? "Update":"Add Contact"} onClick={IsEditing.editing ? (()=>UpdateValue()):(()=>AddContact())} /></p>
                </form>}
            </div>

            {/* *********************************** */}
           


            {/*  ***************** contact cards display ****************** */}
            <section>
               {Contacts.map((contact,index)=>
                 (
                  
                  <Contact contact={contact} index={index} EditContact={EditContact} DeleteContact={DeleteContact}/>
                    
                 ))}   
            </section>
            {/* ***************************** */}
         </div> 
       </div>    
    </>
  );
}

export default App;
