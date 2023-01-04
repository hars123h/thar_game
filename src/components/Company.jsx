import React from 'react';
// import hp_cpy_image from '../images/hp_cpy_image.jpg';
import { useNavigate } from 'react-router-dom';
import siteTheme from '../images/siteTheme.png';

const Company = () => {
    const navigate = useNavigate();
    return (
        <div className='bg-[#2e9afe] h-full p-4'>
            <div className="options text-center text-white text-lg pt-2 font-medium">
                <svg xmlns="http://www.w3.org/2000/svg" onClick={() => navigate('/home')} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 absolute left-2  storke-white top-5 cursor-pointer">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                </svg>
                Company Profile
            </div>

            <div className="hp_company mt-10">
                <img src={siteTheme} alt="hp" className='sm:w-3/6 md:w-2/6 mx-auto' />
            </div>

            <div className=" cpy_info sm:w-4/5 lg:w-3/4 mx-auto mt-5">
                <div className='shadow-lg text-center bg-white h-10 flex justify-center items-center text-lg font-medium rounded-lg shadow-gray-200 text-[#2e9afe]'>Company Profile</div>
            </div>

            <div className="part sm:w-4/5 lg:w-3/4 mx-auto text-white mt-4">
                <div className="heading font-bold mb-1">Sareen Sports</div>
                <hr />
                <div className="data text-sm mt-2">Sareen Sports is the place where Tradition meets Technology, Leadership through Quality is our motto and that's why we are called "SS means Cricket".
                </div>
            </div>

            <div className="part sm:w-4/5 lg:w-3/4 mx-auto text-white mt-4">
                <div className="heading font-bold mb-1">Our History</div>
                <hr />
                <div className="data text-sm mt-2">
                    Sareen Sports Industries was started in the year 1969 by Mr. N.K. Sareen under the inspiration of his father Mr. M.L. Sareen, Sareen Sports Industries entered in the Indian market with a great hard work and dedication to launch their registered Trade-Mark SS SUNRIDGES in the year 1976. The company started export of cricket bats in 1979 to UK and Australia. Sareen Sports Industries manufacturers quality cricket equipments for meeting the requirements of national and international markets. The company also added on the production of Cricket Balls and Soft Leather Protective Equipments under the flagship of “SS SUNRIDGES” in the year 1985.
                </div>
            </div>

            <div className="part sm:w-4/5 lg:w-3/4 mx-auto text-white mt-4">
                <div className="heading font-bold mb-1">Our Purpose</div>
                <hr />
                <div className="data text-sm mt-2">As our SS Brand Cricket Equipments are known as a name of Quality goods are used by the international cricket players like Saurav Ganguly, Virender Sehwag, Sachin Tendulkar, V.V.S Laxman, Roger Binny, Manoj Prabhakar, and many other test cricketers like S. Ramesh, Yuvraj Singh, Akash Chopra, and Deep Das Gupta. The highest test runs scored by V.V.S. Laxman 281 and now 309 by Virender Sehwag at Multan in Pakistan are by our Cricket Bat SS TON. Our purpose is to serve the best, ALWAYS!
                </div>
            </div>

            <div className="part  sm:w-4/5 lg:w-3/4 mx-auto text-white mt-4">
                <div className="heading font-bold mb-1">Our Vision</div>
                <hr />
                <div className="data text-sm mt-2">The company has a good share of export business in the world market exporting to Australia, UK, USA, South Africa, Canada, Sri Lanka and Bangladesh. Our company is engaged in making the product for international companies. Our product brands are TON L.E, TON ELITE, TON VA-999, TON HERITAGE, TON CAMBRIDGE. Our Sunridges SS cricket equipment is used by international players like Arvinda DeSilva, Lance Klusner, Alister Cambell, Ravindu Shah, Trevour, Hitesh Modi, Chaminda Vaas, Hassan Tilakratne and many others. Our vision is to grow with a rapid speed.</div>
                <br />
                <br />
            </div>

        </div>
    )
}

export default Company