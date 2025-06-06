import { Link, useNavigate } from "react-router-dom";
import useAuth from "./hooks/useAuth";
import api from "./api";
import "./style.css";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleDeleteAccount = async () => {
    if (
      !window.confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      )
    )
      return;

    try {
      const response = await api.delete("/delete");
      if (response.status === 204) {
        logout();
        navigate("/login");
      } else {
        console.error(
          "Unexpected response status:",
          response.status
        );
        alert("Account deletion failed. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting account:", error);
      alert(
        "Something went wrong while deleting your account. Please try again later."
      );
    }
  };

  const logoutWrapper = async () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/">
          <img
            src="/logo.png"
            alt="FotoMagic Logo"
            className="logo"
          />
        </Link>
        <ul>
          <li>
            <Link to="/">
              <span className="navbar-item">
                <span className="material-icons">home</span>
                Home
              </span>
            </Link>
          </li>

          {user && (
            <li>
              <Link to="/edit">
                <span className="navbar-item">
                  <span className="material-icons">edit</span>
                  Edit
                </span>
              </Link>
            </li>
          )}

          {user && (
            <li>
              <Link to="/images">
                <span className="navbar-item">
                  <span className="material-icons">
                    photo_library
                  </span>
                  Images
                </span>
              </Link>
            </li>
          )}

          <li>
            <Link to="/about">
              <span className="navbar-item">
                <span className="material-icons">info</span>
                About
              </span>
            </Link>
          </li>
        </ul>
      </div>

      <div className="navbar-right">
        {user ? (
          <>
            <span style={{ marginRight: "1rem" }}>
              Hello, {user.username}
            </span>
            <button
              onClick={logoutWrapper}
              className="auth-link"
              style={{
                background: "none",
                border: "none",
                color: "white",
                cursor: "pointer"
              }}>
              Logout
            </button>
            <button
              onClick={handleDeleteAccount}
              className="auth-link"
              style={{
                background: "none",
                border: "none",
                color: "#E41B17",
                cursor: "pointer",
                marginLeft: "1rem"
              }}>
              Delete Account
            </button>
          </>
        ) : (
          <>
            <ul>
              <Link to="/login" className="auth-link">
                <li>
                  <span className="navbar-item">
                    <span className="material-icons">
                      login
                    </span>
                    Login
                  </span>{" "}
                </li>
              </Link>

              <Link to="/signup" className="auth-link">
                <li>
                  <span className="navbar-item">Sign Up</span>
                </li>
              </Link>
            </ul>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
