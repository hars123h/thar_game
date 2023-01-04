import React, { useEffect } from 'react';
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
import ReactModal from 'react-modal';
import { toast } from 'react-toastify';
import { arrayUnion, doc, getDoc, increment, updateDoc } from 'firebase/firestore';
import db from '../firebase/config.js';
import { getAuth } from 'firebase/auth';

import product_img1 from '../images/product_img1.jpg';
import product_img2 from '../images/product_img2.jpg';
import product_img3 from '../images/product_img3.jpg';
import product_img4 from '../images/product_img4.jpg';

import product_img5 from '../images/product_img5.jpg';
import product_img6 from '../images/product_img6.jpg';
import product_img7 from '../images/product_img7.jpg';
import product_img8 from '../images/product_img8.jpg';

import product_img9 from '../images/product_img9.jpg';
import product_img10 from '../images/product_img10.jpg';
import product_img11 from '../images/product_img11.jpg';
import product_img12 from '../images/product_img12.jpg';

import product_img13 from '../images/product_img13.jpg';



const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

const Home = () => {

    const navigate = useNavigate();
    const auth = getAuth();
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [quantity, setQuantity] = React.useState(0);
    const [currPlan, setCurrPlan] = React.useState(null);
    const [userDetails, setUserDetails] = React.useState(null);

    const openModal = () => {
        setIsOpen(true);
    }

    const getUserDetails = async () => {
        const docRef = doc(db, 'users', auth.currentUser.uid);
        await getDoc(docRef).then(doc => {
            if (doc.exists()) {
                //console.log(doc.data());
                setUserDetails(doc.data());
            } else {
                //console.log('Data not found');
            }
        }).catch(error => console.log('Some error occured', error));
    }

    useEffect(() => {
        getUserDetails();
    }, []);

    const closeModal = async (action) => {
        if (action === 'cancel') {
            setIsOpen(false);
        } else if (quantity <= 0) {
            toast('Please a positive value!', { autoClose: 1000 });
        } else {
            //console.log({...currPlan, quantity});
            //setCurrPlan({...currPlan, quantity});
            if (quantity * (currPlan.plan_amount) > userDetails.balance) {
                toast("You don't have enough balance to make this purchase", { autoClose: 1000 });
            } else {
                const docRef = doc(db, 'users', auth.currentUser.uid);
                await updateDoc(docRef, {
                    balance: increment(-1 * (quantity * (currPlan.plan_amount))),
                    plans_purchased: arrayUnion({
                        ...currPlan,
                        quantity: quantity,
                        date_purchased: new Date().toDateString(),
                        date_till_rewarded: new Date().toDateString(),
                        time: new Date().toDateString()
                    })
                }).then(() => {
                    //console.log('Product successfully purchased');
                    toast('Plan purchased!');
                    navigate('/project');
                }).catch((error) => {
                    console.log('Some error occured', error);
                    toast('Some error occured, try again after some time');
                })
            }
            setIsOpen(false);
        }
    }

    const handleClick = (plan_name, plan_type, plan_amount, plan_daily_earning, plan_cycle) => {
        openModal();
        setCurrPlan({ plan_name, plan_type, plan_amount, plan_daily_earning, plan_cycle });
    }

    return (
        <div>
            <Slider />

            <div>
                <ReactModal
                    isOpen={modalIsOpen}
                    style={customStyles}
                    contentLabel="Enter Project Quantity"
                    ariaHideApp={false}

                >
                    <h1 className='text-gray-600 mb-3 text-xl'>Choose a quantity</h1>
                    <input type="number" onChange={e => setQuantity(e.target.value)} name="quantity" id="qnty" placeholder='Enter a Quantity' className='outline-none rounded-lg border-2 border-gray-400 focus:border-blue-500 p-3' />
                    <h6 className='text-red-500 text-xs mb-3'>*only positive values</h6>
                    <div>
                        <button onClick={() => closeModal('ok')} className='bg-blue-500 text-white px-2 py-1 rounded-lg shadow-md w-[64px]'>ok</button>
                        <button onClick={() => closeModal('cancel')} className='bg-red-500 text-white px-2 py-1 rounded-lg shadow-md w-[64px] ml-2'>cancel</button>
                    </div>
                </ReactModal>
            </div>

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
                    <a href="https://t.me/interviewtcs" className=' no-underline text-white cursor-pointer'>
                        <div className='cursor-pointer mx-2 flex flex-col justify-center items-center'>
                            <img src={headphone_img} alt="online" className='w-10' />
                            <div>Online</div>
                        </div>
                    </a>

                    <div className='cursor-pointer mx-2 flex flex-col justify-center items-center'>
                        <img src={download_img} alt="app_dwd" className='w-10' />
                        <div>App</div>
                    </div>

                    <div className='cursor-pointer mx-2 flex flex-col justify-center items-center'>
                        <img src={recharge_img} alt="recharge" className='w-10' onClick={() => navigate('/recharge')} />
                        <div>Recharge</div>
                    </div>

                    <div className='cursor-pointer mx-2 flex flex-col justify-center items-center'>
                        <img src={invite_img} alt="invite" className='w-10' onClick={() => navigate('/invite')} />
                        <div>Invite</div>
                    </div>
                </div>
            </div>

            {/*Plans Cards*/}
            <div className="card_grid grid grid-cols-1 sm:w-3/5 lg:w-3/5 mx-auto mt-2 mb-20">
                <div className='text-center bg-[#0096D5] mx-1 text-white text-lg font-medium py-2'>Big Plans</div>

                <div className='grid grid-cols-2'>
                    <Card product_image={product_img1}  handleClick={handleClick} plan_name={"Sstone Plan 1"} plan_cycle={90} plan_daily_earning={90} plan_amount={600} plan_type={'Big Plan'} />
                    <Card product_image={product_img2} handleClick={handleClick} plan_name={"Sstone Plan 2"} plan_cycle={90} plan_daily_earning={260} plan_amount={2000} plan_type={'Big Plan'} />
                    <Card product_image={product_img3} handleClick={handleClick} plan_name={"Sstone Plan 3"} plan_cycle={90} plan_daily_earning={410} plan_amount={3000} plan_type={'Big Plan'} />
                    <Card product_image={product_img4} handleClick={handleClick} plan_name={"Sstone Plan 4"} plan_cycle={90} plan_daily_earning={810} plan_amount={5000} plan_type={'Big Plan'} />
                    {/* Some Plans will unlock after using the website for some days */}
                    <Card product_image={product_img5} handleClick={handleClick} plan_name={"Sstone Plan 5"} plan_cycle={90} plan_daily_earning={2000} plan_amount={10000} plan_type={'Big Plan'} />
                    <Card product_image={product_img6} handleClick={handleClick} plan_name={"Sstone Plan 6"} plan_cycle={90} plan_daily_earning={4000} plan_amount={18000} plan_type={'Big Plan'} />
                    <Card product_image={product_img7} handleClick={handleClick} plan_name={"Sstone Plan 7"} plan_cycle={90} plan_daily_earning={12000} plan_amount={35000} plan_type={'Big Plan'} />
                    <Card product_image={product_img8} handleClick={handleClick} plan_name={"Sstone Plan 8"} plan_cycle={90} plan_daily_earning={25000} plan_amount={55000} plan_type={'Big Plan'} />

                </div>
                <div className='text-center bg-[#0096D5] mx-1 text-white text-lg font-medium py-2' >Short Plans</div>
                <div className='grid grid-cols-2'>
                    <Card product_image={product_img9} handleClick={handleClick} plan_name={"Sstone Plan 9"} plan_cycle={2} plan_daily_earning={250} plan_amount={350} plan_type={'Short Plan'} />
                    <Card product_image={product_img10} handleClick={handleClick} plan_name={"Sstone Plan 10"} plan_cycle={3} plan_daily_earning={500} plan_amount={1000} plan_type={'Short Plan'} />
                    <Card product_image={product_img11} handleClick={handleClick} plan_name={"Sstone Plan 11"} plan_cycle={2} plan_daily_earning={2800} plan_amount={3500} plan_type={'Short Plan'} />
                    <Card product_image={product_img12} handleClick={handleClick} plan_name={"Sstone Plan 12"} plan_cycle={2} plan_daily_earning={4800} plan_amount={7000} plan_type={'Short Plan'} />
                    <Card product_image={product_img13} handleClick={handleClick} plan_name={"Sstone Plan 13"} plan_cycle={2} plan_daily_earning={15000} plan_amount={20000} plan_type={'Short Plan'} />
                </div>
            </div>



            {/*Navigation Bar 2*/}
            <div className="fixed bottom-0 z-10 bg-white rounded-none text-[#757575] flex overflow-x-hidden  mx-auto mt-2 border-2 border-gray-100 w-full overflow-y-hidden">
                <div className="flex flex-row justify-around items-center w-full py-2">
                    <div className='cursor-pointer mx-2 flex flex-col justify-center items-center'>
                        <img src={btm_home} alt="online" className='w-8' />
                        <div>Home</div>
                    </div>

                    <div className='cursor-pointer mx-2 flex flex-col justify-center items-center' onClick={() => navigate('/company')}>
                        <img src={btm_cpy} alt="app_dwd" className='w-8' />
                        <div>Company</div>
                    </div>

                    <div className='cursor-pointer mx-2 flex flex-col justify-center items-center' onClick={() => navigate('/team')}>
                        <img src={btm_team} alt="recharge" className='w-8' />
                        <div>Team</div>
                    </div>

                    <div className='cursor-pointer mx-2 flex flex-col justify-center items-center' onClick={() => navigate('/mine')}>
                        <img src={btm_prof} alt="invite" className='w-8' />
                        <div>Mine</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home