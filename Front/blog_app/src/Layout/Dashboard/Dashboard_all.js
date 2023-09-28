import React, { useEffect, useState } from "react";
import Dashboard_nav from "../../Component/Dashboard_nav";
import Dashboard_card from "../../Component/Dashboard_card";
import dashboardService from "../../Service/DashboardService";


const Dashboard_all = () => {
    const [allblog, Setallblog] = useState([]);
    const [searchterm, Setsearchterm] =useState('');


    const fetch = async (token) => {
        const response = await dashboardService.dashboardall(token);
        console.log(response.data.blogData);
        Setallblog(response.data.blogData);
    }


    const filtereddata = allblog.filter((blog) => {
        return blog.Title.toLowerCase().includes(searchterm.toLowerCase());
    });

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        fetch(token)
    }, [])

    return (
        <div>
            <Dashboard_nav />
            <div className="Dashboardcontent">
                <input
                    type="text"
                    placeholder="search.."
                    className="form-control col-10 src-btn"
                    value={searchterm}
                    onChange={(e) => { Setsearchterm(e.target.value) }}
                />
                <Dashboard_card blogcontent={filtereddata} />
            </div>
        </div>
    )
}
export default Dashboard_all;