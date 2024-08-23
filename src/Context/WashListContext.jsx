import axios from "axios";
import { createContext } from "react";

export let WashListContext = createContext();

export default function WashListContextProvider({ children }) {

    const addProductToWishlist = (id) => {
        return axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`, { productId: id }, {
            headers: { token: localStorage.getItem('token') }
    });
    };

    const getLoggedUserWishlist = () => {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
            headers: { token: localStorage.getItem("token") }
        });
    };

    const removeProductFromWishlist=(id)=>{
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`)
    }

    return (
        <WashListContext.Provider value={{ addProductToWishlist, getLoggedUserWishlist }}>
            {children}
        </WashListContext.Provider>
    );
}

