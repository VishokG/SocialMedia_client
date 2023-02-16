import { MoreVert } from "@mui/icons-material";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Users } from "../../../dummyData";
import "./post.css";
import {format} from "timeago.js";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";

export default function Post(props) {
    // const userData = Users.filter(user => user.id === props.id)[0]

	const [likes, setLikes] = useState(props.like);
	const [isLiked, setIsLiked] = useState(false);
    const [userData, setUserData] = useState({});
    const currUser = useContext(AuthContext).user;

	const likeHandler = async () => {
        await axios.put(`/post/${props.postId}/like/`, {userId: currUser._id});
		setLikes(isLiked?likes-1:likes+1);
		setIsLiked(!isLiked);
	}

    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get(`/user/${props.userId}`);
            setUserData(res.data);
        }
        fetchUser();
    }, []);

  return (
    <div className="post">
        <div className="postWrapper">
            <div className="postTop">
                <div className="postTopLeft">
                <Link to={`/profile/${userData._id}`}>
                    <img src={userData.profilePicture || "/assets/no_avatar.png"} alt="" className="postProfilePic" />
                    </Link>
                    <div>
                    <span className="postNameofUser">{userData.name}</span>
                    <span className="postDatetime">{format(props.date)}</span>
                    </div>
                </div>
                <div className="postTopRight">
                    <MoreVert className="postOptions"/>
                </div>
            </div>
            <div className="postCenter">
                <div className="postText">{props.desc}</div>
                <div className="postImgContainer">
                    <img className="postImg" src={props.photo} alt="" />
                </div>
            </div>
            <div className="postBottom">
                <div className="postBottomLeft">
                    <img className="postLikeButton" src="/assets/like.png" alt="" onClick={likeHandler} />
                    <span className="postLikeCounter">{likes} people like this</span>
                </div>
                <div className="postBottomRight">
                    <span className="postCommentText">{props.comment} comments</span>
                </div>
            </div>
        </div>
    </div>
  )
}
