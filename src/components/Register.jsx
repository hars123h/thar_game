import React, { useState } from 'react';
import hp_logo from '../images/hp_logo.png';
import { useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import referralCodeGenerator from 'referral-code-generator'
import db from '../firebase/config.js';
import { setDoc, doc, updateDoc, query, collection, where, getDocs } from "firebase/firestore";



const Register = () => {

    const navigate = useNavigate();
    const auth = getAuth();
    const [mobno, setMobno] = useState('');
    const [pwd, setpwd] = useState('');
    const [cpwd, setCpwd] = useState('');
    const [wpwd, setwpwd] = useState('');
    const [invt, setInvt] = useState('');

    const handleRegister = async () => {
        console.log({ mobno, pwd, cpwd, wpwd, invt });
        const new_mobno = mobno + '@gmail.com';
        createUserWithEmailAndPassword(auth, new_mobno, pwd)
            .then((userCredential) => {
                console.log(userCredential);
                try {
                    console.log(auth.currentUser.uid);
                    setDoc(doc(db, "users", auth.currentUser.uid), {
                        mobno,
                        pwd,
                        wpwd,
                        time: new Date(),
                        balance: 0,
                        recharge_amount: 0,
                        earning: 0,
                        user_invite: referralCodeGenerator.alphaNumeric('lowercase', 5, 2),
                        parent_invt: invt,
                        grand_parent_int: '',
                        directRecharge:0,
                        indirectRecharge:0,
                        directMember:[],
                        indirectMember:[]
                    }).then(() => {
                        const usersRef = collection(db, "users");
                        const q = getDocs(query(usersRef, where('user_invite', '==', invt)));
                        return q;
                    }).then((q) => {
                        const newRef = doc(db, 'users', auth.currentUser.uid);
                        console.log(q);
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
                        const newRef2 = doc(db, 'users', auth.currentUser.uid);
                        
                        updateDoc(newRef2, {
                            grand_parent_id: qw._snapshot.docChanges[0].doc.key.path.segments[6],
                        });
                        const new_qw = getDocs(query(collection(db, "users"), where("user_invite", "==", qw._snapshot.docChanges[0].doc.data.value.mapValue.fields.parent_invt.stringValue)));
                        return new_qw;
                    }).then((new_qw)=>{
                        const newRef3 = doc(db, 'users', auth.currentUser.uid);
                        //console.log(qw, 'this is the last then');
                        console.log(new_qw);
                        updateDoc(newRef3, {
                            great_grand_parent_id:new_qw._snapshot.docChanges[0].doc.key.path.segments[6],
                        })
                    });
                    console.log("Document written successfully");
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
                console.log(errorCode, errorMessage);
            });

    }

    return (
        <div>
            <div className='text-center bg-[#0096D5] font-sans text-white pt-2 text-lg 
        pb-2'> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 absolute left-2 cursor-pointer hover:bg-white hover:stroke-black hover:rounded-full transition rounded-full ease-in-out delay-150 duration-200">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
                Register</div>
            <div className='text-center'>
                <img src={hp_logo} alt="hp_logo" className='m-auto md:w-1/5 sm:w-2/5' />
            </div>
            <div className="box mb-20 border-2 m-auto border-gray-200 rounded-3xl border-solid lg:w-2/5 w-4/5 shadow-xl p-4 w-50% flex flex-col">
                <input value={mobno} onChange={e => setMobno(e.target.value)} type="text" className='p-2 outline-none mb-2 border-2 border-gray-100 rounded-full' placeholder='Phone number' name="phoneno" id="phoneno" />
                <input value={pwd} onChange={e => setpwd(e.target.value)} type="password" className='p-2 mb-2 outline-none border-2 border-gray-100 rounded-full' placeholder='Please enter login password' name="passowrd" id="pass" />
                <input value={cpwd} onChange={e => setCpwd(e.target.value)} type="password" className='p-2 mb-2 outline-none border-2 border-gray-100 rounded-full' placeholder='Please confirm the login password' name="cnfpass" id="cnfpass" />
                <input value={wpwd} onChange={e => setwpwd(e.target.value)} type="password" className='p-2 mb-2 outline-none border-2 border-gray-100 rounded-full' placeholder="Please enter the Withdrawal password" name="withpassword" id="wthpass" />
                <input value={invt} onChange={e => setInvt(e.target.value)} type="text" className='p-2 mb-2  outline-none border-2 border-gray-100 rounded-full' placeholder='Invitation code' name="invite_code" id="inv_code" />
                <button onClick={handleRegister} className='bg-[#0096D5] text-white pt-1 pb-1 rounded-full text-lg'>Register</button>
                <div onClick={() => navigate('/login')} className='cursor-pointer text-center text-[#00704A] mt-2 p-2 mb-2 border-2 border-gray-100 rounded-full'>
                    Already have an account, log in
                </div>
            </div>
        </div>
    )
}

export default Register