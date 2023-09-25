import React, { useEffect, useState } from "react";
import Dashboard_nav from "./Dashboard_nav";
import Dashboard_card from "./Dashboard_card";
import dashboardService from "../../Service/DashboardService";


const Dashboard_all = () => {
    const [allblog, Setallblog] = useState([]);

    const fetch = async(token) => {
        const response = await dashboardService.dashboardall(token);
        console.log(response.data.blogData);
        Setallblog(response.data.blogData);
    }

    useEffect(()=>{
        const token = localStorage.getItem("authToken");
        fetch(token)
    },[])

    return(
        <div>
            <Dashboard_nav />
            <div className="Dashboardcontent">
                <Dashboard_card blogcontent={allblog} />
            </div>
        </div>
    )
}
export default Dashboard_all;