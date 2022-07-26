import React,{ useState } from 'react'
import './login.css';

function LoginForm({Login,error}) {
  const [details, setDetails] = useState({ email: "", password: ""})

  const submitHandler = e => {
    e.preventDefault();
    Login(details);
  }
  return (
    <form className='login-display' onSubmit={submitHandler}>
    <div className='form-login'>
    <h2>Login</h2>
    {(error !== "") ? (<div className='login-error'>{error}</div>) : ""}
    
    <div className='form-login2'>
        <label htmlFor='email'>Email:</label>
        <input type="email" name ="email" id ="email" onChange={e => setDetails({...details,email: e.target.value})} value ={details.email}/>
    </div>
    <div className='form-login2'>
        <label htmlFor='password'>Password:</label>
        <input type="password" name ="password" id ="password" onChange={e => setDetails({...details,password:e.target.value})} value ={details.password}/>
    </div>
    <input type="submit" value="LOGIN" />
    
    <div className='guest'>
      
     <a href="/Guest">Login as Guest</a><br/>
     <a href="/Register">Register</a>
    </div></div>
    </form>
  )
}

export default LoginForm