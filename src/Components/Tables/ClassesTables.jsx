import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPowerOff,faBars} from '@fortawesome/free-solid-svg-icons'
import Offcanvas from 'react-bootstrap/Offcanvas';
import baseUrl from '../../api';
const ClassesTables = () => {
  const navigate = useNavigate()
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('username'); 
  const [professorId,setProfessorId] =useState("")
  const [professors,setProfessors] =useState([{}])
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [subjectId,setSubjectId] =useState("")
  const [name,setName] =useState("")
  const [year,setYear] =useState("")
  const [description,setDescription] =useState("")
  const [classes,setClasses] =useState([{}])
  const [subjects,setSubjects] =useState([{}])
  useEffect(()=>{
    // Get Students
    axios.get(`${baseUrl}/api/Admin/classes/With-Student-count`,{
      headers:{
        'Authorization': 'Bearer '+ token
      }
    }).then(response=>setClasses(response.data))
    // Get Professor
    axios.get(`${baseUrl}/api/Admin/professor/get`,{
      headers:{
        'Authorization': 'Bearer '+ token
      }
    }).then(response=>setProfessors(response.data))
    // Get Subject
    axios.get(`${baseUrl}/api/Admin/subject/get`,{
      headers:{
        'Authorization': 'Bearer '+ token
      }
    }).then(response=>setSubjects(response.data))
  },[token])
  // Login Btn
  const handleLogout =(event)=>{
    localStorage.clear();
    navigate('/login')
  }

  const handleAddClass =(e)=>{
    e.preventDefault();
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer "+token);

  var raw = JSON.stringify({
    professorId: professorId,
    subjectId: subjectId,
    name: name,
    year: year,
    description: description,
  });

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch(`${baseUrl}/api/Admin/class/add`, requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
  }
  console.log( "Type of Year " + typeof(year));
  console.log( "NAme  " + name);
  console.log( "Des " + description);
  console.log( "Year " + year);
  console.log("Subject Id " + subjectId);
  console.log("Doctor Id" + professorId);
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
      <Offcanvas show={show} onHide={handleClose} backdrop="static" >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>ADD Class</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
                      <Form style={{border:"1px solid grey",padding:"20px",borderRadius:"12px",backgroundColor:"#212529",color:"white",width:"100%"}}>
        <Form.Label>Add Class</Form.Label>
      <Form.Group className="mb-3">
      <Form.Select aria-label="Default select example" onChange={(e)=>setProfessorId(e.target.value)}>
        <option>Open this select Doctor</option>
        {
          professors.map((professor)=>(
            <option value={professor.id}>{professor.name}</option>
          ))
        }
    </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Select aria-label="Default select example" onChange={(e)=>setSubjectId(Number(e.target.value))}>
          <option>Open this select Subject</option>
          {
          subjects.map((subject)=>(
            <option value={subject.id}>{subject.name}</option>
          ))
        }
      </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Control type="text" placeholder="Class Name"  onChange={(e)=>setName(e.target.value)}/>
      </Form.Group>
      <Form.Group className="mb-3">
      <Form.Select aria-label="Default select example" onChange={(e)=>setYear(Number(e.target.value))}>
          <option>Open this select Year</option>
          <option value="0">Level 0</option>
          <option value="1">Level 1</option>
          <option value="2">Level 2</option>
          <option value="3">Level 3</option>
          <option value="4">Level 4</option>
      </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Control type="text" placeholder="Description " onChange={(e)=>setDescription(e.target.value)} />
      </Form.Group>
      <Button variant="primary" type="submit" onChange={handleAddClass}>
        ADD CLASS
      </Button>
    </Form>
        </Offcanvas.Body>
      </Offcanvas>
      <div className="d-grid gap-2" style={{margin:"50px",backgroundColor:"#212529"}}>
      <Button variant="primary" size="lg" style={{backgroundColor:"#212529",border:"0px solid white",borderRadius:"50px"}} onClick={handleShow}>
        ADD New Class
      </Button>
    </div>
              <Table striped bordered hover variant="dark">
            <thead>
                <tr>
                <th>#</th>
                <th>Class Name</th>
                <th>Student Number in Class</th>
                </tr>
            </thead>
            <tbody>
              {
                classes.map((item,index)=>(
                  <tr key={item.classId}>
                  <td>{index + 1}</td>
                  <td>{item.className}</td>
                  <td>{item.studentCount}</td>
                  </tr>
                ))
              }
            </tbody>
        </Table>

    </div>
  );
}

export default ClassesTables;

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