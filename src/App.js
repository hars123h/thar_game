import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
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
import Withdrawal from './components/Withdrawal';
import Settings from './components/Settings';
import Bank from './components/Bank';
import ChangeLoginPassword from './components/ChangeLoginPassword';
import ChangeWithdrawalPassword from './components/ChangeWithdrawalPassword';
import RechargeWindow from './components/RechargeWindow';
import Approval from './components/Approval';
import WithdrawalApproval from './components/WithdrawalApproval';

function App() {
  
  return (
    <div className="app ">

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
        <Route path="/withdrawal" element={<Withdrawal/>}/>
        <Route path="/settings" element={<Settings/>}/>
        <Route path="/bank" element={<Bank/>}/>
        <Route path="/change_login_password" element={< ChangeLoginPassword />}/>
        <Route path="/change_withdrawal_password" element={< ChangeWithdrawalPassword />}/>
        <Route path="/recharge_window/:recharge_value" element={<RechargeWindow/>}/>
        <Route path="/recharge_approval" element={<Approval/>}/>
        <Route path="/withdrawal_approval" element={<WithdrawalApproval/>}/>
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
