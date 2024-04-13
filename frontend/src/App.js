import logo from './logo.svg';
import './App.css';
import { Link, Route, Routes} from 'react-router-dom';
import Register from './pages/register'
import Login from './pages/login'
import Assignment from './pages/Assignment';

function App() {



  return (
    
    <Routes>
    <Route path ="/register" element= {<Register></Register>}/>
    <Route path ="/login" element= {<Login></Login>}/>
    <Route path ="/Assignment" element= {<Assignment></Assignment>}/>
    <Route path ="/homepage" element= {<div style={{backgroundColor:"black"}}></div>}/>

    </Routes>

    // <>
  );
}

export default App;
