import React from 'react';
import './newsletter.css';

const Newsletter = () => {
    return (
        <div className='newsletter'>
            <h1>Get Exclusive Offers on your Email</h1>
            <p>Subscribe our Newsletter and stay updated</p>
            <div className="">
                <input type="email" placeholder='Your Email ID' />
                <button>Subscribe</button>
            </div>
        </div>
    );
};

export default Newsletter;