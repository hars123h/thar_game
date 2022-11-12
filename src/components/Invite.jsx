import React from 'react';
import { useNavigate,  } from 'react-router-dom';
import sample_qr from '../images/sample_qr.png';

const Invite = () => {
    const navigate = useNavigate();
    return (
        <div className=' bg-[#2e9afe] h-screen flex flex-col text-white font-light p-5'>
            <div className="top p-3">
                <svg xmlns="http://www.w3.org/2000/svg" onClick={()=>navigate(-1)} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                </svg>
            </div>

            <p className='p-3 text-xs break-words'>http://www.hp01.in/index/user/register/invite_code/7ef69.html</p>

            <div className='p-3 font-bold'>
                Invite link: clickCopy
            </div>

            <div className="invitation flex p-3">
                <div className='font-bold'>Invitation code: 7ef69</div>
                <div className='flex ml-4'>
                    <div className='mr-2'>Copy link</div>
                </div>
            </div>

            <div className="qr mx-auto ">
                <img src={sample_qr} alt="qr" className='w-36 h-36 p-2 mx-auto' />
            </div>

            <div className="info p-3 sm:text-xs md:text-md">
                Invitation rewards: Welcome to use the APP, invite new friends to join, you can get very high invitation rewards, and you can quickly withdraw cash to your bank account every day. APP is the safest, most popular and most profitable APP in 2022, dedicated to benefiting all mankind and promoting it globally. Invite new friends to join and you will get the following different invitation rewards:
                <br />
                Level 1, 10%
                <br />
                Level 2, 5%
                <br />
                Level 3, 2%
            </div>

        </div>
    )
}

export default Invite