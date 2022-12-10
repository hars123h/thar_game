import React from 'react';
import { useNavigate } from 'react-router-dom';
// import sendMessages from '../utility/OTP.js';
// import otpGenerator from 'otp-generator';
import { useState } from 'react';
import { toast } from 'react-toastify';

const ForgotPassword = () => {

    const navigate = useNavigate();
    const [mobno, setMobno] = useState('');

    const handleMessage = () => {
        // if(mobno.length==10) {
        //     const otp = otpGenerator.generate(6, { digits: true, lowerCaseAlphabets:false, upperCaseAlphabets: false, specialChars: false });
        //     sendMessages('the otp to retrieve your password is ', "+919140493078", otp);
        // }else {
        //     toast('Invalid Mobile No, please type a valid number');
        // }
    }

    return (
        <div className='bg-[#0096D5] h-screen'>
            <div className='text-center bg-[#0096D5] font-sans text-white pt-2 text-lg mb-10
        pb-2'> <svg xmlns="http://www.w3.org/2000/svg" onClick={()=>navigate('/login')} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 absolute left-2 cursor-pointer hover:bg-white hover:stroke-black hover:rounded-full transition rounded-full ease-in-out delay-150 duration-200">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
                Find Password</div>
            <div className="box mb-20 border-2 m-auto border-gray-200 bg-[#d3d6fe] rounded-3xl border-solid lg:w-3/5 w-4/5 shadow-xl shadow-[#95c2ec] p-4 w-50% flex flex-col">
                <div className="no_phone mb-3 flex items-center bg-white border-2 border-gray-100 rounded-full ">
                    <input onChange={(e)=>setMobno(e.target.value)}  type="number" className='p-2 w-full outline-none rounded-full' placeholder='Phone number' name="phoneno" id="phoneno" />
                    <div onClick={handleMessage} className='opt w-10 bg-[#0096D5] mr-4 text-xs cursor-pointer p-2 shadow-md rounded-2xl text-white text-center'>OTP</div>
                </div>


                <input type="password" className='p-2 mb-3 outline-none border-2 border-gray-100 rounded-full' placeholder='Please enter the OTP' name="passowrd" id="pass" />
                <input type="password" className='p-2 mb-3 outline-none border-2 border-gray-100 rounded-full' placeholder="Login password" name="cnfpass" id="cnfpass" />
                <input type="password" className='p-2 mb-3 outline-none border-2 border-gray-100 rounded-full' placeholder="Please confirm your password" name="withpassword" id="wthpass" />
                <button onClick={()=>navigate('/login')} className='bg-[#0096D5] text-white pt-1 pb-1 rounded-full text-lg'>Confirm</button>
                <div onClick={()=>navigate('/login')} className='cursor-pointer text-center bg-white text-black mt-2 p-2 mb-2 border-2 border-gray-100 rounded-full'>
                    Already have an account, log in
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword