import React from 'react';
import hp_small from '../images/hp_small.png';
import invite_img from '../images/invite_img.png';
import btm_home from '../images/btm_home.png';
import btm_cpy from '../images/btm_cpy.png';
import btm_team from '../images/btm_tem.png';
import btm_prof from '../images/btm_prof.png';
import recharge1_img from '../images/recharge1_img.png';
import project_img from '../images/project_img.png';
import pot_img from '../images/pot_img.png';
import doc_img from '../images/doc_img.png';
import setting_img from '../images/setting_img.png';
import { useNavigate } from 'react-router-dom';
import { signOut, getAuth } from 'firebase/auth';
import { useLayoutEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import db from '../firebase/config';
import { useState } from 'react';
import ss_logo from '../images/ss_logo.jpg';
import { RotatingLines } from 'react-loader-spinner';


const Mine = () => {

  const navigate = useNavigate();
  const auth = getAuth();
  const [mobileno, setMobileno] = useState('');
  const [recharge_amount, setRecharge_amount] = useState(0);
  const [balance, setBalance] = useState(0);
  const [originalwpwd, setOriginalwpwd] = useState(null);
  const [originalpwd, setOriginalpwd] = useState(null);
  const [earning, setEarning] = useState(0);
  const [loading, setLoading] = useState(true);

  useLayoutEffect(() => {
    const getUserInfo = async () => {
      const docRef = await getDoc(doc(db, 'users', auth.currentUser.uid));
      if (docRef.exists()) {
        //console.log(docRef.data());
        setMobileno(docRef.data().mobno);
        setRecharge_amount(docRef.data().recharge_amount);
        setBalance(docRef.data().balance);
        setEarning(docRef.data().earning);
        setOriginalwpwd(docRef.data().wpwd);
        setOriginalpwd(docRef.data().pwd);
        //console.log(new Date(((docRef.data().time.toDate()))));
      } else {
        console.log('Document does not exits');
      }
    }
    setLoading(true);
    getUserInfo()
      .then(() => setLoading(false));
  }, []);

  const handleSignOut = () => {
    signOut(auth).then(() => {
      navigate('/login');
    }).catch((error) => {
      console.log(error.message, error.code);
    });
  }

  if (loading) {
    return (
      <div className='flex flex-col justify-center items-center  h-screen bg-gray-50 z-10 opacity-90'>
        <RotatingLines
          strokeColor="grey"
          strokeWidth="2"
          animationDuration="0.75"
          width="96"
          visible={true}
        />
        <div>Loading...</div>
      </div>
    )
  }

  return (
    <div>

      <div className='flex flex-col'>

        <div className="top bg-[#2e9afe] h-56">

          <div className="info pt-10 pl-10 flex items-center justify-start">
            <div className='flex justify-center items-center'><img src={ss_logo} alt="logo" className='w-20 rounded-full' /></div>
            <div className="user_no flex flex-col text-white ml-5">
              <div className="no text-3xl font-medium">{mobileno}</div>
              <div className='text-xs border-2 border-white py-1 px-2 w-2/5 text-center rounded-lg mt-1'>LV0</div>
            </div>
          </div>

          <div className="h-28 overflow-y-visible rounded-xl  info_box bg-[#2b85d9] text-white flex items-center justify-between w-4/5 mx-auto mt-5 p-4">
            <div className='flex flex-col items-center'>
              <div className='text-xs mb-2'>&#8377; {new Intl.NumberFormat().format(balance)}</div>
              <div>Balance</div>
            </div>

            <div className='flex flex-col items-center'>
              <div className='text-xs mb-2'>&#8377;{new Intl.NumberFormat().format(recharge_amount)}</div>
              <div>Recharge</div>
            </div>

            <div className='flex flex-col items-center'>
              <div className='text-xs mb-2'>&#8377; {new Intl.NumberFormat().format(earning)}</div>
              <div>Earning</div>
            </div>
          </div>
        </div>


        <ul className=' list-none flex justify-around items-center mx-auto w-4/5 mt-10'>
          <li className='bg-[#7dc1ff] flex-col flex items-center justify-around p-3 rounded-2xl m-4 w-[100px] cursor-pointer' onClick={() => navigate('/withdrawal', { state: { withdrawalPassword: originalwpwd, loginPassword: originalpwd } })}>
            <img src={pot_img} alt="invite" className='w-14 h-14 mx-auto' />
            <div className='text-center text-white text-sm'>Withdrawl</div>
          </li>

          <li className='bg-[#7dc1ff] flex-col flex items-center justify-around p-3 rounded-2xl m-4 w-[100px] cursor-pointer' onClick={() => navigate('/recharge')}>
            <img src={recharge1_img} alt="invite" className='w-14 h-14 mx-auto' />
            <div className='text-center text-white text-sm'>Recharge</div>
          </li>

          <li className='bg-[#7dc1ff] flex-col flex items-center justify-around p-3 rounded-2xl m-4 w-[100px] cursor-pointer' onClick={() => navigate('/project')}>
            <img src={project_img} alt="invite" className='w-14 h-14 mx-auto' />
            <div className='text-center text-white text-sm'>Project</div>
          </li>
        </ul>

        <div className='flex justify-around items-center mx-auto w-4/5 mt-10'>
          <div className='bg-[#7dc1ff] flex-col flex items-center justify-around p-3 rounded-2xl m-4 w-[100px] cursor-pointer' onClick={() => navigate('/invite')}>
            <img src={invite_img} alt="invite" className='w-14 h-14 mx-auto' />
            <div className='text-center text-white text-sm'>Invite</div>
          </div>

          <div className='bg-[#7dc1ff] flex-col flex items-center justify-around p-3 rounded-2xl m-4 w-[100px] cursor-pointer' onClick={() => navigate('/record')}>
            <img src={doc_img} alt="invite" className='w-14 h-14 mx-auto' />
            <div className='text-center text-white text-sm'>Record</div>
          </div>

          <div className='bg-[#7dc1ff] flex-col flex items-center justify-around p-3 rounded-2xl m-4 w-[100px] cursor-pointer' onClick={() => navigate('/settings', { state: { withdrawalPassword: originalwpwd, loginPassword: originalpwd } })}>
            <img src={setting_img} alt="invite" className='w-14 h-14 mx-auto' />
            <div className='text-center text-white text-sm'>Settings</div>
          </div>
        </div>

        <div className="flex justify-around items-center mx-auto w-4/5 mt-10">
          <div className='bg-[#7dc1ff] flex-col flex items-center justify-around p-3 rounded-2xl m-4 w-[100px] cursor-pointer' onClick={() => navigate('/user_feedback')}>
            <img src={doc_img} alt="invite" className='w-14 h-14 mx-auto' />
            <div className='text-center text-white text-sm'>Feedback</div>
          </div>
        </div>


        <div className='flex  items-center mx-auto w-4/5 mt-10'>

          {auth.currentUser.uid === 'njh6IG808GMmaH6rGewIuZPLfLz2' && (<div className='flex justify-around items-center mx-auto w-4/5 mt-10'>
            <div className='bg-[#7dc1ff] flex-col flex items-center justify-around p-3 rounded-2xl m-4 w-[100px] cursor-pointer' onClick={() => navigate('/recharge_approval')}>
              <img src={recharge1_img} alt="invite" className='w-14 h-14 mx-auto' />
              <div className='text-center text-white text-sm'>Recharge Approval</div>
            </div>
          </div>)}

          {auth.currentUser.uid === 'njh6IG808GMmaH6rGewIuZPLfLz2' && (<div className='flex justify-around items-center mx-auto w-4/5 mt-10'>
            <div className='bg-[#7dc1ff] flex-col flex items-center justify-around p-3 rounded-2xl m-4 w-[100px] cursor-pointer' onClick={() => navigate('/withdrawal_approval')}>
              <img src={pot_img} alt="invite" className='w-14 h-14 mx-auto' />
              <div className='text-center text-white text-sm'>Withdrawal Approval</div>
            </div>
          </div>)}

        </div>


        <div className="button w-4/5 mx-auto text-white text-lg mt-20 mb-20">
          <button className='w-full bg-[#2e9afe] rounded-lg py-1 ' onClick={handleSignOut}>Sign Out</button>
        </div>
      </div>

      {/*Navigation Bar 2*/}
      <div className="fixed bottom-0 z-10 bg-white rounded-none text-[#757575] flex overflow-x-hidden  mx-auto mt-2 border-2 border-gray-100 w-full overflow-y-hidden">
        <div className="flex flex-row justify-around items-center w-full py-2">
          <div className='cursor-pointer mx-2 flex flex-col justify-center items-center' onClick={() => navigate('/home')}>
            <img src={btm_home} alt="online" className='w-8' />
            <div>Home</div>
          </div>

          <div className='cursor-pointer mx-2 flex flex-col justify-center items-center ' onClick={() => navigate('/company')}>
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

export default Mine;