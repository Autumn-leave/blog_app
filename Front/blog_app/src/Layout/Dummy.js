import React, { useState } from "react";

function Dummy() {
    const [likes, setlikes] = useState(0);
    const [likessts, setlikessts] = useState(false);
    const [dislikes, setdislikes] = useState(0);
    const [dislikessts, setdislikessts] = useState(false);
    return (
        <div>
            <button onClick={() => {
                if (!likessts) {
                    setlikes(likes + 1)
                    setlikessts(true);
                    if (dislikes > 0) {
                        setdislikes(dislikes - 1)
                        setdislikessts(false);
                    }
                }
            }}>
                {likes} likes
            </button><br />
            <button onClick={() => {
                if (!dislikessts) {
                    setdislikes(dislikes + 1);
                    setdislikessts(true);
                    if (likes > 0) {
                        setlikes(likes - 1)
                        setlikessts(false);
                    }
                }

            }}>
                {dislikes} dislikes
            </button>
        </div>
    )
}

export default Dummy;