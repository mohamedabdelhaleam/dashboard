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
const StudentsTables = () => {
  const navigate = useNavigate()
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('username'); 
  const [students,setStudents] =useState([{}])
  useEffect(()=>{
    axios.get(`${baseUrl}/api/Admin/student/get`,{
      headers:{
        'Authorization': 'Bearer '+ token
      }
    }).then(response=>setStudents(response.data))
  },[token])
  const handleLogout =(event)=>{
    localStorage.clear();
    navigate('/login')
  }
  console.log(students);
  return (
    <div>
              <Navbar bg="light" expand="lg">
        <Container fluid >
        <FontAwesomeIcon icon={faBars} size="xl"/>
          <Navbar.Brand href="#" className='logo'><span className='logo-txt'><NavLink to='/' style={{textDecoration:"none",color:"#0A4D68"}}>HtiSpace</NavLink></span></Navbar.Brand>
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
                <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
              </NavDropdown>
            <NavLink onClick={handleLogout} to ='/login'><FontAwesomeIcon icon={faPowerOff} /></NavLink>
          </Navbar.Collapse>
        </Container>
      </Navbar>
              <Table striped bordered hover variant="dark">
            <thead>
                <tr>
                <th>#</th>
                <th>Name</th>
                <th>Age</th>
                <th>Year</th>
                <th>GPA</th>
                <th>Image</th>
                <th>Edit</th>
                <th>Delete</th>
                </tr>
            </thead>
            <tbody>
              {
                students.map((student,index)=>(
                  <tr key={student.id}>
                  <td>{index}</td>
                  <td>{student.name}</td>
                  <td>{student.age}</td>
                  <td>{student.year}</td>
                  <td>{student.gpa}</td>
                  <td><img src={baseUrl+student.imageURL} alt={student.name+" image"} style={{width:"40px"}}/></td>
                  <td><NavLink to={`/student-profile/${student.id}`}><Button variant="primary">Edit</Button></NavLink></td>
                  <td><Button variant="primary" onClick={
                    (event)=>{
                      event.preventDefault();
                      console.log(student.id);
                      axios.delete(`${baseUrl}/api/Admin/student/delete/${student.id}`,{
                        headers:{
                          'Authorization': 'Bearer '+ token
                        }
                      }).then(response=>console.log(response)).catch(error=>console.log(error))
                    }}>Delete</Button></td>
                  </tr>
                ))
              }
            </tbody>
        </Table>
    </div>
  );
}

export default StudentsTables;

/**
 *                 <tr>
                <td>1</td>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
                <td>@mdo</td>
                <td>@mdo</td>
                </tr>
 */