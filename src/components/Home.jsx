import React from 'react';
import Slider from './Slider';
import Card from './Card';
import headphone_img from '../images/headphone_img.png';
import download_img from '../images/download_img.png';
import recharge_img from '../images/recharge_img.png';
import invite_img from '../images/invite_img.png';
import btm_home from '../images/btm_home.png';
import btm_cpy from '../images/btm_cpy.png';
import btm_team from '../images/btm_tem.png';
import btm_prof from '../images/btm_prof.png';
import { useNavigate } from 'react-router-dom';




const Home = () => {

    const navigate = useNavigate();

    return (
        <div>
            <Slider />

            {/*Marquee Implementation*/}
            <div className="bg-[#0096D5] rounded-lg text-white relative flex overflow-x-hidden h-10 mx-auto mt-2 border-2 border-gray-100 sm:w-3/5 lg:w-3/5 overflow-y-hidden">
                <div className="py-12 animate-marquee flex flex-col whitespace-nowrap">
                    <span className="mx-4 text-sm">91915*****05 Member withdrawl 100000 Rs</span>
                    <span className="mx-4 text-sm">91702*****84 Member withdrawl 30000 Rs</span>
                    <span className="mx-4 text sm">91827*****42 Member withdrawl 2000 Rs</span>
                    <span className="mx-4 text sm">91770*****28 Member withdrawl 500 Rs</span>
                    <span className="mx-4 text sm">91983*****17 Member withdrawl 100000 Rs</span>
                </div>
            </div>

            {/*Navigation Bar 1*/}
            <div className="bg-[#7dc1ff] rounded-lg text-white relative flex overflow-x-hidden  mx-auto mt-2 border-2 border-gray-100 sm:w-3/5 lg:w-3/5 overflow-y-hidden">
                <div className="flex flex-row justify-around items-center w-full py-2">
                    <div className='cursor-pointer mx-2 flex flex-col justify-center items-center'>
                        <img src={headphone_img} alt="online" className='w-10' />
                        <div>Online</div>
                    </div>

                    <div className='cursor-pointer mx-2 flex flex-col justify-center items-center'>
                        <img src={download_img} alt="app_dwd" className='w-10' />
                        <div>App</div>
                    </div>

                    <div className='cursor-pointer mx-2 flex flex-col justify-center items-center'>
                        <img src={recharge_img} alt="recharge" className='w-10' onClick={()=>navigate('/recharge')}/>
                        <div>Recharge</div>
                    </div>

                    <div className='cursor-pointer mx-2 flex flex-col justify-center items-center'>
                        <img src={invite_img} alt="invite" className='w-10' onClick={()=>navigate('/invite')}/>
                        <div>Invite</div>
                    </div>
                </div>
            </div>

            {/*Plans Cards*/}
            <div className="card_grid grid grid-cols-2 sm:w-3/5 lg:w-3/5 mx-auto mt-2 mb-20">
                <div className='flex flex-col'>
                    <div className='text-center bg-[#0096D5] mx-1 text-white text-lg font-medium py-2'>Ordinary machine</div>
                    <Card /><Card /><Card /><Card /><Card />
                </div>
                <div className='flex flex-col'>
                    <div className='text-center bg-[#0096D5] mx-1 text-white text-lg font-medium py-2' >Custom machine</div>
                    <Card /><Card /><Card /><Card /><Card />
                </div>
            </div>

            {/*Navigation Bar 2*/}
            <div className="fixed bottom-0 z-10 bg-white rounded-none text-[#757575] flex overflow-x-hidden  mx-auto mt-2 border-2 border-gray-100 w-full overflow-y-hidden">
                <div className="flex flex-row justify-around items-center w-full py-2">
                    <div className='cursor-pointer mx-2 flex flex-col justify-center items-center'>
                        <img src={btm_home} alt="online" className='w-8' />
                        <div>Home</div>
                    </div>

                    <div className='cursor-pointer mx-2 flex flex-col justify-center items-center' onClick={()=>navigate('/company')}>
                        <img src={btm_cpy} alt="app_dwd" className='w-8' />
                        <div>Company</div>
                    </div>

                    <div className='cursor-pointer mx-2 flex flex-col justify-center items-center' onClick={()=>navigate('/team')}>
                        <img src={btm_team} alt="recharge" className='w-8' />
                        <div>Team</div>
                    </div>

                    <div className='cursor-pointer mx-2 flex flex-col justify-center items-center' onClick={()=>navigate('/mine')}>
                        <img src={btm_prof} alt="invite" className='w-8' />
                        <div>Mine</div>
                    </div>
                </div>
            </div>





        </div>
    )
}

export default Home