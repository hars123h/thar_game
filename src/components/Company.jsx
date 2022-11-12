import React from 'react';
import hp_cpy_image from '../images/hp_cpy_image.jpg';
import {useNavigate} from 'react-router-dom';

const Company = () => {
    const navigate = useNavigate();
    return (
        <div className='bg-[#2e9afe] h-full p-4'>
            <div className="options text-center text-white text-lg pt-2 font-medium">
                <svg xmlns="http://www.w3.org/2000/svg" onClick={()=>navigate('/home')} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 absolute left-2  storke-white top-5 cursor-pointer">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                </svg>
                Company Profile
            </div>

            <div className="hp_company mt-10">
                <img src={hp_cpy_image} alt="hp" className='sm:w-3/6 md:w-2/6 mx-auto' />
            </div>

            <div className=" cpy_info sm:w-4/5 lg:w-3/4 mx-auto mt-5">
                <div className='shadow-lg text-center bg-white h-10 flex justify-center items-center text-lg font-medium rounded-lg shadow-gray-200 text-[#2e9afe]'>Company Profile</div>
            </div>

            <div className="part sm:w-4/5 lg:w-3/4 mx-auto text-white mt-4">
                <div className="heading font-bold mb-1">HP Group</div>
                <hr />
                <div className="data text-sm mt-2">Hewlett-Packard (HP) is one of the information technology (IT) companies, founded in 1939.
                    HP is headquartered in Palo Alto, California, USA. HP has three business groups: Information Products Group, Printing and Imaging Systems Group and Enterprise Computer Professional Services Group.
                    In July 2020, Forbes 2020 Top 100 Global Brand Values was released, and HP ranked 71st.</div>
            </div>

            <div className="part sm:w-4/5 lg:w-3/4 mx-auto text-white mt-4">
                <div className="heading font-bold mb-1">Development Path</div>
                <hr />
                <div className="data text-sm mt-2">934-1939
                    HP was founded in 1939 by Bill Hewlett and David Packard. The company was built in a car garage in Palo Alto and its first product was an audio oscillator, an electronic test instrument used by sound engineers. HP's first customer was Walt Disney Studios, which developed and tested an innovative sound system for the animated film Fantasia.
                    In 1934, fresh graduates of Stanford's electrical engineering department, Dave Packard and Bill Hewlett went on a two-week fishing field camp in the Colorado Mountains. They became close friends because they agreed on many things. Since then, Bill has continued his graduate studies at Stanford University and MIT, while David has landed a job at General Electric. With the encouragement and support of Stanford University professor and mentor Fred Terman, the two decided to start a company and run it themselves.
                    Birthplace of HP - Garage
                    Birthplace of HP - Garage
                    In 1938, the Davids moved to 376 Addison Avenue in Palo Alto, California. Bill Hewlett rented a cottage right behind the house. Bill and David use $538 as working capital and work in the garage in their spare time. Bill used his research topic negative feedback to successfully develop Hewlett-Packard's first product: the RC Audio Oscillator (HP200A), an electronic instrument for testing audio equipment. This oscillator uses an incandescent lamp as an electrical component in the electrical wiring diagram to provide variable impedance, which is a breakthrough in oscillator design. Using the principle of feedback, several other early HP products were produced successively, such as harmonic analyzers and various distortion analyzers. Walt Disney Pictures ordered 8 oscillators (HP 200B) for the production of the animated film Fantasia.</div>
            </div>

            <div className="part sm:w-4/5 lg:w-3/4 mx-auto text-white mt-4">
                <div className="heading font-bold mb-1">HP Products</div>
                <hr />
                <div className="data text-sm mt-2">Notebook
                    HP notebook computer
                    Hewlett-Packard (HP) is a global technology solutions provider for individual users, large, medium and small businesses and research institutions. Hewlett-Packard (HP) products cover IT infrastructure, personal computing and access equipment, global services, printing and imaging for individual consumers, large, medium and small enterprises. In the 2008 fiscal year ended October 31, 2008, Hewlett-Packard (HP) had a turnover of $118.4 billion. HP ranked 14th in the 2007 US Fortune 500.

                    HP notebooks are divided into two major product lines: home and business, and in these two product lines, they have their own mid-to-high-end and mid-to-low-end models. The mid-to-high-end models of the household product line are the HP Pavilion series, and the mid-to-low end is the HP Compaq Presario series. It is worth mentioning that the HDX, which originally belonged to the Pavilion series, was independent and became the third largest series in the household product line, targeting the high-end market.
                    On May 25, 2022, HP launched the Star 14 Pro laptop last week, equipped with i5-12500H core display + 2.2K screen.

                    desktop class
                    Hewlett-Packard (HP) is a global technology solutions provider for individual users, large, medium and small businesses and research institutions. Hewlett-Packard (HP) products cover IT infrastructure, personal computing and access equipment, global services, printing and imaging for individual consumers, large, medium and small enterprises. In the 2008 fiscal year ended October 31, 2008, Hewlett-Packard (HP) had a turnover of $118.4 billion. HP ranked 14th in the 2007 US Fortune 500.
                    HP computers are divided into two major product lines, home and business, and in these two product lines, they have their own mid-to-high-end and mid-to-low-end models. The mid-to-high-end models of the household product line are the HP Pavilion series, and the mid-to-low-end models are the HP business machine series. It is worth mentioning that the HDX, which originally belonged to the Pavilion series, was independent and became the third largest series in the household product line, targeting the high-end market.</div>
            </div>

            <div className="part  sm:w-4/5 lg:w-3/4 mx-auto text-white mt-4">
                <div className="heading font-bold mb-1">Leader</div>
                <hr />
                <div className="data text-sm mt-2">founder
                    Bill Hewlett (1913-2001)
                    Founders Bill Hewlett (right) and David Packard
                    Founders Bill Hewlett (right) and David Packard
                    Bill Hewlett created HP with David Packard. Mr. Hewlett resigned as president in 1977 and retired as chief executive in 1978. He then served as chairman of HP's management committee until 1983 when he assumed the position of vice chairman of the board. In 1987, he was elected honorary director and served until his death on January 12, 2001.
                    Mr. Hewlett was born on March 20, 1913 in Ann Arbor, Michigan. He received a Bachelor of Arts degree from Stanford University in California in 1934 and a Master of Electrical Engineering degree from the Massachusetts Institute of Technology in 1936. In addition, he received an engineer degree from Stanford University in 1939.
                    Mr. Hewlett and Packard became friends while they were classmates at Stanford University and co-founded HP in 1939.
                    David Packard (1912-1996)
                    David Packard founded HP with Bill Hewlett. He retired from the chairmanship of the board in 1993 and served as chairman emeritus until his death on March 26, 1996.
                    Mr. Packard was born on September 7, 1912, in Pueblo, Colorado. He received a bachelor of arts degree from Stanford University in California in 1934 and a master's degree in electrical engineering from the Massachusetts Institute of Technology in 1939.
                    From 1936 to 1938, Mr. Packard worked as an engineer for the General Electric Company in Schenectady, N.Y. In 1938, he returned to Palo Alto and the following year co-founded HP with his Stanford classmate and friend Bill Hewlett.
                    CEO
                    Hewlett-Packard (HP) CEO: Enrique Lores
                    Enrique Lores has served as HP President and Chief Executive Officer effective November 1, 2019.</div>
                <br />
                <br />
            </div>
            
        </div>
    )
}

export default Company