import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MdShoppingBasket, MdAdd, MdLogout } from 'react-icons/md';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from '../firebase.config';
import Logo from '../imgs/logo-phoenix.png';
import noneUserAvatar from '../imgs/none-user-avatar.png';
import { useStateValue } from '../context/StateProvider';
import { actionType } from '../context/reducer';

const Header = () => {
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const [{ user, cartShow, cartItems }, dispatch] = useStateValue();
  const [isUserMenu, setIsUserMenu] = useState(false);

  const login = async () => {
    if (!user) {
      const { user: { refreshToken, providerData } } = await signInWithPopup(firebaseAuth, provider);
      dispatch({
        type: actionType.SET_USER,
        user: providerData[0],
      });

      localStorage.setItem("user", JSON.stringify(providerData[0]));
    } else {
      setIsUserMenu(!isUserMenu);
    }
  }

  const showCart = () => {
    dispatch({
      type: actionType.SET_CART_SHOW,
      cartShow: !cartShow,
    });
  }

  const logout = () => {
    setIsUserMenu(false);
    localStorage.removeItem("user");
    dispatch({ type: actionType.SET_USER, user: null });
  }

  return (
    <header className='fixed z-50 w-screen p-3 px-4 md:p-3 md:px-16 bg-primary'>
      {/* desktop && tablet */}
      <nav className="hidden md:flex w-full h-full items-center justify-between">
        <Link to={"/"} className="flex items-center gap-2">
          <img src={Logo} alt="Logo" className="w-20 object-cover" />
          <p className="text-headingColor text-xl font-bold">City</p>
        </Link>

        <div className="flex items-center gap-8">
          <motion.ul initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 200 }}
            className="flex items-center gap-8">
            <li className="text-base cursor-pointer text-textColor hover:text-headingColor duration-100 transition-all ease-in-out">Home</li>
            <li className="text-base cursor-pointer text-textColor hover:text-headingColor duration-100 transition-all ease-in-out">Menu</li>
            <li className="text-base cursor-pointer text-textColor hover:text-headingColor duration-100 transition-all ease-in-out">About Us</li>
            <li className="text-base cursor-pointer text-textColor hover:text-headingColor duration-100 transition-all ease-in-out">Service</li>
          </motion.ul>

          <div className="relative flex items-center justify-center" onClick={showCart}>
            <div className="w-5 h-5 rounded-full bg-cartNumBg flex justify-center items-center absolute -top-2 -right-2">
              {cartItems ? (
                <p className="text-xs text-white font-semibold">{cartItems.length}</p>
              ) : (
                <p className="text-xs text-white font-semibold">0</p>
              )}
            </div>
            <MdShoppingBasket className='text-textColor text-2xl cursor-pointer' />
          </div>
          <div className="relative">
            <motion.img whileTap={{ scale: 0.6 }} referrerPolicy="no-referrer" src={user ? user.photoURL : noneUserAvatar} alt="none user" className="cursor-pointer rounded-full w-10 min-w-[40px] h-10 min-h-[40px] shadow-2xl" onClick={login} />
            {isUserMenu && (
              <motion.div initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                className="w-40 bg-gray-50 shadow-xl rounded-lg flex flex-col overflow-hidden absolute top-12 right-0">
                {user && user.email === "zzphongmazz@gmail.com" && (
                  <Link to={"/createItem"} onClick={() => setIsUserMenu(false)}>
                    <p className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base">
                      NewItem <MdAdd />
                    </p>
                  </Link>
                )}
                <p className="m-2 p-2 rounded-md shadow-md flex items-center justify-center gap-3 cursor-pointer hover:bg-gray-300 bg-gray-200 transition-all duration-100 ease-in-out text-textColor text-base" onClick={logout}>
                  Logout <MdLogout />
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </nav>

      {/* mobie */}
      <nav className="flex items-center justify-between md:hidden w-full h-full">

        <div className="relative flex items-center justify-center" onClick={showCart}>
          <div className="w-5 h-5 rounded-full bg-cartNumBg flex justify-center items-center absolute -top-2 -right-2">
            {cartItems ? (
              <p className="text-xs text-white font-semibold">{cartItems.length}</p>
            ) : (
              <p className="text-xs text-white font-semibold">0</p>
            )}
          </div>
          <MdShoppingBasket className='text-textColor text-2xl cursor-pointer' />
        </div>

        <Link to={"/"} className="flex items-center gap-2">
          <img src={Logo} alt="Logo" className="w-20 object-cover" />
          <p className="text-headingColor text-xl font-bold">City</p>
        </Link>

        <div className="relative">
          <motion.img whileTap={{ scale: 0.6 }} referrerPolicy="no-referrer" src={user ? user.photoURL : noneUserAvatar} alt="none user" className="cursor-pointer rounded-full w-10 min-w-[40px] h-10 min-h-[40px] shadow-2xl" onClick={login} />
          {isUserMenu && (
            <motion.div initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              className="w-40 bg-gray-50 shadow-xl rounded-lg flex flex-col overflow-hidden absolute top-12 right-0">
              {user && user.email === "zzphongmazz@gmail.com" && (
                <Link to={"/createItem"} onClick={() => setIsUserMenu(false)}>
                  <p className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base">
                    NewItem <MdAdd />
                  </p>
                </Link>
              )}

              <ul className="flex flex-col items-start justify-center gap-0">
                <li className="text-base cursor-pointer text-textColor hover:text-headingColor hover:bg-slate-100 duration-100 transition-all ease-in-out px-4 py-2 w-full" onClick={() => setIsUserMenu(false)}>Home</li>
                <li className="text-base cursor-pointer text-textColor hover:text-headingColor hover:bg-slate-100 duration-100 transition-all ease-in-out px-4 py-2 w-full" onClick={() => setIsUserMenu(false)}>Menu</li>
                <li className="text-base cursor-pointer text-textColor hover:text-headingColor hover:bg-slate-100 duration-100 transition-all ease-in-out px-4 py-2 w-full" onClick={() => setIsUserMenu(false)}>About Us</li>
                <li className="text-base cursor-pointer text-textColor hover:text-headingColor hover:bg-slate-100 duration-100 transition-all ease-in-out px-4 py-2 w-full" onClick={() => setIsUserMenu(false)}>Service</li>
              </ul>

              <p className="m-2 p-2 rounded-md shadow-md flex items-center justify-center gap-3 cursor-pointer hover:bg-gray-300 bg-gray-200 transition-all duration-100 ease-in-out text-textColor text-base" onClick={logout}>
                Logout <MdLogout />
              </p>
            </motion.div>
          )}
        </div>
      </nav>
    </header>
  )
}

export default Header