import React, { useEffect, useState } from "react";
import Dashboard_nav from "../../Component/Dashboard_nav";
import Dashboard_card from "../../Component/Dashboard_card";
import "../../Styles/Dashboard_card.css";
import dashboardService from "../../Service/DashboardService";
import { useNavigate } from "react-router-dom";

const Dashboard_home_page = () => {
    const [blogcontent, setBlogcontent] = useState([]);
    const nav = useNavigate()
    const fetchBlogContent = async () => {
        const token = localStorage.getItem("authToken")
        const response = await dashboardService.dashboardbin(token);
        setBlogcontent(response.data.blogData);
    };

    const handleItemRestore = (deletedItem) => {

        setBlogcontent((prevBlogcontent) =>
            prevBlogcontent.filter((item) => item.blog_ID !== deletedItem.blog_ID)
        );
    };

    useEffect(() => {

        const token = localStorage.getItem("authToken")
        if (token !== null) {
            fetchBlogContent();
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
                <Dashboard_card blogcontent={blogcontent} onItemDeleted={handleItemRestore} />
            </div>
        </div>
    );
};

export default Dashboard_home_page;
