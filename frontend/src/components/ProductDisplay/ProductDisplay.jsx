import React from 'react';
import './ProductDisplay.css';
import star_icon from '../assets/star_icon.png';
import star_dull_icon from '../assets/star_dull_icon.png';
import { ShopContext } from '../../context/ShopContent';

const ProductDisplay = (props) => {
    const { product } = props;
    const { addToCart} = React.useContext(ShopContext);

    return (
        <div className='productDisplay'>
            <div className="productDisplay-left">
                <div className="productDisplay-img-list">
                    <img src={product.image} alt="" />
                    <img src={product.image} alt="" />
                    <img src={product.image} alt="" />
                    <img src={product.image} alt="" />
                </div>
                <div className="productDisplay-img">
                    <img className='productDisplay-main-img' src={product.image} alt="" />
                </div>
            </div>
            <div className="productDisplay-right">
                <h1>{product.name}</h1>
                <div className="productDisplay-right-stars">
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_dull_icon} alt="" />
                    <p>(122)</p>
                </div>
                <div className="productDisplay-right-prices">
                    <div className="productDisplay-right-old-price">${product.old_price}</div>
                    <div className="productDisplay-right-new-price">${product.old_price}</div>
                </div>
                <div className="productDisplay-right-description">
                Crafted from the softest yarns, this cozy sweater is a wardrobe staple that combines comfort with effortless style.
                Featuring a classic crew neck and ribbed trims for a snug fit, its versatile design pairs perfectly with both casual jeans and tailored pieces.
                </div>
                <div className="productDisplay-right-size">
                    <p>Size</p>
                    <div className="productDisplay-right-size-list">
                        <h1>Select size</h1>
                        <div className="productDisplay-right-sizes">
                            <div className="">S</div>
                            <div className="">M</div>
                            <div className="">L</div>
                            <div className="">XL</div>
                            <div className="">XXL</div>
                        </div>
                    </div>
                </div>
                <button onClick={() => {addToCart(product.id)}}>ADD TO CART</button>
                    <p className='productDisplay-right-category'><span>Category: </span> Women, T-shirt, Crop Top</p>
                    <p className='productDisplay-right-category'><span>Tags: </span> Modern, Latest</p>

            </div>
        </div>
    );
};

export default ProductDisplay;