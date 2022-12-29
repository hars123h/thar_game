import React from 'react'
import { useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';

const AdminLogout = () => {
    const navigate = useNavigate();
    useEffect(()=>{
        localStorage.clear();
        navigate('/admin/Login');
    })

  return (
    <div>AdminLogout</div>
  )
}

export default AdminLogout