import React, { useEffect } from 'react';

export const ShopContext = React.createContext(null);

const getDefaultCart = () => {
    let cart = {};
    for (let index = 0; index<300+1; index++) {
        cart[index] = 0;
    }
    return cart;
}

const ShopContextProvider = (props) => {

    const [allProducts, setAllProducts] = React.useState([]); // [all_products, setAllProducts
    const [cartItems, setCartItems] = React.useState(getDefaultCart());

    useEffect(() => {
        fetch('http://localhost:4000/allproducts')
            .then(response => response.json())
            .then(data => setAllProducts(data));

        if(localStorage.getItem('auth-token')){
            fetch('http://localhost:4000/getcart', {
                method: 'POST',
                headers: {
                    Accept: 'application/form-data',
                    'Content-Type': 'application/json',
                    'auth-token': `${localStorage.getItem('auth-token')}`
                },
                body:""
            }).then(response => response.json()).then((data)=> setCartItems(data));
            }
    }, []);

    const addToCart = (itemId) => {
        setCartItems((prev)=>({ ...prev, [itemId]: prev[itemId] + 1 }));
        if(localStorage.getItem('auth-token')){
            fetch('http://localhost:4000/addtocart', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'auth-token': `${localStorage.getItem('auth-token')}`
                },
                body: JSON.stringify({"itemId": itemId})
            }).then(response => response.json())
            .then((data)=> console.log(data));
            }
    };

    const removeFromCart = (id) => {
        const currentQty = cartItems[id];
        setCartItems({ ...cartItems, [id]: currentQty - 1 });
        if(localStorage.getItem('auth-token')){
            fetch('http://localhost:4000/removefromcart', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'auth-token': `${localStorage.getItem('auth-token')}`
                },
                body: JSON.stringify({"itemId": id})
            }).then(response => response.json())
            .then((data)=> console.log(data));
            }
    } 

    const getTotalCartAmount = () => {
        let totalAmount=0;
        for(const item in cartItems){
            if(cartItems[item] > 0){
                let itemInfo = allProducts.find((product) => product.id === Number(item));
                totalAmount += cartItems[item] * itemInfo.new_price;
            }}return totalAmount;
            
    }

    const getTotalCartItems = () => {
        let totalItems=0;
        for(const item in cartItems){
            if(cartItems[item] > 0){
                totalItems += cartItems[item];
            }}return totalItems;
    }
    
    const contextValue = { getTotalCartItems ,getTotalCartAmount ,allProducts, cartItems, addToCart, removeFromCart};

    

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;