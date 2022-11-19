import React from 'react';
import { useNavigate } from 'react-router-dom';


const ChangeLoginPassword = () => {
    const navigate = useNavigate();
    return (
        <div className='bg-[#2e9afe] h-full p-4 sm:h-[700px] md:h-[950px]'>
            <div className="options text-center text-white text-2xl pt-2 font-medium">
                <svg xmlns="http://www.w3.org/2000/svg" onClick={() => navigate('/settings')} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 absolute left-2  storke-white top-5 cursor-pointer">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                </svg>
                Change Login Password
            </div>


            <div className="box mx-2 bg-[#61b2ff] p-2 rounded-md mt-4">

                <div className='flex gap-2 items-center text-white  text-lg p-3 m-1  '>
                    Please enter the New Password
                </div>

                <div className='flex gap-2 items-center  text-lg p-3 m-1  '>
                    <input type="text" className='outline-none w-full bg-inherit placeholder-[#757575]' placeholder='Old Login Password' />
                </div>

                <div className='flex gap-2 items-center text-lg p-3 m-1  '>
                    <input type="text" className='outline-none w-full bg-inherit placeholder-[#757575]' placeholder='New Login Password' />
                </div>

                <div className='flex gap-2 items-center text-lg p-3 m-1 '>
                    <input type="text" className='outline-none w-full bg-inherit placeholder-[#757575]' placeholder='Confirm New Pasword' />
                </div>
            </div>

            <div>
                <button className='bg-[#2e9afe] text-white text-lg mt-5 mb-20 rounded-lg shadow-xl block w-full py-2 shadow-[#7899de]'>Confirm</button>
            </div>
        </div>
    )
}

export default ChangeLoginPassword;