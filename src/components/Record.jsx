import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, query, where } from 'firebase/firestore';
import db from '../firebase/config.js'
import { getAuth } from 'firebase/auth';
import { RotatingLines } from 'react-loader-spinner';
import useInterval from '../hooks/useInterval.js';
import '../styles/record.css';


const Record = () => {
    const navigate = useNavigate();
    const [recharge_list, setRecharge_list] = useState([]);
    const [withdrawal_list, setWithdrawal_list] = useState([]);
    const [currentRecord, setCurrentRecord] = useState('recharges');

    const auth = getAuth();

    const getRecharges_list = async () => {
        const q = query(collection(db, "recharges"), where("user_id", "==", auth.currentUser.uid));
        var temp_Data = [];
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            temp_Data = [...temp_Data, doc.data()];
        });
        setRecharge_list(temp_Data);
    }

    const getWithdrawals_list = async () => {
        const q = query(collection(db, "withdrawals"), where("user_id", "==", auth.currentUser.uid));
        var temp_Data = [];
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            temp_Data = [...temp_Data, doc.data()];
        });
        setWithdrawal_list(temp_Data);
    }

    // This is the rate at which the polling is done to update and get the new Data
    useInterval(getRecharges_list, 10000);
    useInterval(getWithdrawals_list, 10000);


    useEffect(() => {
        const getRecharges_list = async () => {
            const q = query(collection(db, "recharges"), where("user_id", "==", auth.currentUser.uid));
            var temp_Data = [];
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                temp_Data = [...temp_Data, doc.data()];
            });
            setRecharge_list(temp_Data);
        }
        getRecharges_list();
        getWithdrawals_list();
    }, []);

    return (
        <div className=' bg-[#2e9afe] pb-3 sm:h-[1000px] md:h-screen'>

            <div className="options text-center text-white flex gap-2 items-center p-2  bg-[#2a9afe] text-lg pt-2 font-medium">
                <svg xmlns="http://www.w3.org/2000/svg" onClick={() => navigate('/mine')} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6  storke-white  cursor-pointer">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                </svg>
                <div className='flex-grow text-center'>Record</div>
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
                <div className={`h-[40px] cursor-pointer flex items-center justify-center w-1/3 text-center ${currentRecord === 'recharges' ? 'border-b border-red-400 text-red-400' : ''}`} onClick={() => setCurrentRecord('recharges')}>Recharge</div>
                <div className={`h-[40px] cursor-pointer flex items-center justify-center w-1/3 text-center ${currentRecord === 'withdrawals' ? 'border-b border-red-400 text-red-400' : ''}`} onClick={() => setCurrentRecord('withdrawals')}>Withdrawls</div>
                <div className={`h-[40px] cursor-pointer flex items-center justify-center w-1/3 text-center ${currentRecord === 'all' ? 'border-b border-red-400 text-red-400' : ''}`} onClick={() => setCurrentRecord('all')}>All Types</div>
            </div>

            {recharge_list === null && (<div className='flex flex-col justify-center items-center'>
                <RotatingLines
                    strokeColor="grey"
                    strokeWidth="2"
                    animationDuration="0.75"
                    width="96"
                    visible={true}
                />
                <div className='text-lg text-gray-500'>Loading...</div>
            </div>)}

            <div className=' overflow-y-scroll h-[500px] m-5'>
                {(currentRecord === 'recharges' || currentRecord === 'all') && recharge_list && recharge_list.map((element, id) => {
                    return (
                        <div key={id} className="bg-blue-400 rounded-lg shadow-md p-2 text-white mt-2 mx-2">
                            <div className='flex justify-between items-center'>
                                <div className='flex flex-col gap-1'>
                                    <div className='text-white text-md overflow-clip'><span className='font-bold text-gray-500'>Recharge Value:</span> &#8377;{new Intl.NumberFormat().format(element.recharge_value)}</div>
                                    <div className='text-white text-md overflow-clip'><span className='font-bold text-gray-500'>Ref No:</span> {element.refno}</div>
                                    <div className='text-white text-md overflow-clip'><span className='font-bold text-gray-500'>Status:</span> {String(element.status)}</div>
                                    <div className='text-white text-md overflow-clip'><span className='font-bold text-gray-500'>Data:</span> {new Date(element.time.seconds * 1000).toLocaleString('en-US', {
                                        
                                        day: 'numeric',
                                        month: "2-digit",
                                        year: "numeric"
                                    })}</div>

                                </div>

                            </div>
                        </div>
                    )
                })}

                {(currentRecord === 'withdrawals' || currentRecord === 'all') && withdrawal_list && withdrawal_list.map((element, id) => {
                    return (
                        <div key={id} className="bg-blue-400 rounded-lg shadow-md p-2 text-white mt-2 mx-2">
                            <div className='flex justify-between items-center'>
                                <div className='flex flex-col gap-1'>
                                    <div className='text-white text-md overflow-clip'><span className='font-bold text-gray-500'>Withdrawal Amount:</span> &#8377;{new Intl.NumberFormat().format(element.withdrawalAmount)}</div>
                                    <div className='text-white text-md overflow-clip'><span className='font-bold text-gray-500'>Status:</span> {element.status}</div>
                                    <div className='text-white text-md overflow-clip'><span className='font-bold text-gray-500'>Data:</span> {new Date(element.time.seconds * 1000).toLocaleString('en-US', {
                                        
                                        day: 'numeric',
                                        month: "2-digit",
                                        year: "numeric"
                                    })}</div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>




        </div>
    )
}

export default Record