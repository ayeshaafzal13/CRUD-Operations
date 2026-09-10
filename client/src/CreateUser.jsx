import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function CreateUser () {
   const [name, setName] = useState()
   const [email, setEmail] = useState()
   const [age, setAge] = useState()
   const navigate = useNavigate()

   const Submit = (e) => {
      e.preventDefault();

      if (!name || !email || !age) {
      alert("Please fill in all fields before adding a user.")
      return
   }
      axios.post("/createUser",{name, email, age})
      .then(result => {
         console.log(result)
         navigate('/')
   })
      
      .catch(err => console.log(err))
   }

  return (
     <div className='cute-wrapper'>
         <div className='cute-card'>
            <form onSubmit={Submit}>
               <h2 className='cute-title'>🌷 Add a New User</h2>
               <div className='mb-2'>
                  <label className='cute-label'>Name</label>
                  <input type='text' placeholder='Enter Name' className='form-control cute-input'
                  onChange={(e) => setName(e.target.value)}/>
               </div>
               <div className='mb-2'>
                  <label className='cute-label'>Email</label>
                  <input type='text' placeholder='Enter Email' className='form-control cute-input'
                  onChange={(e) => setEmail(e.target.value)}/>
               </div>
               <div className='mb-2'>
                  <label className='cute-label'>Age</label>
                  <input type='text' placeholder='Enter Age' className='form-control cute-input'
                  onChange={(e) => setAge(e.target.value)}/>
               </div>
               <button className='btn cute-btn-primary'>Submit </button>
            </form>
         </div>
     </div>
    
  )
}

export default CreateUser;