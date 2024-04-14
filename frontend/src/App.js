
import './App.css';
import { Link, Route, Routes} from 'react-router-dom';
import Register from './pages/register'
import Login from './pages/login'
import Assignment from './pages/Assignment';
import AssignmentList from './pages/AssignmentList';
import CreateAssignment from './pages/CreateAssignment';

function App() {



  return (
    
    <Routes>
    <Route path ="/register" element= {<Register></Register>}/>
    <Route path ="/*" element= {<Login></Login>}/>
    <Route path ="/Assignment" element= {<Assignment></Assignment>}/>
    <Route path ="/AssignmentList" element= {<AssignmentList></AssignmentList>}/>
    <Route path="/Assignment/:id" element={<Assignment></Assignment>} />
    <Route path="/createAssignment" element={<CreateAssignment></CreateAssignment>}/>
    <Route path ="/homepage" element= {<div style={{backgroundColor:"black"}}></div>}/>
    
    </Routes>

    // <>
  );
}

export default App;
