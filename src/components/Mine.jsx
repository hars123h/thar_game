import React from 'react';
import recharge1_img from '../images/recharge1_img.png';
import pot_img from '../images/pot_img.png';
import { useNavigate } from 'react-router-dom';
import { signOut, getAuth } from 'firebase/auth';
import { useLayoutEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import db from '../firebase/config';
import { useState } from 'react';
import ss_logo from '../images/ss_logo.jpg';
import { RotatingLines } from 'react-loader-spinner';
import book_image from '../images/book_image.png';
import paper_image from '../images/paper_image.png';
import adminSetting from '../images/adminSetting.png';
import money_bag from '../images/money_bag.png';
import invite_image from '../images/invite_image.png';
import recharge_image from '../images/recharge_image.png';
import buildingNew from '../images/buildingNew.png';
import homeNew from '../images/homeNew.png';
import teamNew from '../images/teamNew.png';
import {toast} from 'react-toastify';
import waltonbd_company from '../images/waltonbd_company.png';


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
      const docRef = await getDoc(doc(db, 'users', localStorage.getItem('uid')));
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
      localStorage.removeItem('uid');
      navigate('/login');
    }).catch((error) => {
      console.log(error.message, error.code);
    });
  }

  const isBetween = () => {
    var startTime = '9:00:00';
    var endTime = '19:00:00';

    var currentDate = new Date()

    var startDate = new Date(currentDate.getTime());
    startDate.setHours(startTime.split(":")[0]);
    startDate.setMinutes(startTime.split(":")[1]);
    startDate.setSeconds(startTime.split(":")[2]);

    var endDate = new Date(currentDate.getTime());
    endDate.setHours(endTime.split(":")[0]);
    endDate.setMinutes(endTime.split(":")[1]);
    endDate.setSeconds(endTime.split(":")[2]);


    var valid = startDate < currentDate && endDate > currentDate;
    //console.log(valid);
    return valid;
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
        {/* [#2e9afe] */}
        <div className="top bg-blue-500 h-56">

          <div className="info pt-10 pl-10 flex items-center justify-start">
            <div className='flex justify-center items-center'><img src={waltonbd_company} alt="logo" className='w-16' /></div>
            <div className="user_no flex flex-col text-white ml-5">
              <div className="no text-3xl font-medium">{mobileno}</div>
              <div className='text-xs border-2 border-white py-1 px-2 w-2/5 text-center rounded-lg mt-1'>LV0</div>
            </div>
          </div>
          {/* [#2b85d9] */}
          <div className="h-28 overflow-y-visible rounded-xl  info_box bg-blue-400 text-white flex items-center justify-between w-4/5 mx-auto mt-5 p-4">
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


        {/*#7dc1ff */}
        <ul className=' list-none flex justify-around items-center mx-auto w-4/5 mt-10'>

          {isBetween() === false ? <li className='bg-blue-400 flex-col flex items-center justify-around p-3 rounded-2xl m-4 w-[100px] cursor-pointer' onClick={() => toast('You can writhdrawl only between 9:00 to 19:00 hours only.', {autoClose:3000})}>
            <img src={money_bag} alt="invite" className='w-14 h-14 mx-auto' />
            <div className='text-center text-white text-sm'>Withdrawl</div>
          </li> : <li className='bg-blue-400 flex-col flex items-center justify-around p-3 rounded-2xl m-4 w-[100px] cursor-pointer' onClick={() => navigate('/withdrawal', { state: { withdrawalPassword: originalwpwd, loginPassword: originalpwd } })}>
            <img src={money_bag} alt="invite" className='w-14 h-14 mx-auto' />
            <div className='text-center text-white text-sm'>Withdrawl</div>
          </li>}

          <li className='bg-blue-400 flex-col flex items-center justify-around p-3 rounded-2xl m-4 w-[100px] cursor-pointer' onClick={() => navigate('/recharge')}>
            <img src={recharge_image} alt="invite" className='w-14 h-14 mx-auto' />
            <div className='text-center text-white text-sm'>Recharge</div>
          </li>

          <li className='bg-blue-400 flex-col flex items-center justify-around p-3 rounded-2xl m-4 w-[100px] cursor-pointer' onClick={() => navigate('/project')}>
            <img src={book_image} alt="invite" className='w-14 h-14 mx-auto' />
            <div className='text-center text-white text-sm'>Project</div>
          </li>
        </ul>

        <div className='flex justify-around items-center mx-auto w-4/5 mt-10'>
          <div className='bg-blue-400 flex-col flex items-center justify-around p-3 rounded-2xl m-4 w-[100px] cursor-pointer' onClick={() => navigate('/invite')}>
            <img src={invite_image} alt="invite" className='w-14 h-14 mx-auto' />
            <div className='text-center text-white text-sm'>Invite</div>
          </div>

          <div className='bg-blue-400 flex-col flex items-center justify-around p-3 rounded-2xl m-4 w-[100px] cursor-pointer' onClick={() => navigate('/record')}>
            <img src={paper_image} alt="invite" className='w-14 h-14 mx-auto' />
            <div className='text-center text-white text-sm'>Record</div>
          </div>

          <div className='bg-blue-400 flex-col flex items-center justify-around p-3 rounded-2xl m-4 w-[100px] cursor-pointer' onClick={() => navigate('/settings', { state: { withdrawalPassword: originalwpwd, loginPassword: originalpwd } })}>
            <img src={adminSetting} alt="invite" className='w-14 h-14 mx-auto' />
            <div className='text-center text-white text-sm'>Settings</div>
          </div>
        </div>

        <div className="flex justify-around items-center mx-auto w-4/5 mt-10">
          <div className='bg-blue-400 flex-col flex items-center justify-around p-3 rounded-2xl m-4 w-[100px] cursor-pointer' onClick={() => navigate('/user_feedback')}>
            <img src={paper_image} alt="invite" className='w-14 h-14 mx-auto' />
            <div className='text-center text-white text-sm'>Feedback</div>
          </div>
        </div>


        <div className='flex  items-center mx-auto w-4/5 mt-10'>

          {localStorage.getItem('uid') === 'njh6IG808GMmaH6rGewIuZPLfLz2' && (<div className='flex justify-around items-center mx-auto w-4/5 mt-10'>
            <div className='bg-[#7dc1ff] flex-col flex items-center justify-around p-3 rounded-2xl m-4 w-[100px] cursor-pointer' onClick={() => navigate('/recharge_approval')}>
              <img src={recharge1_img} alt="invite" className='w-14 h-14 mx-auto' />
              <div className='text-center text-white text-sm'>Recharge Approval</div>
            </div>
          </div>)}

          {localStorage.getItem('uid') === 'njh6IG808GMmaH6rGewIuZPLfLz2' && (<div className='flex justify-around items-center mx-auto w-4/5 mt-10'>
            <div className='bg-[#7dc1ff] flex-col flex items-center justify-around p-3 rounded-2xl m-4 w-[100px] cursor-pointer' onClick={() => navigate('/withdrawal_approval')}>
              <img src={pot_img} alt="invite" className='w-14 h-14 mx-auto' />
              <div className='text-center text-white text-sm'>Withdrawal Approval</div>
            </div>
          </div>)}

        </div>


        <div className="button w-4/5 mx-auto text-white text-lg mt-20 mb-20">
          <button className='w-full bg-blue-500 rounded-lg py-1 ' onClick={handleSignOut}>Sign Out</button>
        </div>
      </div>

      {/*Navigation Bar 2*/}
      <div className="fixed bottom-0 z-10 bg-blue-500 rounded-none text-white flex overflow-x-hidden  mx-auto mt-2 border-2 border-gray-100 w-full overflow-y-hidden">
        <div className="flex flex-row justify-around items-center w-full py-2">
          <div className='cursor-pointer mx-2 flex flex-col justify-center items-center' onClick={() => navigate('/home')}>
            <img src={homeNew} alt="online" className='w-8' />
            <div>Home</div>
          </div>

          <div className='cursor-pointer mx-2 flex flex-col justify-center items-center ' onClick={() => navigate('/company')}>
            <img src={buildingNew} alt="app_dwd" className='w-8' />
            <div>Company</div>
          </div>

          <div className='cursor-pointer mx-2 flex flex-col justify-center items-center' onClick={() => navigate('/team')}>
            <img src={teamNew} alt="recharge" className='w-8' />
            <div>Team</div>
          </div>

          <div className='cursor-pointer mx-2 flex flex-col justify-center items-center' onClick={() => navigate('/mine')}>
            <img src={paper_image} alt="invite" className='w-8' />
            <div>Mine</div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Mine;