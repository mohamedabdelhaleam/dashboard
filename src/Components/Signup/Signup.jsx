import  {React,useState } from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './Signup.css'
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import baseUrl from '../../api'

const Signup = () => {
    const navigate = useNavigate()
    const [userName,setUserName] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [confirmPassword,setConfirmPassword] = useState("")


    const handleLogin =(event)=>{
        event.preventDefault()
        axios.post(`${baseUrl}/api/Admin/register/admin`,{
            email: email,
            password: password
        }).then(response =>{

            navigate('/login')
        }).catch(error =>console.log(error))
    }

    console.log(email,password);
  return (
    <div className='body-login'>
      <Container className = "login-container">
        <div className="main-login">
            <Form className='main-form-login'>
                <label></label>
                    <Form.Label className='main-txt-login'>Hti Space Admin Register</Form.Label>
                    <br />
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control type="email" placeholder="Enter Username" onChange={(e)=>setUserName(e.target.value)}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control type="email" placeholder="Enter email" onChange={(e)=>setEmail(e.target.value)}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Control type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Control type="password" placeholder="Confirm Password" onChange={(e)=>setConfirmPassword(e.target.value)}/>
                </Form.Group>
                <Form.Group className="mb-3 forget-check" controlId="formBasicCheckbox" >
                    <Form.Check type="checkbox" label="I agree to all Terms & Conditions" />
                </Form.Group> 
                <Button onClick={handleLogin} variant="primary" type="submit" className='login-btn'>
                    sign up
                </Button>
                <Form.Group className='mb-3 donot-have-account'>
                    Don't have an account? <NavLink to='/login'>Login</NavLink>
                </Form.Group>
        </Form>
        </div>
      </Container>
    </div>
  );
}

export default Signup;


//3038344aA*