import React, { useEffect, useState } from "react";
import axios from "axios";
import Dashboard_nav from "./Dashboard_nav";
import Dashboard_card from "./Dashboard_card";
import "../../Styles/Dashboard_card.css";

const Dashboard_home_page = () => {
    const [blogcontent, setBlogcontent] = useState([]);

    const fetchBlogContent = async () => {
        const token = localStorage.getItem("authToken")
        try {
            const response = await axios.get("http://localhost:8080/dashboard/fetchdelete",{headers: {Authorization: token}});
            console.log(response.data);
            setBlogcontent(response.data.blogData);
        } catch (error) {
            alert("Error: " + error);
        }
    };

    const handleItemRestore = (deletedItem) => {
       
        setBlogcontent((prevBlogcontent) =>
            prevBlogcontent.filter((item) => item.blog_ID !== deletedItem.blog_ID)
        );
    };

    useEffect(() => {
        console.log("in useeffect");
        fetchBlogContent();
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
