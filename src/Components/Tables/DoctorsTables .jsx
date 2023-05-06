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
import Offcanvas from 'react-bootstrap/Offcanvas';
import baseUrl from '../../api';
const DoctorsTables = () => {

  const navigate = useNavigate()

  const token = localStorage.getItem('token');
  const user = localStorage.getItem('username'); 
  
  const [professors,setProfessors] =useState([{}])
  const [userName,setUserName] =useState("")
  const [email,setEmail] =useState("")
  const [password,setPassword] =useState("")
  const [confirmPassword,setConfirmPassword] =useState("")
  const [selectedImage,setSelectedImage] =useState()
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(()=>{
    axios.get(`${baseUrl}/api/Admin/professor/get`,{
      headers:{
        'Authorization': 'Bearer '+ token
      }
    }).then(response=>setProfessors(response.data))

  },[token])
  const handleLogout =(event)=>{
    localStorage.clear();
    navigate('/login')
  }
  const handleAddDoctor =(event)=>{
    event.preventDefault();
    axios.post(`${baseUrl}/api/Admin/professor/CreateAccountt`,{
      headers:{
        'Authorization': 'Bearer '+ token
      },data:{
        Name:userName,
        Email:email,
        Image:selectedImage,
        Password:password,
        ConfirmPassword:confirmPassword
      }
    }).then(response=>console.log(response))
  }
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
              </NavDropdown>
            <NavLink onClick={handleLogout} to="/login"><FontAwesomeIcon icon={faPowerOff} /></NavLink>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Offcanvas show={show} onHide={handleClose} backdrop="static" >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>ADD Doctor</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
        <Form style={{margin:"20px",border:"1px solid grey",padding:"20px",borderRadius:"12px",backgroundColor:"#212529",color:"white"}}>
        <Form.Label>Add Doctor</Form.Label>
      <Form.Group className="mb-3">
        <Form.Control type="text" placeholder=" Name" onChange={(e)=>setUserName(e.target.value)}/>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Control type="email" placeholder=" Email"  onChange={(e)=>setEmail(e.target.value)}/>
      </Form.Group>
      <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>Upload Image</Form.Label>
        <Form.Control type="file" onChange={(event) => {
          setSelectedImage(event.target.files[0]);
          console.log(event.target.files[0]);
        }}/>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Control type="password" placeholder=" Password"  onChange={(e)=>setPassword(e.target.value)}/>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Control type="password" placeholder="Confirm Password " onChange={(e)=>setConfirmPassword(e.target.value)} />
      </Form.Group>
      <Button variant="primary" type="submit"  onChange={handleAddDoctor}>
        ADD DOCTOR
      </Button>
    </Form>
        </Offcanvas.Body>
      </Offcanvas>
      <div className="d-grid gap-2" style={{margin:"50px",backgroundColor:"#212529"}}>
      <Button variant="primary" size="lg" style={{backgroundColor:"#212529",border:"0px solid white",borderRadius:"50px"}} onClick={handleShow}>
        ADD Doctor
      </Button>
    </div>



              <Table striped bordered hover variant="dark">
            <thead>
                <tr>
                <th>#</th>
                <th>Name</th>
                <th>Image</th>
                <th>Edit</th>
                <th>Delete</th>
                </tr>
            </thead>
            <tbody>
              {
                professors.map((professor,index)=>(
                  <tr key={professor.id}>
                  <td>{index+1}</td>
                  <td>{professor.name}</td>
                  <td><img src={professor.imgUrl} alt={professor.name+" image"} style={{width:"40px"}}/></td>
                  <td><NavLink to={`/doctor-profile/${professor.id}`}><Button variant="primary">Edit</Button></NavLink></td>
                  <td><Button variant="primary" onClick={
                    (event)=>{
                      event.preventDefault();
                      axios.delete(`${baseUrl}/api/Admin/professor/${professor.id}`,{
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

export default DoctorsTables;
