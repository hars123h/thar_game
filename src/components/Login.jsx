import React from 'react';
// import hp_logo from '../images/hp_logo.png';
import user_img from '../images/user_img.png';
import lock_img from '../images/lock_img.png';
import {useNavigate} from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import db from '../firebase/config';
import { toast } from 'react-toastify';
import waltonbd_company from '../images/waltonbd_company.png';


const Login = () => {

    const navigate = useNavigate();
    const auth = getAuth();
    const [mobno, setmobno] = useState('');
    const [pwd, setpwd] = useState('');
    const [bloackedUsers, setBlockedUsers] = useState([]);

    useEffect(()=>{
        getBlockedUsers();
    },[]);

    const getBlockedUsers = async() => {
        const dataRes = await getDocs(collection(db, 'blockedUsers'));
        var temp = [];
        dataRes.forEach((doc)=>{
            //console.log(doc.data());
            temp.push(doc.data().mobileNumber);
            setBlockedUsers(temp);
        });
    }

    const handleSignIn = () => {
        if(bloackedUsers.includes(String(mobno))) {
            toast('You are blocked by the administrator!');
            return;
        }
        const new_mobno = mobno + '@gmail.com';
        signInWithEmailAndPassword(auth, new_mobno, pwd)
        .then((userCredential)=>{
            toast('Login Successful', {autoClose:2000});
            setTimeout(()=>{
                navigate('/home');
            },2000);
            
        })
        .catch(error=>{
            console.log(error.message, error.code);
        });
    }

    return (
        <div>
            <div className='text-center'>
                <img src={waltonbd_company} alt="hp_logo" className='m-auto md:w-2/6 sm:w-1/6 my-5' width={200}/>
            </div>
            <div className='flex flex-col m-auto w-3/5'>
                <div className=" items-center mb-3 p-2 phoneno flex  bg-[#f1f1f1] rounded-md border-2 border-black">
                    <img src={user_img} alt="user" className='h-5 border-r-2 pr-2 border-solid border-gray-300' />
                    <input value={mobno} onChange={(e)=>setmobno(e.target.value)}  type="text" placeholder='Phone number' name="phone_no" id="phone_no" className='pl-1 bg-[#f1f1f1]  outline-none overflow-x-scroll' />
                </div>

                <div className=" items-center p-2 passowrd flex  bg-[#f1f1f1] rounded-md border-2 border-black">
                    <img src={lock_img} alt="user" className='h-5 border-r-2 pr-2 border-solid border-gray-300' />
                    <input value={pwd} onChange={(e)=>setpwd(e.target.value)} type="password" placeholder='Login password' name="password" id="pwrd" className='pl-1 bg-[#f1f1f1] outline-none overflow-x-scroll' />
                </div>
{/*[#0096D5] */}
                <div className='mt-16'>
                    <button onClick={handleSignIn} className='bg-blue-500 w-full pt-2 pb-2 text-lg text-white rounded-md shadow-md shadow-blue-400
                    '>Login</button>
                </div>
{/*[#379EFE] */}
                <div className="options flex justify-between mt-2">
                    <div className='text-blue-500 cursor-pointer' onClick={()=>navigate('/register')}>Register</div>
                    <div className='cursor-pointer text-blue-500 ' onClick={()=>navigate('/forgot')}>Forget password?</div>
                </div>

            </div>
        </div>
    )
}

export default Login