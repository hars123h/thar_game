import React from 'react';
import thar_app from '../images/thar_app.jpg';


const Card = ({plan_name, plan_type, plan_amount, plan_daily_earning, plan_cycle, handleClick}) => {
  return (
    <div className='mx-1 mb-1'>
        <img src={thar_app} alt="comp_img" />
        <div className="info  bg-[#0096D5] p-2">
            <div className="title text-white font-bold">{plan_name}</div>
            <div className="text-xs text-red-700 font-bold mb-4">Daily Withdrawals</div>
            <div className="basic_info text-white">Project Amount: &#8377;{new Intl.NumberFormat().format(plan_amount)}</div>
            <div className="basic_info  text-white">Daily Earnings: &#8377;{new Intl.NumberFormat().format(plan_daily_earning)}</div>
            <div className="basic_info  text-white">Project Cycle: {plan_cycle} days</div>
            <div className="basic_info  text-white">Total Earning: &#8377;{new Intl.NumberFormat().format(plan_cycle*plan_daily_earning)}</div>
            <div  className="cursor-pointer btn text-white text-center p-2 mt-1 text-lg rounded-md  w-4/5 mx-auto bg-[#00bcd4]" onClick={()=>handleClick(plan_name, plan_type, plan_amount, plan_daily_earning, plan_cycle)}>Click to buy</div>
        </div>
    </div>
  )
}

export default Card