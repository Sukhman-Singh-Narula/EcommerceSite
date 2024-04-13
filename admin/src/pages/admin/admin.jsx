import React from 'react';
import "./admin.css";
import Sidebar from '../../components/sidebar/sidebar';
import {Routes, Route} from 'react-router-dom';
import AddProduct from '../../components/addProduct/addProduct';
import ListProduct from '../../components/ListProduct/listProduct';

function Admin() {
    return (
        <div className='admin'>
            <Sidebar/>
            <Routes>
                <Route path='/addproduct' element={<AddProduct/>}/>
                <Route path='/allproducts' element={<ListProduct/>}/>
            </Routes>

        </div>
    );
}

export default Admin;