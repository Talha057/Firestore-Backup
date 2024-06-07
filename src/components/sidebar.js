import React from "react";
import "../Screens/admin.css";
import MenuIcon from "@mui/icons-material/Menu";

import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  return (
    <nav id="sidebar" className="col-3">
      <div className="p-4 pt-5">
        <a href="#">
          <img
            className="img logo rounded-circle mb-5 "
            src="https://img.freepik.com/free-vector/bar-chart-icon-analytics-symbol_53876-116178.jpg?size=626&ext=jpg&ga=GA1.1.478764289.1689769707&semt=ais"
          ></img>
        </a>
        <ul className="list-unstyled mb-5">
          <li className="active">
            <a className="sidemenu-btn" href="/managebackup">
              Backups
            </a>
          </li>
          <hr style={{ color: "gray" }}></hr>
          <li>
            <a className="sidemenu-btn" href="/restore">
              Restore
            </a>
          </li>

          <hr style={{ color: "gray" }}></hr>
          <li>
            <button
              className="button"
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/");
              }}
            >
              {" "}
              Sign Out
            </button>
            <hr style={{ color: "gray" }}></hr>
          </li>
        </ul>
        <div className="footer">
          <p>Copyright &copy; All rights reserved |</p>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
