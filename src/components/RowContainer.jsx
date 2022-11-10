import { MdShoppingBasket } from "react-icons/md";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import NotFound from "../imgs/img/NotFound.svg";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
import { useState } from "react";

const RowContainer = ({flag, data, scrollValue}) => {
  const rowContainerRef = useRef();
  const [{cartItems}, dispatch] = useStateValue();
  const [items, setItems] = useState([]);

  const addToCart = ()=>{
    dispatch({
          type: actionType.SET_CART_ITEMS,
          cartItems: items,
        });
        localStorage.setItem('cartItems', JSON.stringify(items));
    
  }

  useEffect(()=>{
    rowContainerRef.current.scrollLeft += scrollValue;
  }, [scrollValue]);

  useEffect(()=>{
    addToCart();
  }, [items]);

  return (
    <div ref={rowContainerRef} className={`w-full flex items-center gap-3 my-12 scroll-smooth ${flag ? "overflow-x-scroll scrollbar-none" : "overflow-x-hidden flex-wrap justify-center"}`}>
      {data && data.length > 0 ? data.map(item => (<div key={item?.id} className="w-300 min-w-[300px] md:min-w-[340px] md:w-340 h-[225px] my-12 backdrop-blur-lg bg-gray-100 rounded-md p-2 hover:drop-shadow-lg flex flex-col items-center justify-between">
        <div className="w-full flex items-center justify-between">
            <div  className="w-40 h-40 overflow-hidden -mt-8 duration-75 ease-in-out drop-shadow-2xl">
            <motion.img whileHover={{scale: 1.2}} src={item?.imageURL} alt="" className="w-full h-full object-contain"/>
            </div>
            <motion.button whileTap={{scale: 0.75}} className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center cursor-pointer hover:shadow-md duration-100 ease-in-out"
            onClick={()=>setItems([...cartItems, item])}>
                <MdShoppingBasket className="text-white" />
            </motion.button>
        </div>

        <div className="w-full flex flex-col gap-2 mt-4 items-end justify-end">
            <p className="text-textColor font-semibold text-base md:text-lg">
                {item?.title}
            </p>
            <p className="mt-1 text-sm text-gray-500">{item?.calories} calories</p>
            <div className="flex items-center gap-8">
                <p className="text-lg text-headingColor font-semibold">
                    <span className="text-sm text-red-500">$</span> {item?.price}
                </p>

            </div>
        </div>
      </div>)) : (<div className="w-full flex flex-col items-center justify-center">
        <img src={NotFound} alt="" className="h-340"/>
        <p className="text-xl text-headingColor font-semibold my-2">Items Not Available</p>
      </div>)}
    </div>
  )
}

export default RowContainer
