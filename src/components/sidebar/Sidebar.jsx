import { RssFeed, Chat, Bookmark, Event, PlayCircle } from "@mui/icons-material";
import "./sidebar.css";
import CloseFriend from "./CloseFriend/CloseFriend";
import { Users } from "../../dummyData";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sideWrapper">
        <ul className="sidebarList">
          <li className="sidebarListItem">
            <RssFeed className="sidebarIcon"/>
            <span className="sidebarListItemText">Feed</span>
          </li>
          <li className="sidebarListItem">
            <Chat className="sidebarIcon"/>
            <span className="sidebarListItemText">Messages</span>
          </li>
          <li className="sidebarListItem">
            <Bookmark className="sidebarIcon"/>
            <span className="sidebarListItemText">Bookmarks</span>
          </li>
          <li className="sidebarListItem">
            <Event className="sidebarIcon"/>
            <span className="sidebarListItemText">Events</span>
          </li>
          <li className="sidebarListItem">
            <PlayCircle className="sidebarIcon"/>
            <span className="sidebarListItemText">Videos</span>
          </li>
        </ul>
        <hr className="sidebarHr" />
        <ul className="sidebarFriendsList">
          {Users.map(user => {
            return <CloseFriend key={user.id} profilePic={user.profilePicture} username={user.username} />
          })}
        </ul>
      </div>
    </div>
  )
}
