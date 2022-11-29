import { getAuth } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useNavigate, } from 'react-router-dom';
import db from '../firebase/config';
import { RotatingLines } from 'react-loader-spinner';





const Project = () => {
    const navigate = useNavigate();
    const auth = getAuth();
    const [userDetails, setUserDetails] = useState(null);
    const [loading, setLoading] = useState(true);

    const getUserDetails = async () => {
        const docRef = doc(db, 'users', auth.currentUser.uid);
        await getDoc(docRef).then(doc => {
            if (doc.exists()) {
                //console.log(doc.data());
                setUserDetails(doc.data());
            } else {
                console.log('Data not found');
            }
            setLoading(false);
        }).catch(error => console.log('Some error occured', error));
    }

    useEffect(() => {
        setLoading(true);
        getUserDetails();
    }, []);

    if (loading) {
        return (
            <div className="grid place-items-center h-screen ">
                <div className='flex flex-col justify-center items-center'>
                    <RotatingLines
                        strokeColor="grey"
                        strokeWidth="2"
                        animationDuration="0.75"
                        width="96"
                        visible={true}
                    />
                    <div className='text-lg text-gray-500'>Loading...</div>
                </div>
            </div>
        )
    }

    return (
        <div className='h-screen bg-[#2e9afe]'>

            <div className="options text-center bg-[#2e9afe] text-white text-md pt-5 font-normal pb-4">
                <svg xmlns="http://www.w3.org/2000/svg" onClick={() => navigate(-1)} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 absolute left-2  storke-white top-5 cursor-pointer">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                </svg>
                Project Record
            </div>


            <div className='records w-full flex bg-[#d3d6fe] items-center'>
                <div className='h-[40px] flex items-center justify-center w-1/2 text-center border-b-4 font-semibold border-[#0172fe] text-[#0172fe]'>Earning</div>
                <div className='h-[40px] flex items-center justify-center w-1/2 text-center text-white'>Completed</div>
            </div>

            {
                userDetails && userDetails?.plans_purchased && (
                    userDetails.plans_purchased.map((element, index) => {
                        return (
                            <div key={index}>
                                {console.log(element, index)}
                            </div>
                        )
                    })
                )
            }
        </div>
    )
}

export default Project