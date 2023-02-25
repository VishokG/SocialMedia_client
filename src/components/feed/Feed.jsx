import "./feed.css";
import Post from "./post/Post";
import Share from "./share/Share";
import {Posts} from "../../dummyData";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

export default function Feed(props) {
  const [posts, setPosts] = useState([]);
  const currUser = useContext(AuthContext).user;

  useEffect(() => {
    const fetchPosts = async () => {
      const URL = props.profileId?`${SERVER_URL}/post/profile/${props.profileId}`:`${SERVER_URL}/post/timeline/${currUser._id}`;
      const res = await axios.get(URL);
      setPosts(res.data.sort((p1, p2) => {
        return new Date(p2.createdAt) - new Date(p1.createdAt);
      }));
    }
    fetchPosts();
  }, []);

  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share />
        {posts.map(post => {
          return <Post key={post._id} postId={post._id} userId={post.userId} date={post.createdAt} desc={post.description} photo={post.img} like={post.likes.length} comment={post.comment} />
        })}
      </div>
    </div>
  )
}