import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sign_in from '../Layout/Sign_in';
import Sign_up from '../Layout/Sign_up';
import Dummy from '../Layout/Dummy';
import Getdummy from "../Layout/Getdummy";


const Routers = () => {
    return (
        <BrowserRouter>
        <Routes>
            <Route path='/Sign_in' element={<Sign_in />} />
            <Route path='/Sign_up' element={<Sign_up />} />
            <Route path='/Dummy' element={<Dummy />} />
            <Route path='/' element={<Getdummy />} />
        </Routes>
        </BrowserRouter>
    );
};

export { Routers };