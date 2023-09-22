import React from "react";
import axios from "axios";
import { convertFromRaw } from 'draft-js';

const Dashboard_card = (props) =>{
    const { blogcontent, onItemDeleted } = props;
    const handleDelete = async (data) => {
        try {
            console.log(data.blog_ID);
            const response = await axios.get("http://localhost:8080/dashboard/deleteBlog",{
                Blog_ID:data.blog_ID
            });
            console.log(response.data);
            // onItemDeleted(index);
        } catch (error) {
            alert("Error: " + error);
        }
    }
    return(
        <div>
                {blogcontent.map((data, index) => {
                    const contentState = convertFromRaw(JSON.parse(data.Content));
                    const contentText = contentState.getPlainText();
                    // for editor need to uncomment
                    //     const contentState = convertFromRaw(JSON.parse(data.Content));
                    //   const editorState = EditorState.createWithContent(contentState);
                    return (

                        <li>
                            <h3 key={index}>{data.User_ID}</h3>
                            <textarea key={index}>{contentText}</textarea>
                            <button onClick={()=>{handleDelete(data)}} className="btn btn-warning">delete</button>
                        </li>
                        //       <Editor editorState={editorState} readOnly={true}
                        //   />
                    );
                }
                )}
            </div>
    );
}
export default Dashboard_card;