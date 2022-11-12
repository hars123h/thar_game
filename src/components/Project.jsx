import React from 'react';
import { useNavigate,  } from 'react-router-dom';


const Project = () => {
  const navigate = useNavigate();
  return (
    <div className='h-screen bg-[#2e9afe]'>

            <div className="options text-center bg-[#2e9afe] text-white text-md pt-5 font-normal pb-4">
                <svg xmlns="http://www.w3.org/2000/svg" onClick={()=>navigate(-1)} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 absolute left-2  storke-white top-5 cursor-pointer">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                </svg>
                Project Record
            </div>


            <div className='records w-full flex bg-[#d3d6fe] items-center'>
                <div className='h-[40px] flex items-center justify-center w-1/2 text-center border-b-4 font-semibold border-[#0172fe] text-[#0172fe]'>Earning</div>
                <div className='h-[40px] flex items-center justify-center w-1/2 text-center text-white'>Completed</div>
            </div>
        </div>
  )
}

export default Project