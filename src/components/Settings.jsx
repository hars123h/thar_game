import React from 'react';
import setting_bank from '../images/setting_bank.png';
import setting_pwd from '../images/setting_pwd.png';
import { useNavigate } from 'react-router-dom';


const Settings = () => {

    const navigate = useNavigate();


    return (
        <div className='bg-[#2e9afe] h-full p-4 sm:h-[700px] md:h-[950px]'>
            <div className="options text-center text-white text-2xl pt-2 font-medium">
                <svg xmlns="http://www.w3.org/2000/svg" onClick={() => navigate('/mine')} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 absolute left-2  storke-white top-5 cursor-pointer">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                </svg>
                Settings
            </div>


            <div className="box mx-2 bg-[#4daaff] p-2 rounded-md mt-4">
                <div onClick={() => navigate('/bank')} className='flex gap-2 items-center text-white text-lg p-3 m-1 border-b border-white cursor-pointer'>
                    <div><img src={setting_bank} alt="bnk_img" width={30}/></div>
                    <div>My Bank</div>
                </div>

                <div onClick={()=>navigate('/change_login_password')} className='flex gap-2 items-center text-white text-lg p-3 m-1 border-b border-white cursor-pointer'>
                    <div><img src={setting_pwd} alt="bnk_pwd" width={30}/></div>
                    <div>Change Login Password</div>
                </div>

                <div onClick={()=>navigate('/change_withdrawal_password')} className='flex gap-2 items-center text-white text-lg p-3 m-1 border-b border-white cursor-pointer'>
                    <div><img src={setting_pwd} alt="bnk_pwd" width={30}/></div>
                    <div>Change Withdrawal Password</div>
                </div>
            </div>



        </div>
    )
}

export default Settings