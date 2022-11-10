export const fetchUser = () => {
    const userInfo = localStorage.getItem("user") !== undefined ? JSON.parse(localStorage.getItem("user")) : localStorage.removeItem("user");

    return userInfo;
};

export const fetchCart = () => {
    const cartInfo = localStorage.getItem("cartItems") !== undefined ? JSON.parse(localStorage.getItem("cartItems")) : localStorage.removeItem("cartItems");

    return cartInfo ? cartInfo : [];
};