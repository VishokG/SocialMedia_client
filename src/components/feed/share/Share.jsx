import { GroupAdd, PermMedia, AddLocationAlt, AddReaction } from "@mui/icons-material";
import axios from "axios";
import { useContext, useState, useRef } from "react";
import { AuthContext } from "../../../context/AuthContext";
import "./share.css";
const SERVER_URL = process.env.REACT_APP_SERVER_URL;

export default function Share() {

    const desc = useRef();
    const [file, setFile] = useState();
    const currUser = useContext(AuthContext).user;

    const handleSubmit = async (e) => {
        e.preventDefault()
        const newPost = {
            userIdL: currUser._id,
            description: desc.current.value
        }

        await axios.post(`${SERVER_URL}/post/`, newPost);
    }

    const handleFile = (e) => {
        setFile(e.target.files[0]);
    }
    
    // console.log(currUser);
  return (
    <div className="share">
        <div className="shareWrapper">
            <div className="shareTop">
                <img src={currUser.profilePicture} alt="" className="shareProfilePic" />
                <input type="text" placeholder={`What's on your mind ${currUser.name.split(" ")[0]}`} className="shareInput" ref={desc} />
            </div>
            <hr className="shareHr" />
            <form className="shareBottom" onSubmit={handleSubmit}>
                <div className="shareOptions">
                    <label htmlFor="file" className="shareOptionItem">
                    <PermMedia className="shareOptionIcon"/>
                        <span className="shareOptionItemText">Photo/Video</span>
                        <input type="file" id="file" accept=".png,.jpeg,.jpg" onChange={handleFile} />
                    </label>
                    <div className="shareOptionItem">
                    <GroupAdd className="shareOptionIcon"/>
                        <span className="shareOptionItemText">Tag Friends</span>
                    </div>
                    <div className="shareOptionItem">
                    <AddLocationAlt className="shareOptionIcon"/>
                        <span className="shareOptionItemText">Location</span>
                    </div>
                    <div className="shareOptionItem">
                    <AddReaction className="shareOptionIcon"/>
                        <span className="shareOptionItemText">Feeling</span>
                    </div>
                </div>
                <button type="submit" className="shareButton">Share</button>
            </form>
        </div>
    </div>
  )
}
