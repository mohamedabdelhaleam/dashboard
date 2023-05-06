import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import './Home.css';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import baseUrl from '../../api';
import CountCard from '../CountCard/CountCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPowerOff,faBars,faHouse,faExclamation,faUser,faChalkboardUser,faLandmark,faBookmark} from '@fortawesome/free-solid-svg-icons'
import Offcanvas from 'react-bootstrap/Offcanvas';
const Home = () => {

  const user = localStorage.getItem('username'); 
  const navigate = useNavigate()
  const token = localStorage.getItem('token'); 
  const [studentsNumber ,setStudentsNumber] = useState("")
  const [classes,setClasses] =useState([{}])
  const [professorsNumber ,setProfessorsNumber] = useState("")
  const [activeUser ,setActiveUser] = useState("")
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(()=>{
    axios.get(`${baseUrl}/api/Admin/student/count`,{
      headers :{
        "Authorization":"Bearer "+ token
      }
    }
    ).then(response=>setStudentsNumber(response.data))
    axios.get(`${baseUrl}/api/Admin/professor/count`,{
      headers :{
        "Authorization":"Bearer "+ token
      }
    }

    ).then(response=>setProfessorsNumber(response.data))
    axios.get(`${baseUrl}/api/Admin/classes/With-Student-count`,{
      headers:{
        'Authorization': 'Bearer '+ token
      }
    }).then(response=>setClasses(response.data))
    axios.get(`${baseUrl}/api/Admin/users/active/count`,{
      headers:{
        'Authorization': 'Bearer '+ token
      }
    }).then(response=>setActiveUser(response.data))
  },[token])
  const handleLogout =(event)=>{
    localStorage.clear();
    navigate('/login')
  }
  return (
    <div className='main-home'>
        <Navbar bg="light" expand="lg">
        <Container fluid >
        <FontAwesomeIcon icon={faBars} size="xl" onClick={handleShow}/>
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
      <Offcanvas show={show} onHide={handleClose} backdrop="static" >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Offcanvas</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          I will not close if you click outside of me.
        </Offcanvas.Body>
      </Offcanvas>
      <div className="content">
        <div className="sidebar">
          <ListGroup style={{paddingRight:"10px",paddingLeft:"10px"}}>
            <ListGroup.Item style={{
              border:"0px solid black",
              height:"100px",
              display:"flex",
              justifyContent:"space-between",
              alignItems:"center"}}><div>{user}</div><FontAwesomeIcon icon={faBookmark} /></ListGroup.Item>

            <ListGroup.Item style={{border:"0px solid black"}}><NavLink style={{border:"0px solid black",height:"50px",display:"flex",justifyContent:"space-between",alignItems:"center",color:"black",textDecoration:"none"}} to='/students'><div>Students</div><FontAwesomeIcon icon={faUser} /></NavLink> </ListGroup.Item>
            <ListGroup.Item style={{border:"0px solid black"}}><NavLink style={{border:"0px solid black",height:"50px",display:"flex",justifyContent:"space-between",alignItems:"center",color:"black",textDecoration:"none"}} to='/doctors'><div>Doctors</div><FontAwesomeIcon icon={faChalkboardUser} /></NavLink> </ListGroup.Item>
            <ListGroup.Item style={{border:"0px solid black"}}><NavLink style={{border:"0px solid black",height:"50px",display:"flex",justifyContent:"space-between",alignItems:"center",color:"black",textDecoration:"none"}} to='/classes'><div>Classes</div><FontAwesomeIcon icon={faLandmark} /></NavLink> </ListGroup.Item>
            <ListGroup.Item style={{border:"0px solid black"}}><NavLink style={{border:"0px solid black",height:"50px",display:"flex",justifyContent:"space-between",alignItems:"center",color:"black",textDecoration:"none"}} to='/login' onClick={handleLogout}><div>Log out</div><FontAwesomeIcon icon={faPowerOff} /></NavLink> </ListGroup.Item>
          </ListGroup>
        </div>
        <div className="items">
        <Container>
        <Row>
          <Col class xs={12} lg ={12} md ={12}>          
            <div className="overview">
              <div className="home-icon">
              <FontAwesomeIcon icon={faHouse} style={{color: "#ffffff",}} /> 
                <div className="last-overview">
                  overview <div className="overview-icon"><FontAwesomeIcon icon={faExclamation} size="2xs" /></div>
                </div>
              </div>
            </div>
          </Col>
          <Col class xs={12} lg ={4} md ={6}>
            <NavLink to='/students' style={{textDecoration:"none"}}>
              <CountCard title = "Students Number" count = {studentsNumber} />
            </NavLink>          
          </Col>
          <Col class xs={12} lg ={4} md ={6}>
            <NavLink to='/doctors' style={{textDecoration:"none"}}>
              <CountCard title = "Doctors Number" count = {professorsNumber}/>  
            </NavLink>
          </Col>
          <Col class xs={12} lg ={4} md ={6}>
          <NavLink to='/online' style={{textDecoration:"none"}}>
              <CountCard title = "Online Users" count = {activeUser}/>
          </NavLink>
            
          </Col>
          <Col class xs={12} lg ={4} md ={6}>
            <NavLink to='/classes' style={{textDecoration:"none"}}>
              <CountCard title = "Classes Number" count = {classes.length}/>
            </NavLink>
          </Col>
        </Row>
      </Container>
        </div>
      </div>
    </div>
  );
}

export default Home;

/**
 *         <div className="student-number">
          <h2>Student Number</h2>
          <h1>{studentsNumber}</h1>
        </div>
        <div className="doctors-number">
          <h2>doctors Number</h2>
          <h1>{professorsNumber}</h1>
        </div>
        <div className="student-number">

        </div>
        <div className="student-number">
          <h2>Classes Number</h2>
          <h1>2500</h1>
        </div>
 * 
 * 
 */