import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import Topbar from "../../components/topbar/Topbar";
import "./profile.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
const SERVER_URL = process.env.REACT_APP_SERVER_URL;

export default function Profile() {

  const params = useParams();
  const [userData, setUserData] = useState({});

  useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get(`${SERVER_URL}/user/${params.profileId}`);
            setUserData(res.data);
        }
        fetchUser();
    }, []);

  return (  <>
  <Topbar />
  <div className="profile">
    <Sidebar />
    <div className="profileRight">
      <div className="profileRightTop">
        <div className="profileCover">
          <img src="/assets/post/9.jpeg" alt="" className="profileCoverImg" />
          <img src={userData.profilePicture} alt="" className="profileUserImg" />
        </div>
        <div className="profileInfo">
          <h4 className="profileInfoName">{userData.name}</h4>
          <span className="profileInfoDesc"></span>
        </div>
      </div>
      <div className="profileRightBottom">
      <Feed profileId={params.profileId}/> 
    <Rightbar profileId={params.profileId} />
      </div>
    </div>
  </div>
  </>  )  
}
