import "./onlinefriend.css"

export default function OnlineFriend(props) {
  return (
    <li className="rightbarFriend">
        <div className="rightbarFriendPicContainer">
            <img src={props.profilePic} alt="" className="rightbarFriendPic" />
            <span className="rightbarFriendOnline"></span>
        </div>
        <span className="rightbarFriendName">{props.name}</span>
    </li>
  )
}
