import './App.css';
import Register from './components/Register';
import Login from './components/Login';
import ForgotPassword from './components/ForgotPassword';
import Home from './components/Home'
import Company from './components/Company';
import Team from './components/Team';
import Mine from './components/Mine';
import Recharge from './components/Recharge';
import Invite from './components/Invite';
import Record from './components/Record';
import Project from './components/Project';
import {Routes, Route } from 'react-router-dom';
import Fallback from './components/Fallback';

function App() {
  
  return (
    <div className="app">

      <Routes>
        <Route path="/" element={<Fallback/>} />
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/forgot" element={<ForgotPassword/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/company" element={<Company/>}/>
        <Route path="/team" element={<Team/>}/>
        <Route path="/mine" element={<Mine/>}/>
        <Route path="/recharge" element={<Recharge/>}/>
        <Route path="/invite" element={<Invite/>}/>
        <Route path="/record" element={<Record/>}/>
        <Route path="/project" element={<Project/>}/>
      </Routes>
    </div>
  );
}

export default App;
