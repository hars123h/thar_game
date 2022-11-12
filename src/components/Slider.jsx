import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import home_img1 from '../images/home_img1.png';
import home_img2 from '../images/home_img2.png';


const Slider = () => {
  return (
    <div className='sm:w-3/5 lg:w-3/5 mx-auto '>
      <Carousel showThumbs={false} autoPlay showArrows={true} infiniteLoop>
        <div>
          <img src={home_img1} className="h-[250px]" alt="img_1" />
        </div>
        
        <div>
          <img src={home_img2} className="h-[250px]" alt="img_2" />
        </div>
      </Carousel>
    </div>
  )
}

export default Slider;
