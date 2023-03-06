import React from 'react'

const Contact = ({contact,index,EditContact,DeleteContact}) => {
  return (
      <div className='contact-card' key={index}>
        {console.log(index)}
        <div className='contact-info'> 
            <h3>{contact.name}</h3>
            <p>{contact.email}</p>
            <p>{contact.phone}</p>
            </div> 

            <div className='delete-btn'>
               <i className="fa-regular fa-pen-to-square position" onClick={()=>EditContact(contact.id)}></i> 
            </div>
            <div className='delete-btn'>
               <i className="fa-solid fa-trash-can position" onClick={()=>DeleteContact(contact.id)}></i>
            </div>
      </div>
  )
}

export default Contact;