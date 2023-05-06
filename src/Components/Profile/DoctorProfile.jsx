import React, { useEffect, useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Button from 'react-bootstrap/Button';
import { faPowerOff,faBars} from '@fortawesome/free-solid-svg-icons'
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import baseUrl from '../../api';

const DoctorProfile = () => {
    const {id} = useParams()
    const navigate = useNavigate()
    const token = localStorage.getItem('token'); 
    const user = localStorage.getItem('username'); 
    const [doctorData , setDoctorData] = useState({})
    const [doctorEditData , setDoctorEditData] = useState({})
    const [fullName , setFullName] = useState("")
    const [age , setAge] = useState("")
    const [imageEdit , setImageEdit] = useState("")
    const [bio , setBio] = useState("")
    useEffect(()=>{
        axios.get(`${baseUrl}/api/Admin/GetProfessorById`,{
            headers:{
                'Authorization': 'Bearer '+ token
            },
            data:{
              guid:id
            }
          }).then(response=>setDoctorData(response.data))
    },[token,id])
    console.log(doctorData);
    const handleLogout =(event)=>{
        localStorage.clear();
        navigate('/login')
      }
      const handleEdit =(event)=>{
        event.preventDefault();
        axios.put(`${baseUrl}/api/Admin/professor/update`,{
          headers:{
              'Authorization': 'Bearer '+ token
          },
          data:{
            FullName:fullName,
            Age:age,
            ImgUrl:imageEdit,
            Bio:bio
          }
        }).then(response=>setDoctorEditData(response.data))
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
                <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
              </NavDropdown>
            <NavLink onClick={handleLogout} to='/login'><FontAwesomeIcon icon={faPowerOff} /></NavLink>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className="form-for-edit" style={{height:"91vh",display:"flex",justifyContent:"center",alignItems:"center"}}>
      <Form style={{width:"70%",borderRadius:"12px",border:"1px solid black",padding:"20px",backgroundColor:"#212529",color:"white"}}>
            <Form.Group className="mb-3">
                <Form.Label>Full Name</Form.Label>
                <Form.Control type="text" placeholder="Full Name" onChange={(e)=>setFullName(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>ِAge</Form.Label>
                <Form.Control type="text" placeholder="Your Age" onChange={(e)=>setAge(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Image</Form.Label>
                <Form.Control type="file" onChange={(e)=>setImageEdit(e.target.files[0])}/>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Bio</Form.Label>
                <Form.Control type="text" placeholder="Bio" onChange={(e)=>setBio(e.target.value)}/>
            </Form.Group>
            <Button variant="primary" type="submit" onClick={handleEdit} style={{width:"100%",marginTop:"20px"}}>
                Edit
            </Button>
        </Form>
      </div>
    </div>
  );
}

export default DoctorProfile;
