import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPowerOff,faBars} from '@fortawesome/free-solid-svg-icons'
import baseUrl from '../../api';
const ActiveUser = () => {

  const navigate = useNavigate()

  const token = localStorage.getItem('token');
  const user = localStorage.getItem('username'); 
  
  const [OnlineUsers,setOnlineUsers] =useState([{}])

  useEffect(()=>{
    axios.get(`${baseUrl}/api/Admin/users/active`,{
      headers:{
        'Authorization': 'Bearer '+ token
      }
    }).then(response=>setOnlineUsers(response.data))

  },[token])
  const handleLogout =(event)=>{
    localStorage.clear();
    navigate('/login')
  }

  return (
    <div>
              <Navbar bg="light" expand="lg">
        <Container fluid >
        <FontAwesomeIcon icon={faBars} size="xl"/>
          <Navbar.Brand href="#" className='logo'>
            <span className='logo-txt'>
              <NavLink to='/' style={{textDecoration:"none",color:"#0A4D68"}}>HtiSpace</NavLink>
            </span>
          </Navbar.Brand>
          <Form className="d-flex search-dashboard">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
            </Form>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
            </Nav>
              <NavDropdown className='admin-username' title={user} id="navbarScrollingDropdown">
              </NavDropdown>
            <NavLink onClick={handleLogout} to="/login"><FontAwesomeIcon icon={faPowerOff} /></NavLink>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Table striped bordered hover variant="dark">
            <thead>
                <tr>
                <th>#</th>
                <th>Name</th>
                <th>Last Active At </th>
                <th>Delete</th>
                </tr>
            </thead>
            <tbody>
              {
                OnlineUsers.map((user,index)=>(
                  <tr key={user.userId}>
                  <td>{index+1}</td>
                  <td>{user.userName}</td>
                  <td>{user.lastActiveAt}</td>
                  <td><Button variant="primary" onClick={
                    (event)=>{
                      event.preventDefault();
                      axios.delete(`${baseUrl}/api/Admin/professor/${user.userId}`,{
                        headers:{
                          'Authorization': 'Bearer '+ token
                        }
                      }).then(response=>console.log(response))
                    }}>Delete</Button></td>
                  </tr>
                ))
              }
            </tbody>
        </Table>
    </div>
  );
}

export default ActiveUser;
