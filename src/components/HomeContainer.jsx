import { motion } from 'framer-motion';

import Delivery from '../imgs/img/delivery.png';
import HeroBg from "../imgs/img/heroBg.png";
import { heroData } from '../utils/data';



const HomeContainer = () => {
  return (

      <section id="home" className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full">
        <div className="py-2 flex flex-col items-start justify-center flex-1 gap-6">
          <div className="flex items-center justify-center gap-2 bg-orange-100 px-4 py-1 rounded-full">
            <p className="text-base text-orange-500 font-semibold">Bike Delivery</p>
            <div className="w-6 h-6 bg-white rounded-full overflow-hidden drop-shadow-xl">
              <img src={Delivery} alt="delivery" className="w-full h-full object-contain" />
            </div>
          </div>
          <p className="text-[2.5rem] lg:text-[4.5rem] font-bold tracking-wide text-headingColor">The Fastest Delivery in <span className="text-orange-600 text-[3rem] lg:text-[5rem]">Your City</span></p>
          <p className="text-base text-center md:text-left md:w-[80%] text-textColor">Lorem, ipsum dolor sit amet consectetur adipisicing elit. A distinctio id excepturi tempora placeat itaque asperiores? Numquam vero asperiores dolor. Deserunt et eum possimus ea quidem sapiente enim sequi dolore!</p>
          
          <button type='button' className="bg-gradient-to-br from-orange-400 to-orange-500 w-full md:w-auto px-4 py-2 rounded-lg hover:shadow-lg transition-all ease-in-out duration-100">Order Now</button>
        </div>
        <div className="py-2 flex-1 flex items-center relative">
            <img src={HeroBg} className="lg:h-650 lg:w-auto h-420 w-full ml-auto" alt="heroBg" />
            
            <div className="w-full h-full gap-4 flex flex-wrap items-center justify-center absolute top-0 left-0 py-4">
                {heroData && heroData.map((e)=>(
                  <motion.div whileTap={{scale: 0.8}} key={e.id} className="md: lg:w-190 min-w-[190px] p-4 bg-cardOverlay drop-shadow-lg backdrop-blur-md rounded-md flex flex-col items-center justify-center cursor-pointer">
                  <img src={e.imgSrc} alt="i1" className="w-20 lg:w-40 lg:-mt-20" />
                  <p className="text-base lg:text-xl font-semibold text-textColor mt-2 lg:mt-4">{e.name}</p>
                  <p className="text-[12px] lg:text-sm font-semibold text-lightTextGray mb-3">{e.description}</p>
                  <p className="text-sm font-semibold text-headingColor">
                      <span className="text-xs text-red-600">$</span>{ e.price}
                  </p>
              </motion.div>
                ))}
            </div>
        </div>
      </section>

  )
}

export default HomeContainer
