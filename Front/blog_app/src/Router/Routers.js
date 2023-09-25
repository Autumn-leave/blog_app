import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sign_in from '../Layout/Sign_in';
import Sign_up from '../Layout/Sign_up';
import Dashboard_new_page from '../Layout/Dashboard/Dashboard_new_page';
import Dashboard_edit_page from '../Layout/Dashboard/Dashboard_edit_page';
import Dashboard_home_page from '../Layout/Dashboard/Dashboard_home_page';
import Dashboard_bin from '../../src/Layout/Dashboard/Dashboard_bin';
import Dashboard_all from '../Layout/Dashboard/Dashboard_all';
import Dashboard_view_page from '../Layout/Dashboard/Dashboard_view_page';


const Routers = () => {
    return (
        <BrowserRouter>
        <Routes>
            <Route path='/' element={<Sign_in />} />
            <Route path='/Sign_up' element={<Sign_up />} />
            <Route path='/Dashboard_home_page' element={<Dashboard_home_page />} />
            <Route path='/Dashboard_new_page' element={<Dashboard_new_page />} />
            <Route path='/Dashboard_edit_page' element={<Dashboard_edit_page />} />
            <Route path='/Dashboard_bin' element={ <Dashboard_bin />} />
            <Route path='/Dashboard_all' element={<Dashboard_all />} />
            <Route path='/Dashboard_view_page' element={<Dashboard_view_page /> } />
            
        </Routes>
        </BrowserRouter>
    );
};

export { Routers };