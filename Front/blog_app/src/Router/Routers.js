import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sign_in from '../Layout/Sign_in';
import Sign_up from '../Layout/Sign_up';


const Routers = () => {
    return (
        <BrowserRouter>
        <Routes>
            <Route path='/' element={<Sign_in />} />
            <Route path='/Sign_up' element={<Sign_up />} />
        </Routes>
        </BrowserRouter>
    );
};

export { Routers };