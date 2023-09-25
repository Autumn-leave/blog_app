import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Dashboard_all = () => {
    const [allblog, Setallblog] = useState([]);
    const nav = useNavigate();

    const fetch = async(token) => {
        const response = await axios.post();
        console.log(response.data);
    }

    useEffect(()=>{
        const token = localStorage.getItem("authToken");
        fetch(token)
    },[])

    return(
        <div>
            hi
        </div>
    )
}