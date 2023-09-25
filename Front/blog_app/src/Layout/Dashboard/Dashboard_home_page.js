import React, { useEffect, useState } from "react";
import axios from "axios";
import Dashboard_nav from "./Dashboard_nav";
import Dashboard_card from "./Dashboard_card";
import "../../Styles/Dashboard_card.css";
import { useNavigate } from "react-router-dom";
import dashboardService from "../../Service/DashboardService";

const Dashboard_home_page = () => {
    const [blogcontent, setBlogcontent] = useState([]);
    const nav = useNavigate()

    const fetchBlogContent = async (token) => {
        const response = await dashboardService.dashboardhome(token);
        if (response.message === "Success of get data") {
            setBlogcontent(response.blogData);
        }
        else {
            console.log(response);
        }
    };


    const handleItemDeleted = (deletedItem) => {

        setBlogcontent((prevBlogcontent) =>
            prevBlogcontent.filter((item) => item.blog_ID !== deletedItem.blog_ID)
        );
    };

    useEffect(() => {
        // console.log("in useeffect");
        const token = localStorage.getItem("authToken")
        if (token !== null) {
            fetchBlogContent(token);
        }
        else {
            localStorage.clear()
            nav('/')
        }

    }, []);

    return (
        <div>
            <Dashboard_nav />
            <div className="Dashboardcontent">
                <Dashboard_card blogcontent={blogcontent} onItemDeleted={handleItemDeleted} />
            </div>
        </div>
    );
};

export default Dashboard_home_page;
