import axios from 'axios';
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

function Users () {
    const [users, setUsers] = useState([])

    useEffect(() => {
        axios.get('/api/users')
        .then(result => setUsers(result.data))
        .catch(err => console.log(err))
    },[])

    const handleDelete = (id) => {
        axios.delete('/deleteUser/'+id)
        .then(res => {console.log(res)
            window.location.reload()
        })
        .catch(err => console.log(err))
    }
  return (
    <div className='cute-wrapper'>
        <div className='cute-card'>
            <Link to='/create' className='btn cute-btn-primary mb-3'> Add +</Link>
            <table className='table cute-table'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Age</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {   users.map((user) => {
                            return <tr>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.age}</td>
                                <td>
                                    <div className='cute-actions'>
                                    <Link to={`/update/${user._id}`} className='btn cute-btn-primary'>✏️ Edit</Link>
                                    <button className='btn cute-btn-danger' onClick={(e) => handleDelete(user._id)}>🗑️ Delete</button>
                                    </div>
                                </td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default Users;