import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sign_in from '../Layout/Sign_in';
import Sign_up from '../Layout/Sign_up';
import Dashboard_new_page from '../Layout/Dashboard/Dashboard_new_page';
import Dashboard_edit_page from '../Layout/Dashboard/Dashboard_edit_page';
import Dashboard_home_page from '../Layout/Dashboard/Dashboard_home_page';
import Dummy from '../Layout/Dummy';
import Getdummy from "../Layout/Getdummy";


const Routers = () => {
    return (
        <BrowserRouter>
        <Routes>
            <Route path='/Sign_in' element={<Sign_in />} />
            <Route path='/Sign_up' element={<Sign_up />} />
            <Route path='/' element={<Dashboard_home_page />} />
            <Route path='/Dashboard_new_page' element={<Dashboard_new_page />} />
            <Route path='/Dashboard_edit_page' element={<Dashboard_edit_page />} />
            <Route path='/Dummy' element={<Dummy />} />
            <Route path='/Getdummy' element={<Getdummy />} />
            
        </Routes>
        </BrowserRouter>
    );
};

export { Routers };