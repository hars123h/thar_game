import React from 'react';
import { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { doc, getDoc, collection, addDoc, Timestamp } from 'firebase/firestore';
import db from '../firebase/config.js';
import { useNavigate, useLocation } from 'react-router-dom';
import {toast} from 'react-toastify';

const Withdrawal = () => {

    const navigate = useNavigate();
    const loc = useLocation();
    const auth = getAuth();
    const [balance, setBalance] = useState();
    const [wpassword, setWpassword] = useState('');
    const [wamount, setWamount] = useState(0);
    // const [btnActive, setBtnActive] = useState(true);
    const [details, setDetails] = useState({
        fullName:'',
        phoneNo:'',
        bankAccount:'',
        bankName:'',
        ifsc:'',
    });
    useEffect(() => {
        const getDetails = async () => {
            const docRef = await getDoc(doc(db, 'users', auth.currentUser.uid));
            if (docRef.exists()) {
                if(!docRef.data().bankDetails) {
                    toast('Fill bank details first!');
                    navigate('/bank', { state: { withdrawalPassword: loc.state.withdrawalPassword, loginPassword: loc.state.loginPassword } });
                } else {
                    setDetails(docRef.data().bankDetails);
                    docRef.data().balance?setBalance(docRef.data().balance):setBalance(0);
                }
            } else {
                console.log('Something went wrong');
            }
        }
        getDetails();
    }, []);

    const handleWithdrawalAmount = (e) => {
        if(e.target.value>balance || e.target.value==='') {
            toast('Withdrawal amount should be smaller or equal to balance');
        }else {
            setWamount(e.target.value);
        }
    }

    const handleWithdrawal = async () => {

        if(wpassword === loc.state.withdrawalPassword) {
            console.log({ withdrawalAmount: wamount, ...details, user_id:auth.currentUser.uid, status:'pending' });
        try {
            const docRef1 = await addDoc(collection(db, "withdrawals"), { withdrawalAmount: wamount, ...details, user_id:auth.currentUser.uid, time:Timestamp.now(), status:'pending' });
            const docRef2 = await addDoc(collection(db, 'users', auth.currentUser.uid, 'withdrawals'), {withdrawals_id:docRef1.id, time:Timestamp.now()});
            console.log("Document written with ID: ", docRef1.id, docRef2.id);
            toast('Withdrawal request placed successfully!',{autoClose:1000});
            navigate('/record');
        } catch (e) {
            console.error("Error adding document: ", e);
        }
        }else {
            toast('Withdrawal Password is incorrect');
            console.log(wpassword, loc.state.withdrawalPassword);
        }
        
    }

    return (
        <div className='bg-[#2e9afe] flex flex-col p-4 sm:h-[700px] md:h-[950px]'>
            <div className="options text-center text-white text-lg pt-2 font-medium">
                <svg xmlns="http://www.w3.org/2000/svg" onClick={() => navigate('/home')} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 absolute left-2  storke-white top-5 cursor-pointer">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                </svg>
                Withdrawl
            </div>

            <div className="part1 bg-[#d3d6fe] p-3 rounded-lg mx-3 mt-5">
                <div className='text-[#2e9afe] px-2 my-1  rounded-full border border-[#2e9afe] inline'>Tax 10%</div>
                <div className='flex items-center justify-start gap-2 my-1'>
                    <div className='text-[#2e9afe] text-3xl'>&#8377;</div>
                    <div className="value"> <input type="number" onChange={handleWithdrawalAmount} className='w-full text-2xl outline-none bg-[#d3d6fe] py-2' placeholder='Amount' /></div>
                </div>
                <div className='flex items-center justify-start gap-2 my-1'>
                    <div className="balance text-[#87a1c3] text-sm">Balance &#8377; {balance}</div>
                    <div className="withdraw text-[#2e9afe] text-sm cursor-pointer">Withdraw all</div>
                </div>
            </div>

            <div className="part1 bg-[#d3d6fe] p-4 rounded-lg mx-3 mt-5">

                <div className="balance flex justify-between text-[#87a1c3] text-xl p-3 border-[#87a1c3] border-b-2">
                    <div className="phoneno">Phone Number:</div>
                    <div className='text-black'>{details.phoneNo}</div>
                </div>

                <div className="balance flex justify-between text-[#87a1c3] text-xl p-3 border-[#87a1c3] border-b-2">
                    <div className="bnkac">Bank Account:</div>
                    <div className='text-black'>{details.bankAccount}</div>
                </div>

                <div className="balance flex justify-between text-[#87a1c3] text-xl p-3 border-[#87a1c3] border-b-2">
                    <div className="fullname">Full Name:</div>
                    <div className='text-black'>{details.fullName}</div>
                </div>

                <div className="balance flex justify-between text-[#87a1c3] text-xl p-3 border-[#87a1c3] border-b-2">
                    <div className="ifsc">IFSC:</div>
                    <div className='text-black'>{details.ifsc}</div>
                </div>

                <div className="balance flex justify-between text-[#87a1c3] text-xl p-3 border-[#87a1c3] border-b-2">
                    <div className="wpwd">Withdrawal Password:</div>
                    <div><input type="password" onChange={e=>setWpassword(e.target.value)} placeholder='Enter Withdrawal Password' className='outline-none bg-[#d3d6fe] w-[250px]' /></div>
                </div>

            </div>

            <div className="part1 bg-[#d3d6fe] p-3 rounded-lg mx-3 mt-5 flex flex-col gap-3">
                <div className='text-[#ff0000] text-sm'>* The time of withdrawal and arrival is subject to the real-time processing time of the local bank, and the normal arrival time is 10 minutes to 24 hours.</div>
                <div className='text-[#ff0000] text-sm'>* A single minimum withdrawal amount of not less than Rs 120.</div>
                <div className='text-[#ff0000] text-sm'>* Withdrawal time is 09:00-21:00 every day.</div>
            </div>

            <div>
                <button onClick={handleWithdrawal} className='bg-[#2e9afe] text-white text-lg mt-5 mb-20 rounded-lg shadow-md block w-full py-2 shadow-[#7899de]'>Confirm</button>
            </div>
        </div>
    )
}

export default Withdrawal