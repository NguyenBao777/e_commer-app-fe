import { useEffect, useState } from 'react';
import { HomeContainer, RowContainer, MenuContainer, CartContainer } from '../components';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { motion } from 'framer-motion';
import { useStateValue } from '../context/StateProvider';

const Main = () => {
  const [{ foodItems, cartShow }, dispatch] = useStateValue();
  const [scrollValue, setScrollValue] = useState(0);

  useEffect(()=>{}, [scrollValue, cartShow]);

  return (
    <main className='mt-20 md:mt-24 px-4 md:px-16 md:py-4 pt-6 pb-4  w-full h-full bg-white'>
      <div className="w-full h-auto flex flex-col items-center justify-center">
        <HomeContainer />
        <section className="w-full my-6">
          <div className="w-full flex justify-between items-center">
            <p className="text-2xl font-semibold capitalize text-headingColor relative before:absolute before:rounded-lg before:content before:w-32 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-600 transition-all ease-in-out duration-100">
              Our fresh & Health fruits
            </p>
            <div className="hidden md:flex items-center gap-3">
              <motion.div whileTap={{ scale: 0.75 }} className="w-8 h-8 rounded-lg bg-orange-300 hover:bg-orange-500 transition-all motion-reduce:transition-none duration-100 ease-in-out hover:shadow-lg cursor-pointer flex items-center justify-center"
                onClick={() => { setScrollValue( - window.screen.availWidth) }}
              >
                <MdChevronLeft className="text-lg text-white" />
              </motion.div>
              <motion.div whileTap={{ scale: 0.75 }} className="w-8 h-8 rounded-lg bg-orange-300 hover:bg-orange-500 transition-all motion-reduce:transition-none duration-100 ease-in-out hover:shadow-lg cursor-pointer flex items-center justify-center"
                onClick={() => { setScrollValue( + window.screen.availWidth) }}
              >
                <MdChevronRight className="text-lg text-white" />
              </motion.div>
            </div>
          </div>
          <RowContainer scrollValue={scrollValue} flag={true} data={foodItems?.filter(n => n.category === 'chicken')} />
        </section>

        <MenuContainer />
        {cartShow && ( <CartContainer/>)}
       
      </div>
    </main>
  )
}

export default Main