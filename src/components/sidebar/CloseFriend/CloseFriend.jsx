import "./closefriend.css";

export default function CloseFriend(props) {
  return (
    <li className="sidebarFriendsListItem">
        <img src={props.profilePic} alt="" className="sidebarFriendsListItemImg" />
        <span className="sidebarFriendsListItemName">{props.username}</span>
    </li>
  )
}
