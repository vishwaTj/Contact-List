import './App.css';
import 'bulma/css/bulma.css';

function App() {
  const FetchData = async() =>{
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await response.json();
    console.log(data);
  
  }
  FetchData();

  return (
    <>
       <div>
         <div id="Main-container">
            <header>
              <h1>Contact List</h1>
            </header>
              <div className='input-container'>
                <form>
                  <label className='label'>Name</label>
                  <input className='input' type="text" placeholder='Name'></input>
                  <label className='label'>Number</label>
                  <input className='input' type="text" placeholder='number'></input>
                  <label className='label'>Email</label>
                  <input className='input' type="email" placeholder='Email'></input>
                  <button type="submit">Submit</button>
                </form>
              </div> 
         </div>
       </div>    
    </>
  );
}

export default App;
