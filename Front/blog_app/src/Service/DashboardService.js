// dashboardService.js
import axios from "axios";
let baseUrl = process.env.REACT_APP_API_BASE_URL;

const dashboardService = {
    dashboardhome: async (token) => {
        try {
            // const response = await axios.get(`${baseUrl}/dashboard/fetch`, {
                const response = await axios.get('http://localhost:8080/dashboard/fetch', {
                headers: { Authorization: token },
            });
            return response.data;
        } catch (error) {
            console.log("ERROR: ",error);
        }
    },

    dashboardnew: async (rawText, title, token) => {
        try {
            const response = await axios.post("http://localhost:8080/dashboard/createblog", {
                content: rawText,
                title: title,
            }, { headers: { Authorization: token } });
            return response;
        }
        catch (error) {
            console.log("ERROR: ",error);
        }
    },

    dashboardall: async (token) => {
        try {
            const response = await axios.get("http://localhost:8080/dashboard/fetchallblog",
                {
                    headers: { Authorization: token }
                });
            return response;
        }
        catch (error) {
            console.log("ERROR: ",error);
        }
    },
    dashboardbin: async (token) => {
        try {
            const response = await axios.get("http://localhost:8080/dashboard/fetchdelete", { headers: { Authorization: token } });
            return response;
        }
        catch (error) {
            console.log("ERROR: ",error);
        }

    },
    dashboardcard_handledelete: async(blog_ID,token) =>{
        try{
            const response = await axios.get(`http://localhost:8080/dashboard/deleteBlog/${blog_ID}`, {headers: {Authorization: token}});
            return response;
        }
        catch(error){
            console.log("ERROR: ",error);
        }
    },
    dashboardcard_handlerestore: async(blog_ID) =>{
        try{
            const response = await axios.get(`http://localhost:8080/dashboard/restore/${blog_ID}`);
            return response;
        }
        catch(error){
            console.log("ERROR: ",error);
        }
    },
    dashboardedit: async(blog_ID,rawText,title) =>{
        try{
            const response =await axios.post("http://localhost:8080/dashboard/editBlog",{
                Blog_ID: blog_ID,
                content: rawText,
                title: title,
            });
            return response;
        }
        catch(error){
            console.log("ERROR: ",error);
        }
    },
    dashboardeditbtn: async (Blog_ID,token) =>{
        try{
            const response = await axios.get(`http://localhost:8080/dashboard/getEditBtn/${Blog_ID}`, { headers: { Authorization: token } });
            return response;
        }
        catch(error){
            console.log("ERROR: ",error);
        }
    }


};

export default dashboardService;