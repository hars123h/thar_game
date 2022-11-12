import React from 'react';
import { useNavigate } from 'react-router-dom';

const Record = () => {
    const navigate = useNavigate();
    return (
        <div className='h-screen bg-[#2e9afe]'>

            <div className="options text-center bg-[#2e9afe] text-white text-md pt-5 font-normal pb-4">
                <svg xmlns="http://www.w3.org/2000/svg" onClick={()=>navigate(-1)} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 absolute left-2  storke-white top-5 cursor-pointer">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                </svg>
                Account Record
            </div>

            <div className='flex flex-wrap items-center py-2 px-4 bg-[#bfdbf5] border-b border-white'>
                <div className="relative w-28 ">
                    
                    <input type="date" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-full focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Select date" />
                </div>

                <div className='text-md text-[#2ea2fc] ml-3'>to</div>

                <div className="relative w-28 ml-3">
                    
                    <input type="date" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-full focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Select date" />
                </div>

                <button className='bg-[#2e9afe] w-20 text-center  ml-3 text-white rounded-full p-2.5'>Search</button>
            </div>

            <div className='records w-full flex bg-[#bce4ed] items-center'>
                <div className='h-[40px] flex items-center justify-center w-1/3 text-center border-b border-red-400 text-red-400'>Recharge</div>
                <div className='h-[40px] flex items-center justify-center w-1/3 text-center'>Withdrawls</div>
                <div className='h-[40px] flex items-center justify-center w-1/3 text-center'>All Types</div>
            </div>
        </div>
    )
}

export default Record