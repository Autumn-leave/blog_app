import axios from "axios";
import React, { useEffect, useState } from "react";

function LikeBtn() {
    // const [likes, setlikes] = useState(false) //false means dislike || true means like

    const [like_count, setlike_count] = useState(0);
    const [dislike_count, setdislike_count] = useState(0);

    const [likessts, setlikessts] = useState(0);
    const [dislikessts, setdislikessts] = useState(0);

    

    async function likeCount() {
        const result = await axios.get(`http://localhost:8080/dashboard/LikeCount`,
            {
                params: {
                    blog_id: localStorage.getItem("blog_id"),
                },

            });
        setlike_count(result.data.data);
    }

    async function dislikeCount() {

        const result = await axios.get(`http://localhost:8080/dashboard/DislikeCount`,
            {
                params: {
                    blog_id: localStorage.getItem("blog_id"),
                },

            }
        );
        setdislike_count(result.data.data);
    }

    async function like() {
        if (likessts==0) {
            setlikessts(1);
            console.log(likessts, " form in if like status")
        }
        const response = await axios.post("http://localhost:8080/dashboard/LikeRecord", {
            like: "true",
            user_id: 3,
            blog_id: localStorage.getItem("blog_id"),
        })
        console.log(response.data);
        setlike_count(response.data.data);
        likeCount();
        dislikeCount();
        setdislikessts(0)
    }

    async function dislike() {
        if (dislikessts==0) {
            setdislikessts(1);
            console.log(likessts, " form in if dislike status")
        }
        const response = await axios.post("http://localhost:8080/dashboard/LikeRecord", {
            like: "true",
            user_id: 3,
            blog_id: localStorage.getItem("blog_id"),
        })
        console.log(response.data);
        setdislike_count(response.data.data);
        likeCount();
        dislikeCount();
        setlikessts(0)
    }


    useEffect(() => {
        likeCount();
        dislikeCount();
    }, [])

    return (
        <div>
            <button onClick={like}>
                {like_count} likes
            </button><br />
            <button onClick={dislike}>
                {dislike_count} dislikes
            </button>
        </div>
    )
}

export default LikeBtn;


// async function like() {
//     if (!likessts) {
//         await setlikessts(true);
//         console.log(likessts, " form in if like status")
//         if (dislike_count > 0) {
//             // setdislikes(dislikes - 1)
//             setdislikessts(false);
//         }
//     }
//     const response = await axios.post("http://localhost:8080/dashboard/LikeRecord", {
//         like: "true",
//         user_id: 3,
//         blog_id: 2 //localStorage.blog_id,
//     })
//     console.log(response.data);
//     setlike_count(response.data.data);


// }

// async function dislike() {
//     if (!dislikessts) {
//         await setdislikessts(true);
//         if (like_count > 0) {
//             // setlikes(likes - 1)
//             setlikessts(false);
//         }
//     }
//     console.log(likes, " form user dislike")
//     const response = await axios.post("http://localhost:8080/dashboard/LikeRecord", {
//         like: "false",
//         user_id: 3,
//         blog_id: 2 //localStorage.blog_id,
//     })
//     console.log(response.data);
//     setdislike_count(response.data.data);
// }

