import { Search, Person, Chat, Notifications } from "@mui/icons-material"
import { useContext } from "react"
import { Link } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"
import "./topbar.css"


export default function Topbar() {
  const currUser = useContext(AuthContext).user;

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link style={{textDecoration: "none"}} to={"/"}><span className="logo">Kwitter</span></Link>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchLogo"/>
          <input placeholder="Search for a Person or a Post" className="searchInput" /> 
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <span className="topbarLinkItem">Home</span>
          <span className="topbarLinkItem">Wall</span>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItemContainer">
            <Person className="topbarIconItem"/>
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItemContainer">
            <Chat className="topbarIconItem"/>
            <span className="topbarIconBadge">3</span>
          </div>
          <div className="topbarIconItemContainer">
            <Notifications className="topbarIconItem"/>
            <span className="topbarIconBadge">2</span>
          </div>
        </div>
        <img src={currUser.profilePicture} alt="" className="topbarProfilePic" />
      </div>
    </div>
  )
}
