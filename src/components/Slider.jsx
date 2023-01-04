import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import newBanner_1 from '../images/newBanner_1.jpg';
import newBanner_2 from '../images/newBanner_2.jpg';
import newBanner_3 from '../images/newBanner_3.jpg';


const Slider = () => {
  return (
    <div className='sm:w-3/5 lg:w-3/5 mx-auto '>
      <Carousel showThumbs={false} autoPlay showArrows={true} infiniteLoop>
        <div>
          <img src={newBanner_3} className="h-[350px]" alt="img_2" />
        </div>
        <div>
          <img src={newBanner_2} className="h-[350px]" alt="img_2" />
        </div>

        <div>
          <img src={newBanner_1} className="h-[350px]" alt="img_1" />
        </div>

      </Carousel>
    </div>
  )
}

export default Slider;
