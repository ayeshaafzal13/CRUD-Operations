import {useState, useEffect} from 'react'
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';


const UpdateUser = () => {
        const {id} = useParams()
        const [name, setName] = useState()
        const [email, setEmail] = useState()
        const [age, setAge] = useState()
        const navigate = useNavigate()

        useEffect(() => {
                axios.get('/getUser/'+ id)
                .then(result => {console.log(result)
                   setName(result.data.name)
                   setEmail(result.data.email)
                   setAge(result.data.age)
                })
                .catch(err => console.log(err))
            },[])
     
            const Update = (e) => {
               e.preventDefault()

               if (!name || !email || !age) {
               alert("Please fill in all fields before updating.")
               return
                }
               axios.put("/updateUser/"+id,{name, email, age})
                     .then(result => {
                        console.log(result)
                        navigate('/')
                  })
                     
                     .catch(err => console.log(err))
            }

  return (
    <div className='cute-wrapper'>
         <div className='cute-card'>
            <form onSubmit={Update}>
               <h2 className='cute-title'>🌼 Update User</h2>
               <div className='mb-2'>
                  <label className='cute-label'>Name</label>
                  <input type='text' placeholder='Enter Name' className='form-control cute-input'
                  value ={name} onChange={(e) => setName(e.target.value)}/>
               </div>
               <div className='mb-2'>
                  <label className='cute-label'>Email</label>
                  <input type='email' placeholder='Enter Email' className='form-control cute-input'
                  value = {email} onChange={(e) => setEmail(e.target.value)}/>
               </div>
               <div className='mb-2'>
                  <label className='cute-label'>Age</label>
                  <input type='text' placeholder='Enter Age' className='form-control cute-input'
                  value = {age} onChange={(e) => setAge(e.target.value)}/>
               </div>
               <button className='btn cute-btn-primary'>Update 💫</button>
            </form>
         </div>
     </div>
    
  )
}

export default UpdateUser;