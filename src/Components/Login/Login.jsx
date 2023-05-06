import  {React,useState } from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './Login.css'
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import baseUrl from '../../api'

const Login = () => {
    const navigate = useNavigate()
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")


    const handleLogin =(event)=>{
        event.preventDefault()
        axios.post(`${baseUrl}/api/Admin/admin/login`,{
            email: email,
            password: password
        }).then(response =>{
            localStorage.setItem("id", response.data.id);
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("username", response.data.username);
            navigate('/home')
        }).catch(error =>console.log(error))
    }

  return (
    <div className='body-login'>
      <Container className = "login-container">
        <div className="main-login">
            <Form className='main-form-login'>
                <label></label>
                    <Form.Label className='main-txt-login'>Hti Space Admin Login</Form.Label>
                    <br />
                    <Form.Label>Sign in to continue</Form.Label>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control type="email" placeholder="Enter email" onChange={(e)=>setEmail(e.target.value)}/>
                    <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Control type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
                </Form.Group>
                <Button onClick={handleLogin} variant="primary" type="submit" className='login-btn'>
                    sign in
                </Button>
                <Form.Group className="mb-3 forget-check" controlId="formBasicCheckbox" >
                    <Form.Check type="checkbox" label="Kepp me Signed in" />
                    <NavLink  className="forget-pass">Forget Password ?</NavLink>
                </Form.Group> 
                <Form.Group className='mb-3 donot-have-account'>
                    Don't have an account? <NavLink to='/signup'>Create</NavLink>
                </Form.Group>
        </Form>
        </div>
      </Container>
    </div>
  );
}

export default Login;
