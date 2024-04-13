import React, { useContext } from 'react'
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContent.jsx';
import Breadcrumb from '../components/breadcrumbs/breadcrumb.jsx';
import ProductDisplay from '../components/ProductDisplay/ProductDisplay.jsx';
import DescriptonBox from '../components/DescriptionBox/DescriptionBox.jsx';
import RelatedProducts from '../components/RelatedProducts/RelatedProducts.jsx';

const Product = () => {
    const {allProducts} = useContext(ShopContext);
    console.log(allProducts);
    const {productId} = useParams();
    const product = allProducts.find((e) => e.id === Number(productId));
    return(
        <div className="">
            <Breadcrumb product={product}/>
            <ProductDisplay product={product}/>
            <DescriptonBox/>
            <RelatedProducts/>
            
        </div>
    )
}

export default Product