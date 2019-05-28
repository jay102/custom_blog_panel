import React, { Component } from "react";
import { NavLink } from 'react-router-dom'

const iconStyle = { marginRight: "5px" }
const activeLink = { color: "#007bff" }
class SideBar extends Component {

  render() {
    return (
      <nav className="col-md-2 d-none d-md-block bg-light sidebar">
        <div className="sidebar-sticky">
          <ul className="nav flex-column">
            <li>
              <NavLink className="nav-link" activeStyle={activeLink} exact to="/admin/dashboard"><span style={iconStyle}><i className="fa fa-th-list"></i></span>Dashboard</NavLink>
              <span className="sr-only">(current)</span>
            </li>
            <li >
              <NavLink className="nav-link" activeStyle={activeLink} to="/admin/dashboard/new-post"><span style={iconStyle}><i className="fa fa-plus"></i></span>New Post</NavLink>
            </li>
            <li >
              <NavLink className="nav-link" activeStyle={activeLink} to="/admin/dashboard/all-posts"><span style={iconStyle}><i className="fa fa-poll-h"></i></span>All Posts</NavLink>
            </li>
            <li >
              <NavLink className="nav-link" activeStyle={activeLink} to="/admin/dashboard/signout"><span style={iconStyle}><i className="fa fa-step-forward"></i></span>Signout</NavLink>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default SideBar;