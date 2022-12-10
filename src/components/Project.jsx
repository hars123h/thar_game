import { getAuth } from 'firebase/auth';
import { doc, getDoc, increment, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useNavigate, } from 'react-router-dom';
import db from '../firebase/config';
import { RotatingLines } from 'react-loader-spinner';
import DateDifference from '../utility/DateDifference.js';
import {toast} from 'react-toastify';


const Project = () => {
    const navigate = useNavigate();
    const auth = getAuth();
    const [userDetails, setUserDetails] = useState(null);
    const [loading, setLoading] = useState(true);

    const getUserDetails = async () => {
        const docRef = doc(db, 'users', auth.currentUser.uid);
        await getDoc(docRef).then(document => {
            if (document.exists()) {
                setUserDetails(document.data());
                if(('plans_purchaed' in document.data())===false) {
                    toast('Please buy a plan first!');
                    navigate('/mine');
                }
                if (document.data().plans_purchased) {
                    var earn = 0;
                    var temp = document.data().plans_purchased.map((element) => {
                        var days = DateDifference(new Date(element.date_till_rewarded), new Date());
                        console.log(days, element);
                        if (days > element.plan_cycle) {
                            return {
                                ...element
                            }
                        }
                        earn = earn + (days * element.quantity * element.plan_daily_earning);
                        return {
                            ...element,
                            date_till_rewarded: new Date().toDateString()
                        }
                    });
                    const docRef1 = doc(db, 'users', auth.currentUser.uid);

                    updateDoc(docRef1, {
                        earning: increment(earn),
                        balance: increment(earn),
                        plans_purchased: temp
                    })
                        .then(() => console.log('Reward successfully updated'))
                        .catch(error => console.log('Some error Occured'));

                }
            } else {
                console.log('Data not found');
            }
            setLoading(false);

        }).then(() => {
            console.log('This is working');
        })
            .catch(error => console.log('Some error occured', error));
    }

    useEffect(() => {
        setLoading(true);
        getUserDetails();
        console.log(userDetails);
        console.log('Use Effect Ran');
    }, []);

    if (loading) {
        return (
            <div className="grid place-items-center h-screen ">
                <div className='flex flex-col justify-center items-center'>
                    <RotatingLines
                        strokeColor="grey"
                        strokeWidth="2"
                        animationDuration="0.75"
                        width="96"
                        visible={true}
                    />
                    <div className='text-lg text-gray-500'>Loading...</div>
                </div>
            </div>
        )
    }



    return (
        <div className='h-screen bg-[#2e9afe]'>

            <div className="options text-center bg-[#2e9afe] text-white text-md pt-5 font-normal pb-4">
                <svg xmlns="http://www.w3.org/2000/svg" onClick={() => navigate(-1)} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 absolute left-2  storke-white top-5 cursor-pointer">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                </svg>
                Project Record
            </div>


            <div className='records w-full flex bg-[#d3d6fe] items-center'>
                <div className='h-[40px] flex items-center justify-center w-1/2 text-center border-b-4 font-semibold border-[#0172fe] text-[#0172fe]'>Earning</div>
                <div className='h-[40px] flex items-center justify-center w-1/2 text-center text-white'>Completed</div>
            </div>

            <div className='overflow-y-scroll h-[600px] mx-auto w-[95%] m-4'>
                {
                    userDetails && ('plans_purchased' in userDetails) && (
                        userDetails.plans_purchased.map((element, index) => {
                            return (
                                <div key={index} className='mx-auto w-[90%] mt-2 border-2 border-gray-200 p-2 rounded-lg shadow-lg'>
                                    <div>Plan Name: {element.plan_name}</div>
                                    <div>Start Date: {element.date_purchased}</div>
                                    <div>Plan Amount: {element.plan_amount}</div>
                                    <div>Plan Type: {element.plan_type}</div>
                                    <div>Plan Cycle: {element.plan_cycle}</div>
                                    <div>Plan Daily Earning: {element.plan_daily_earning}</div>
                                    <div>Quantity: {element.quantity}</div>
                                    <div>Current Earning: {DateDifference(new Date(element.time), new Date()) * element.quantity * element.plan_daily_earning}</div>
                                </div>
                            )
                        })
                    )
                }
            </div>

            {!userDetails?.plans_purchased && (
                <div className='text-2xl text-white text-center w-[90%] mx-auto p-3 m-3 border-2 border-gray-300 rounded-lg shadow-lg'>
                    No data to show!
                </div>
            )}
        </div>
    )
}

export default Project