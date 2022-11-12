import React from 'react';
import ord_img from '../images/ord_img.png';
import thar_app from '../images/thar_app.jpg';
import custom_img from '../images/custom_img.jpg';


const Card = () => {
  return (
    <div className='mx-1 mb-1'>
        <img src={thar_app} alt="comp_img" />
        <div className="info  bg-[#0096D5] p-2">
            <div className="title text-white font-bold">Office computer No.1</div>
            <div className="text-xs text-red-700 font-bold mb-4">daily withdraws</div>
            <div className="basic_info text-white">Project Amount: &#8377;500</div>
            <div className="basic_info  text-white">Daily Earnings: &#8377;50</div>
            <div className="basic_info  text-white">Project Cycle: &#8377;365 day</div>
            <div className="basic_info  text-white">Total Earning: &#8377;18250</div>
            <div  className="cursor-pointer btn text-white text-center p-2 mt-1 text-lg rounded-md  w-4/5 mx-auto bg-[#00bcd4]">Click to buy</div>
        </div>
    </div>
  )
}

export default Card