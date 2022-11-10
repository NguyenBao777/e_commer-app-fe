import {useEffect, useState} from "react";
import { motion } from "framer-motion";
import { BiMinus, BiPlus } from "react-icons/bi";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
const CartItem = ({cartItem}) => {
    const [qty, setQty] = useState(1);
    const [items, setItems] = useState([]);
    const [{cartItems}, dispatch] = useStateValue();
    const updaQty = (action, id)=>{
        if(action === "add"){
            setQty(qty + 1);
            cartItems.map(item => {
                if(item.id === id) item.qty += 1;
            });
            cartDispatch();
        }else{
            if(qty == 1){
                setItems(cartItems.filter(item => item.id !== id));
                cartDispatch();
            }else{
                setQty(qty - 1);
                cartItems.map(item => {
                    if(item.id === id) item.qty -= 1;
                });
                cartDispatch();
            }
        } 

    }

    const cartDispatch = ()=>{
        localStorage.setItem("cartItems", JSON.stringify(items));
        dispatch({
            type: actionType.SET_CART_ITEMS,
            cartItems: items,
        });
    }

    useEffect(()=>{
        setItems(cartItems);
    }, [qty]);

    return (
        <div className="w-full p-1 px-2 rounded-lg bg-cartItem flex items-center gap-2">
            <img src={cartItem?.imageURL} alt="" className="w-20 h-20 max-w-[60px]" />

            <div className="flex flex-col gap-2">
                <p className="text-base text-gray-50">{cartItem?.title}</p>
                <p className="text-sm block text-gray-300 font-semibold">
                    $ {parseFloat(cartItem?.price) * qty}
                </p>
            </div>

            {/* Button section */}
            <div className="group flex items-center gap-2 ml-auto cursor-pointer">
                <motion.button whileTap={{ scale: 0.75 }} className="" onClick={()=>updaQty("remove", cartItem?.id)}>
                    <BiMinus className="text-gray-50" />
                </motion.button>
                <p className="w-5 h-5 rounded-sm bg-cartBg text-gray-50 flex justify-center items-center">
                    {qty}
                </p>
                <motion.button whileTap={{ scale: 0.75 }} className="" onClick={()=>updaQty("add", cartItem?.id)}>
                    <BiPlus className="text-gray-50" />
                </motion.button>
            </div>
        </div>
    );
}

export default CartItem
