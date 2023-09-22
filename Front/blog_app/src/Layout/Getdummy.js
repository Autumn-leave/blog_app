// import React, { useEffect, useState } from "react";
// import { convertFromRaw, EditorState } from 'draft-js';
// import { Editor } from "react-draft-wysiwyg";
// import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
// import axios from "axios";

// const Getdummy = () => {
//   const [blogcontent, setBlogcontent] = useState([]);

//   const fetchBlogContent = async () => {
//     try {
//       const Blog_ID = 13;
//       const response = await axios.get(`http://localhost:8080/dashboard/getEditBtn/${Blog_ID}`);
//       console.log(response.data.blogData);
//       setBlogcontent(response.data.blogData);
//     } catch (error) {
//       alert("Error: " + error);
//     }
//   };

//   useEffect(() => {
//     fetchBlogContent();
//   }, []);

//   return (
//     <div>
//       <div>
//         {blogcontent.map((data, index) => {
//           // const contentState = convertFromRaw(JSON.parse(data.Content));
//           // const contentText = contentState.getPlainText();
//           // for editor need to uncomment
//           const contentState = convertFromRaw(JSON.parse(data.Content));
//           const editorState = EditorState.createWithContent(contentState);
//           return (

//             <li>
//               <h3 key={index}>{data.User_ID}</h3>
//               {/* <textarea key={index}>{contentText}</textarea> */}

//               <Editor editorState={editorState} readOnly={true}
//               />
//             </li>
//           );
//         }
//         )}
//       </div>
//     </div>
//   );
// };

// export default Getdummy;

import React, { useEffect, useState } from "react";
import { convertFromRaw, EditorState } from 'draft-js';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import axios from "axios";

const Getdummy = () => {
  const [blogcontent, setBlogcontent] = useState([]);

  const fetchBlogContent = async () => {
    try {
      const response = await axios.get("http://localhost:8080/dashboard/fetch");
      setBlogcontent(response.data.blogData);
    } catch (error) {
      alert("Error: " + error);
    }
  };

  useEffect(() => {
    fetchBlogContent();
  }, []);

  return (
    <div>
      <div>
        {blogcontent.map((data, index) => {
          const contentState = convertFromRaw(JSON.parse(data.Content));
          const editorState = EditorState.createWithContent(contentState);
          return (
            <Editor
              key={index}
              editorState={editorState}
              readOnly={true}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Getdummy;