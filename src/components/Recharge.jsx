import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';


const Recharge = () => {

  const [recharge_value, setRecharge_Value] = useState(0);
  const navigate = useNavigate();

  const handleRecharge = () => {
    if(parseInt(recharge_value)) {
        navigate(`/recharge_window/${recharge_value}`);
    }else {
        alert('Enter a valid recharge amount');
    }
  }

  return (
    <div className='bg-[#2e9afe] h-screen'>
        <div className="options text-center text-white text-md pt-5 font-normal mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" onClick={()=>navigate(-1)} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 absolute left-2  storke-white top-5 cursor-pointer">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                </svg>
                Recharge
        </div>

        <div className="box bg-[#4daaff] px-4 py-4 shadow-md shadow-[#298ae4]">

            <div className='m-1 text-md text-white mb-4'>Enter Amount:</div>
            <div className='m-1 w-full flex items-center'>
                <span className='text-red-400 font-bold p-0.5 pr-1 border-b border-white'>₹</span>
                <input onChange={(e)=>setRecharge_Value(e.target.value)}  type="text" name="amount" id="amt" placeholder='Amount'  className='w-full bg-inherit text-[#fff] outline-none font-normal text-lg border-b border-white'/>
            </div>

            <ol className='text-white text-xs'>
                <li className='mt-2 my-1 mr-1'>1: Fill in the callback UTR correctly, and the account will be credited within 1 minute.</li>
                <li className='mt-2 my-1 mr-1'>2: If you forget to fill in the UTR, please contact the online customer service in time to help you solve the problem of the safe arrival of funds.</li>
            </ol>

        </div>

        <div className="cnf_recharge w-4/5 mx-auto mt-10">
            <button onClick={handleRecharge}  className='w-full bg-[#2e9afe] py-2 rounded-md text-white text-lg shadow-customShadow shadow-[#beadcc]'>Confirm Recharge</button>
        </div>
    </div>
  )
}

export default Recharge