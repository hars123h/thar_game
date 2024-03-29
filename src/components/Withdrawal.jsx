import React from 'react';
import { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { doc, getDoc, collection, addDoc, Timestamp, updateDoc } from 'firebase/firestore';
import db from '../firebase/config.js';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useContext } from 'react';
import { AmountContext } from '../App.js';


const Withdrawal = () => {

    const navigate = useNavigate();
    const loc = useLocation();
    const auth = getAuth();
    const amountDetails = useContext(AmountContext)
    const [otp, setOtp] = useState('');
    const [otpfield, setOTPfield] = useState('');
    const [balance, setBalance] = useState();
    const [wpassword, setWpassword] = useState('');
    const [wamount, setWamount] = useState(0);
    // const [btnActive, setBtnActive] = useState(true);
    const [details, setDetails] = useState({
        fullName: '',
        phoneNo: '',
        bankAccount: '',
        bankName: '',
        ifsc: '',
    });
    useEffect(() => {

        const getDetails = async () => {
            const docRef = await getDoc(doc(db, 'users', auth.currentUser.uid));
            if (docRef.exists()) {
                if (!docRef.data().bankDetails) {
                    toast('Fill bank details first!');
                    navigate('/bank', { state: { withdrawalPassword: loc.state.withdrawalPassword, loginPassword: loc.state.loginPassword } });
                } else {
                    setDetails(docRef.data().bankDetails);
                    docRef.data().balance ? setBalance(docRef.data().balance) : setBalance(0);
                }
            } else {
                console.log('Something went wrong');
            }
        }
        getDetails();
        
    }, []);


    const handleWithdrawalAmount = (e) => {
        setWamount(e.target.value);
    }

    const handleWithdrawal = async () => {

        

        if (Number(wamount) === false || Number(wamount) <= 0) {
            toast('Enter a valid number');
            return;
        }

        if ((Number(wamount)) < Number(amountDetails.mwamount)) {
            //console.log((Number(wamount)+Number(amountDetails.withdrawal_fee)), Number(amountDetails.mwamount));
            toast(`Amount should be greater than ${amountDetails.mwamount}`);
            //console.log(wamount, amountDetails.amount);
            return;
        }

        if ((Number(wamount) > 50000)) {
            toast('Amount should be greatr than Rs 50,000');
            return;
        }

        if (((Number(wamount)) > Number(balance))) {
            toast('You dont have enough balance');
            return;
        }

        if (wpassword === loc.state.withdrawalPassword && otp === otpfield) {
            //console.log({ withdrawalAmount: wamount, ...details, user_id:auth.currentUser.uid, status:'pending' });
            try {
                const docRef1 = await addDoc(collection(db, "withdrawals"), { withdrawalAmount: (Number(wamount)), ...details, afterDeduction: (Number(wamount) - (Number(amountDetails.withdrawal_fee) * Number(wamount) / 100)), user_id: auth.currentUser.uid, time: Timestamp.now(), status: 'pending' });
                const docRef2 = await addDoc(collection(db, 'users', auth.currentUser.uid, 'withdrawals'), { withdrawals_id: docRef1.id, time: Timestamp.now() });
                const docRef3 = await updateDoc(doc(db, 'users', auth.currentUser.uid), {balance: (balance-Number(wamount))});
                //console.log("Document written with ID: ", docRef1.id, docRef2.id);
                toast('Withdrawal request placed successfully!', { autoClose: 1000 });
                navigate('/record');
            } catch (e) {
                console.error("Error adding document: ", e);
            }
        } else {
            toast('Withdrawal Password is incorrect');
            //console.log(wpassword, loc.state.withdrawalPassword);
        }

    }

    const handleOTPSend = (otpGenerated) => {
        //toast('I was clicked');
        setOTPfield(otpGenerated)
        fetch(`https://www.fast2sms.com/dev/bulkV2?authorization=27b58V4YOqBDMgWvNjapz1k9IHlrJfynC6w0hceRAZGoLimK3PuJC7OoiV4N2B6DjfwWKzb0lhgEetPH&variables_values=${otpGenerated}&route=otp&numbers=${details.phoneNo}`)
            .then((response) => {
                //console.log(response);
                toast('OTP sent successfully');
            })
            .catch(error => toast('Something went wrong'));
    }

    const handleWithdrawalAll = () => {
        document.getElementById('withdrawal_field').value = balance;
        setWamount(balance);
    }
    //[#2e9afe]
    return (
        <div className='bg-blue-500 flex flex-col p-4 sm:h-[1000px] md:h-[950px]'>
            <div className="options text-center text-white text-lg pt-2 font-medium">
                <svg xmlns="http://www.w3.org/2000/svg" onClick={() => navigate('/home')} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 absolute left-2  storke-white top-5 cursor-pointer">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                </svg>
                Withdrawl
            </div>
{/*| After Deduction} */}
            <div className="part1 bg-[#d3d6fe] p-3 rounded-lg mx-3 mt-5">
                <div className='text-blue-600 px-2 my-1  rounded-full border border-blue-600 inline'>Withdrawal Fee {amountDetails.withdrawal_fee}% | Rs.{(Number(wamount) - (Number(amountDetails.withdrawal_fee) * Number(wamount) / 100))}</div>
                <div className='flex items-center justify-start gap-2 my-1'>
                    <div className='text-blue-600 text-3xl'>&#8377;</div>
                    <div className="value"> <input type="number" id="withdrawal_field" onChange={handleWithdrawalAmount} className='w-full text-2xl outline-none bg-[#d3d6fe] py-2' placeholder='Amount' /></div>
                </div>
                <div className='flex items-center justify-start gap-2 my-1'>
                    <div className="balance text-blue-600 text-sm">Balance &#8377; {balance}</div>
                    <div onClick={handleWithdrawalAll} className="withdraw text-blue-600 text-sm cursor-pointer">Withdraw all</div>
                </div>
            </div>

            <div className="part1 bg-[#d3d6fe] p-4 rounded-lg mx-3 mt-5">
                {/* #87a1c3 */}
                <div className="balance flex justify-between text-gray-600 text-xl p-3 border-[#87a1c3] border-b-2">
                    <div className="phoneno">Phone Number:</div>
                    <div className='text-black text-sm'>{details.phoneNo}</div>
                </div>

                <div className="balance flex justify-between text-gray-600 text-xl p-3 border-[#87a1c3] border-b-2">
                    <div className="bnkac">Bank Account:</div>
                    <div className='text-black text-sm'>{details.bankAccount}</div>
                </div>

                <div className="balance flex justify-between text-gray-600 text-xl p-3 border-[#87a1c3] border-b-2">
                    <div className="fullname">Full Name:</div>
                    <div className='text-black text-sm'>{details.fullName}</div>
                </div>

                <div className="balance flex justify-between text-gray-600 text-xl p-3 border-[#87a1c3] border-b-2">
                    <div className="ifsc">IFSC:</div>
                    <div className='text-black text-sm'>{details.ifsc}</div>
                </div>

                <div className="balance flex justify-between text-gray-600 sm:text-md md:text-xl p-3 border-[#87a1c3] border-b-2">
                    <div className="wpwd w-2/3">Withdrawal Password:</div>
                    <input type="password" onChange={e => setWpassword(e.target.value)} placeholder='Enter Password' className='outline-none bg-[#d3d6fe] w-1/3' />
                </div>

                <div className="balance flex justify-between text-gray-600 sm:text-md md:text-xl p-3 border-[#87a1c3] border-b-2">
                    <div className="wpwd w-2/3">OTP: <span className='text-sm bg-blue-500 text-white px-3 py-1 hover:cursor-pointer rounded-full' onClick={() => handleOTPSend(String(Math.floor(100000 + Math.random() * 900000)))}>Send OTP</span></div>
                    <input type="password" onChange={e => setOtp(e.target.value)} placeholder='Enter OTP' className='outline-none bg-[#d3d6fe] w-1/3' />
                </div>

            </div>

            <div className="part1 bg-[#d3d6fe] p-3 rounded-lg mx-3 mt-5 flex flex-col gap-3">
                <div className='text-amber-800 text-sm'>* The time of withdrawal and arrival is subject to the real-time processing time of the local bank, and the normal arrival time is 10 minutes to 24 hours.</div>
                <div className='text-amber-800 text-sm'>* A single minimum withdrawal amount of not less than Rs {amountDetails.mwamount}.</div>
                <div className='text-amber-800 text-sm'>* Withdrawal Time is 9:00 to 19:00  Everyday.</div>
            </div>
            {/* [#2e9afe] */}
            <div>
                <button onClick={handleWithdrawal} className='bg-blue-600 text-white text-lg mt-5 mb-20 rounded-lg shadow-md block w-full py-2 shadow-amber-400'>Confirm</button>
            </div>
        </div>
    )
}

export default Withdrawal