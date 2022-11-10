import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { RiRefreshFill } from "react-icons/ri";
import { motion } from "framer-motion";
import { CartItem } from "../components"
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
import EmptyCart from "../imgs/img/emptyCart.svg";

const CartContainer = () => {
    const [{ cartShow, cartItems, user }, dispatch] = useStateValue();
    const showCart = () => {
        dispatch({
            type: actionType.SET_CART_SHOW,
            cartShow: !cartShow
        });
    }

    return (
        <motion.div initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 200 }}
            className="w-full h-screen bg-white fixed top-0 right-0 z-[101] md:w-375 drop-shadow-md flex flex-col">

            <div className="w-full flex justify-between items-center cursor-pointer p-4">
                <motion.div whileTap={{ scale: 0.75 }} onClick={showCart}>
                    <MdOutlineKeyboardBackspace className="text-textColor text-3xl" />
                </motion.div>

                <p className="text-textColor text-lg font-semibold">Cart</p>

                <motion.p whileTap={{ scale: 0.75 }} className="flex items-center gap-2 p-1 px-2 my-2 bg-gray-100 rounded-md hover:shadow-md duration-100 ease-in-out transtion-all cursor-pointer text-textColor text-base">Clear <RiRefreshFill /></motion.p>
            </div>
            {/* Cart Items */}
            {cartItems && cartItems.length > 0 ? (
                <>
                    {/* cart item */}
                    <div className="w-full h-full bg-cartBg rounded-t-md flex flex-col">
                        <div className="w-full h-340 md:h-42 px-6 py-10 flex flex-col gap-3 overflow-y-scroll scrollbar-none">
                            {cartItems.map((cartItem, index) => (<CartItem key={index} cartItem={cartItem} />))}
                        </div>
                    </div>

                    {/* Cart total section */}
                    <div className="w-full flex-1 bg-cartBg rounded-b-md flex flex-col items-center justify-evenly px-8 py-2">
                        <div className="w-full flex items-center justify-between">
                            <p className="text-gray-400 text-lg">Sub Total</p>
                            <p className="text-gray-400 text-lg">$ 2.5</p>
                        </div>
                        <div className="w-full flex items-center justify-between">
                            <p className="text-gray-400 text-lg">Delivery</p>
                            <p className="text-gray-400 text-lg">$ 2.5</p>
                        </div>

                        <div className="w-full border-b border-gray-600 my-2"></div>

                        <div className="w-full flex items-center justify-between">
                            <div className="text-gray-200 text-xl font-semibold">Total</div>
                            <div className="text-gray-200 text-xl font-semibold">$ 100</div>
                        </div>

                        {user ? (
                        <motion.button whileTap={{ scale: 0.8 }} className="w-full p-2 rounded-full bg-gradient-to-tr from-orange-400 to-orange-600 text-gray-50 text-lg my-2 hover:shadow-lg transiton-all duration-150 ease-out" type="button">
                            Check Out
                        </motion.button>
                        ) : (
                        <motion.button whileTap={{ scale: 0.8 }} className="w-full p-2 rounded-full bg-gradient-to-tr from-orange-400 to-orange-600 text-gray-50 text-lg my-2 hover:shadow-lg transiton-all duration-150 ease-out" type="button">
                            Login to Check out
                        </motion.button>
                        )}
                    </div>
                </>

            ) : (
                <div className="w-full h0full flex flex-col items-center justify-center gap-6">
                    <img src={EmptyCart} alt="" className="w-300" />
                    <p className="text-xl text-textColor font-semibold">
                        Add some items to your cart
                    </p>
                </div>
            )}
        </motion.div>
    )
}

export default CartContainer
