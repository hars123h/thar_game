import React, { useState } from 'react';
// import hp_logo from '../images/hp_logo.png';
import { useNavigate, useParams } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import referralCodeGenerator from 'referral-code-generator'
import db from '../firebase/config.js';
import { setDoc, doc, updateDoc, query, collection, where, getDocs, getDoc, arrayUnion } from "firebase/firestore";
import { toast } from 'react-toastify';
import { useContext } from 'react';
import { AmountContext } from '../App';
import siteTheme from '../images/siteTheme.png';
import latest_logo from '../images/latest_logo.jpg';

const Register = () => {

    const navigate = useNavigate();
    const auth = getAuth();
    const {invite_code} = useParams();
    const [otp, setOtp] = useState('');
    const [otpfield, setOTPfield] = useState('');
    const [mobno, setMobno] = useState('');
    const [pwd, setpwd] = useState('');
    const [cpwd, setCpwd] = useState('');
    const [wpwd, setwpwd] = useState('');
    const [invt, setInvt] = useState(invite_code);
    const amountDetails = useContext(AmountContext);

    const handleRegister = async () => {
        if(otp!==otpfield) {
            toast('Wrong OTP entered!');
            return;
        }
        //console.log({ mobno, pwd, cpwd, wpwd, invt });
        const new_mobno = mobno + '@gmail.com';
        createUserWithEmailAndPassword(auth, new_mobno, pwd)
            .then((userCredential) => {
                //console.log(userCredential);
                try {
                    //console.log(auth.currentUser.uid);
                    setDoc(doc(db, "users", auth.currentUser.uid), {
                        mobno,
                        pwd,
                        wpwd,
                        time: new Date(),
                        balance: amountDetails.invite_bonus,
                        recharge_amount: 0,
                        earning: 0,
                        user_invite: referralCodeGenerator.alphaNumeric('lowercase', 5, 2),
                        parent_invt: invt,
                        grand_parent_int: '',
                        directRecharge:0,
                        indirectRecharge:0,
                        directMember:[],
                        indirectMember:[],
                        boughtLong:0,
                        showShort:0
                    }).then(() => {
                        const usersRef = collection(db, "users");
                        const q = getDocs(query(usersRef, where('user_invite', '==', invt)));
                        return q;
                    }).then((q) => {
                        const newRef = doc(db, 'users', auth.currentUser.uid);
                        //console.log(q);
                        updateDoc(newRef, {
                            parent_id: q._snapshot.docChanges[0].doc.key.path.segments[6],
                            grand_parent_int: q._snapshot.docChanges[0].doc.data.value.mapValue.fields.parent_invt
                        });
                        return q._snapshot.docChanges[0].doc.data.value.mapValue.fields.parent_invt.stringValue;
                    }).then((invite_code) => {
                        const usersRef2 = collection(db, "users");
                        const qw = getDocs(query(usersRef2, where('user_invite', '==', invite_code)));
                        return qw;
                    }).then((qw) => {
                        //console.log(qw);
                        updateDoc(doc(db, 'users', auth.currentUser.uid), {
                            grand_parent_id: qw._snapshot.docChanges[0].doc.key.path.segments[6],
                        });
                        const new_qw = getDocs(query(collection(db, "users"), where("user_invite", "==", qw._snapshot.docChanges[0].doc.data.value.mapValue.fields.parent_invt.stringValue)));
                        return new_qw;
                    }).then((new_qw)=>{
                        const newRef3 = doc(db, 'users', auth.currentUser.uid);
                        //console.log(qw, 'this is the last then');
                        //console.log(new_qw);
                        updateDoc(newRef3, {
                            great_grand_parent_id:new_qw._snapshot.docChanges[0].doc.key.path.segments[6],
                        })
                        const userData = getDoc(doc(db, 'users', auth.currentUser.uid));
                        return userData;
                    }).then((userData)=>{
                        console.log(userData.data());
                        updateDoc(doc(db, 'users', userData.data().parent_id), {
                            directMember: arrayUnion(auth.currentUser.uid)
                        });
                        updateDoc(doc(db, 'users', userData.data().grand_parent_id), {
                            indirectMember: arrayUnion(auth.currentUser.uid)
                        });
                        updateDoc(doc(db, 'users', userData.data().great_grand_parent_id), {
                            indirectMember: arrayUnion(auth.currentUser.uid)
                        });
                    })
                    //console.log("Document written successfully");
                } catch (e) {
                    console.error("Error adding document: ", e);
                }

                setMobno('');
                setpwd('');
                setCpwd('');
                setwpwd('');
                setInvt('');
                navigate('/home');
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error(errorCode, errorMessage);
            });

    }

    const handleOTPSend = (otpGenerated) => {
        //toast('I was clicked');
        setOTPfield(otpGenerated)
        fetch(`https://www.fast2sms.com/dev/bulkV2?authorization=27b58V4YOqBDMgWvNjapz1k9IHlrJfynC6w0hceRAZGoLimK3PuJC7OoiV4N2B6DjfwWKzb0lhgEetPH&variables_values=${otpGenerated}&route=otp&numbers=${mobno}`)
            .then((response) => {
                //console.log(response);
                toast('OTP sent successfully');
            })
            .catch(error => toast('Something went wrong'));
    }
//[#0096D5]
    return (
        <div>
            <div className='text-center bg-yellow-500 font-sans text-white pt-2 text-lg 
        pb-2'> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 absolute left-2 cursor-pointer hover:bg-white hover:stroke-black hover:rounded-full transition rounded-full ease-in-out delay-150 duration-200">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
                Register</div>
            <div className='text-center'>
                <img src={latest_logo} alt="hp_logo" className='m-auto md:w-1/5 sm:w-1/5 my-5' width={300} />
            </div>
            <div className="box mb-20 border-2 m-auto border-gray-200 rounded-xl border-solid lg:w-2/5 w-4/5 shadow-xl p-4 w-50% flex flex-col">
                <input value={mobno} onChange={e => setMobno(e.target.value)} type="text" className='p-2 outline-none mb-2 border-2 border-gray-100 rounded-full' placeholder='Phone number' name="phoneno" id="phoneno" />
                <div className='flex border-2 border-gray-100 rounded-full mb-2'>
                    <input type="text" onChange={e=>setOtp(e.target.value)}  className='p-2 w-[90%] outline-none rounded-full' placeholder='OTP' name="otp" id="otp"/>
                    <button className='bg-yellow-500 text-white text-xs mr-1 px-4 my-1  rounded-full' onClick={()=>handleOTPSend(String(Math.floor(100000 + Math.random() * 900000)))}>OTP</button>
                </div>
                <input value={pwd} onChange={e => setpwd(e.target.value)} type="password" className='p-2 mb-2 outline-none border-2 border-gray-100 rounded-full' placeholder='Please enter login password' name="passowrd" id="pass" />
                <input value={cpwd} onChange={e => setCpwd(e.target.value)} type="password" className='p-2 mb-2 outline-none border-2 border-gray-100 rounded-full' placeholder='Please confirm the login password' name="cnfpass" id="cnfpass" />
                <input value={wpwd} onChange={e => setwpwd(e.target.value)} type="password" className='p-2 mb-2 outline-none border-2 border-gray-100 rounded-full' placeholder="Please enter the Withdrawal password" name="withpassword" id="wthpass" />
                <input value={invt} onChange={e => setInvt(e.target.value)} type="text" className='p-2 mb-2  outline-none border-2 border-gray-100 rounded-full' placeholder='Invitation code' name="invite_code" id="inv_code" />
                {/*[#0096D5] [#00704A]*/}
                <button onClick={handleRegister} className='bg-yellow-500 text-white pt-1 pb-1 rounded-full text-lg'>Register</button>
                <div onClick={() => navigate('/login')} className='cursor-pointer text-center text-gray-500 mt-2 p-2 mb-2 border-2 border-gray-100 rounded-full'>
                    Already have an account, log in
                </div>
            </div>
        </div>
    )
}

export default Register