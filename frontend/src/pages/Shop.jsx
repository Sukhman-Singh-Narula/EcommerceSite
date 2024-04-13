import React from 'react'
import Hero from "../components/Hero/Hero" 
import Popular from "../components/Popular/Popular.jsx"
import Offers from "../components/Offers/Offers.jsx"
import NewCollection from '../components/NewCollections/NewCollection.jsx'
import Newsletter from '../components/newsletter/newletter.jsx'
import Footer from '../components/footer/footer.jsx'

const Shop = () => {
    return(
        <div className="">
            <Hero/>
            <Popular/>
            <Offers/>
            <NewCollection/>
            <Newsletter/>
            
        </div>
    )
}

export default Shop