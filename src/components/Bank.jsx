import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import db from '../firebase/config.js';

const Bank = () => {
    const navigate = useNavigate();
    const auth = getAuth();
    const [details, setDetails] = useState({
        fullName:'',
        phoneNo:'',
        bankAccount:'',
        bankName:'',
        ifsc:'',
        wpwd:'',
    });

    

    const handleChange = (e) => {
        setDetails({
            ...details,
            [e.target.name]:e.target.value
        });
        console.log(details);
    }

    const handleSubmit = async() => {
        const docRef = doc(db, 'users', auth.currentUser.uid);
        await updateDoc(docRef, {bankDetails:details})
        .then(()=>{console.log('Details Added Successfully')})
        .catch(()=> console.log('Some error Occured'));
    }
    
    return (
        <div className='bg-[#2e9afe] h-full p-4 sm:h-[700px] md:h-[950px]'>
            <div className="options text-center text-white text-2xl pt-2 font-medium">
                <svg xmlns="http://www.w3.org/2000/svg" onClick={() => navigate('/settings')} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 absolute left-2  storke-white top-5 cursor-pointer">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                </svg>
                My Bank
            </div>


            <div className="box mx-2 bg-[#61b2ff] p-2 rounded-md mt-4">
                <div className='flex gap-2 items-center  text-lg p-3 m-1  cursor-pointer'>
                    <input type="text" onChange={handleChange} name='fullName' value={details.fullName} className='outline-none w-full bg-inherit placeholder-[#757575]' placeholder='Full Name' />
                </div>

                <div className='flex gap-2 items-center text-lg p-3 m-1  cursor-pointer'>
                    <input type="text" onChange={handleChange} name='phoneNo' value={details.phoneNo} className='outline-none w-full bg-inherit placeholder-[#757575]' placeholder='Phone Number' />
                </div>

                <div className='flex gap-2 items-center text-lg p-3 m-1  cursor-pointer'>
                    <input type="text" onChange={handleChange} name='bankAccount' value={details.bankAccount} className='outline-none w-full bg-inherit placeholder-[#757575]' placeholder='Bank Account' />
                </div>

                <div className='flex gap-2 items-center text-lg p-3 m-1  cursor-pointer'>
                    <input type="text" onChange={handleChange} name='bankName' value={details.bankName} className='outline-none w-full bg-inherit placeholder-[#757575]' placeholder='Bank Name' />
                </div>

                <div className='flex gap-2 items-center text-lg p-3 m-1  cursor-pointer'>
                    <input type="text" onChange={handleChange} name='ifsc' value={details.ifsc} className='outline-none w-full bg-inherit placeholder-[#757575]' placeholder='IFSC' />
                </div>

                <div className='flex gap-2 items-center text-lg p-3 m-1  cursor-pointer'>
                    <input type="text" onChange={handleChange} name='wpwd' value={details.wpwd} className='outline-none w-full bg-inherit placeholder-[#757575]' placeholder='Withdrawal Password' />
                </div>
            </div>

            <div>
                <button onClick={handleSubmit} className='bg-[#2e9afe] text-white text-lg mt-5 mb-20 rounded-lg shadow-xl block w-full py-2 shadow-[#7899de]'>Confirm</button>
            </div>
        </div>
    )
}

export default Bank