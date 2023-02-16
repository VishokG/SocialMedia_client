import { Cake, Add, Remove } from "@mui/icons-material";
import OnlineFriend from "./OnlineFriend/OnlineFriend";
import "./rightbar.css";
import { Users } from "../../dummyData";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

export default function Rightbar(props) {
  const [userData, setUserData] = useState({});
  const [friendsData, setFriendsData] = useState([]);
  const [followed, setFollowed] = useState(false);
  const {user: currUser, dispatch} = useContext(AuthContext);
  const currUserPresent = currUser?true:false;
  
  useEffect(() => {
	if(props.profileId && currUser) setFollowed(currUser.following.includes(props.profileId));
  }, [])

  const followHandler = async () => {
	try {
		if(followed) {
			await axios.put(`/user/${props.profileId}/unfollow`, {
				userId: currUser._id
			});
			dispatch({type: "UNFOLLOW", payload: props.profileId});
		} else {
			await axios.put(`/user/${props.profileId}/follow`, {
				userId: currUser._id
			});
			dispatch({type: "FOLLOW", payload: props.profileId});
		}

		setFollowed(!followed);
	} catch(err) {
		console.log(err);
	}
  }

  useEffect(() => {
        if(props.profileId) {
          const fetchUser = async () => {
            const res = await axios.get(`/user/${props.profileId}`);
			const res2 = await axios.get(`/user/friends/${props.profileId}`)
            setUserData(res.data);
			setFriendsData(res2.data);
          }
          fetchUser();
		  
        } else {
          setUserData(currUser);
        }
    }, []);
  
  if(!props.profileId) {return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        <div className="rightbarBirthdayContainer">
          <Cake className="rightbarCake"/>
          <span className="rightbarBirthdayCelebrators"><b>Kraven Okhotnik</b> and <b>2 others</b> are having a birthday today</span>
        </div>
        <div className="rightbarAd">
          <img className="rightbarAdImage" src="/assets/ad.jpeg" alt="" />
        </div>

        <div className="rightbarFriends">
          <h4 className="rightbarTitle">Online Friends</h4>
          <ul className="rightbarFriendsList">
          {Users.map(user => {
            return <OnlineFriend key={user.id} profilePic={user.profilePicture} name={user.name} />
          })}
          </ul>
        </div>
      </div>
    </div>
  )} else {

    return <div className="rightbarAlternate">
	{currUserPresent?(props.profileId !== currUser._id?(<button onClick={followHandler} className="rightBarFollowButton">{followed? "Unfollow": "Follow"}</button>):<></>):<></>}
      <h4 className="rightbarTitle">User Information</h4>
      <div className="rightbarInfo">
        <div className="rightbarInfoItem">
          <span className="rightbarInfoItemKey">City: </span>
          <span className="rightbarInfoItemVal">{userData.city}</span>
        </div>
        <div className="rightbarInfoItem">
          <span className="rightbarInfoItemKey">From: </span>
          <span className="rightbarInfoItemVal">{userData.hometown}</span>
        </div>
        {!userData.relationship?<></>:<div className="rightbarInfoItem">
          <span className="rightbarInfoItemKey">Status: {userData.relationship === 1?"Single":userData.relationship === 2?"In a relationship":"Married"}</span>
          <span className="rightbarInfoItemVal"></span>
        </div>}
      </div>
      <div className="rightbarFollowing">

	  	{friendsData.map(friend => <div className="rightbarFollowingItem">
          <img src={friend.profilePicture} alt="" className="rightbarFollowingItemImg" />
          <span className="rightbarFollowingItemName">{friend.name}</span>
        </div>)}
      </div>
    </div>
  }
}

//{followed? <Remove />: <Add />}