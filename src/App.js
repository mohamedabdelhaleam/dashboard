import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import NoMatch from './Components/NoMatch/NoMatch';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import Signup from './Components/Signup/Signup';
import StudentsTables from './Components/Tables/StudentsTables';
import DoctorsTables from './Components/Tables/DoctorsTables ';
import ClassesTables from './Components/Tables/ClassesTables';
import DoctorProfile from './Components/Profile/DoctorProfile';
import ActiveUser from './Components/Tables/ActiveUser';
import StudentProfile from './Components/Profile/StudentProfile';


function App() {
  const token = localStorage.getItem('token')
  const navigate = useNavigate()
  if(token === null || token === undefined)
  {
    navigate('/login')
  }

  return (
    <div className="App">
      <Routes>
        <Route path='/' element = {<Home />}/>
        <Route path='/home' element = {<Home />}/>
        <Route path='/login' element = {<Login />}/>
        <Route path='/students' element = {<StudentsTables />}/>
        <Route path='/doctors' element = {<DoctorsTables />}/>
        <Route path='/doctor-profile/:id' element = {<DoctorProfile />}/>
        <Route path='/student-profile/:id' element = {<StudentProfile />}/>
        <Route path='/classes' element = {<ClassesTables />}/>
        <Route path='/online' element = {<ActiveUser />}/>
        <Route path='/signup' element = {<Signup />}/>
        <Route path="*" element = {<NoMatch />}/>
      </Routes>
    </div>
  );
}

export default App;
