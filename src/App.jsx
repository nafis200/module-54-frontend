import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState([])
  useEffect(()=>{
      fetch('http://localhost:5003/users')
      .then(res=> res.json())
      .then(data => setCount(data))
  },[])

  const handleuser = e=>{
       e.preventDefault();
       const form = e.target;
       const email = form.email.value
       const password = form.password.value 
       const user = {email,password}
       console.log(user);
       fetch('http://localhost:5003/users',{
          method: 'POST',
          headers:{
            'content-type' : 'application/json'
          },
          body:JSON.stringify(user)
       })
       .then(res => res.json())
       .then(data =>{
           console.log(data)
           const newUsers = [...count,data]
           setCount(newUsers)

           form.reset();
       })
       
  }
  return (
    <>
  <form onSubmit={handleuser} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" placeholder="email" 
          name="email"
          className="input input-bordered" />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" placeholder="password" 
          name = "password"
          className="input input-bordered" />
          <label className="label">
            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
          </label>
        </div>
        <div className="form-control mt-6">
          {/* <button className="btn btn-primary">Login</button> */}
          <input className="btn btn-primary" type="submit" value="Submit" />
        </div>
      </form>


      <h1>hellow world:{count.length}</h1>

      <div>
      {
        count.map(user => <p> <span>{user.id}</span> {user.email}</p>)
      }
      </div>

      

    </>
  )
}

export default App
