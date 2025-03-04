import React, { useState } from "react";
import { Container, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { backend_uri } from "../constants";
import './Login.css';

function AuthPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [signin, setSignin] = useState(false);

  const notifyError = (message) => {
    toast.error(message);
  };


  function ToggleSign(event) {
    event.preventDefault();
    setSignin(!signin);
    setFormData({
      username: "",
      email: "",
      password: "",
    });
  }

  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (!formData.username.trim() && signin) {
      notifyError("Username cannot be empty");
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(formData.email)) {
      notifyError("Enter a valid email address");
      return;
    }

    if (formData.password.length < 8) {
      notifyError("Password must be at least 8 characters long");
      return;
    }
    try {
      const response = await axios.post(
        `${backend_uri}/auth/${!signin ? "login" : "signup"
        }`,
        formData,
        { withCredentials: true }
      );
      console.log(response);

      if (response.status === 200) {
        // save token to localstorage
        localStorage.setItem("token", response.data.token);
        console.log("You are going to home page");
        navigate("/home");
      }
    } catch (error) {
      console.error("Authentication error:", error);
      if (
        error.response &&
        error.response.status === 400 &&
        error.response.data.message === "User already exists"
      ) {
        notifyError("User already exists");
      } else {
        notifyError(error.response?.data.message || "An error occurred");
      }
    }
  }

  const handleGoogleLogin = (event) => {
    event.preventDefault();
    window.location.href =
      `${backend_uri}/oauth/google`;
  };

  return (
    <>
      <div className="LoginPage">
        <Container className={`LoginPageContainer ${signin ? "active" : ""}`}>
          <Row>
            <Col xs={12} md={6}>
              <div className="form-container sign-up">
                <SignUpForm
                  formData={formData}
                  handleInputChange={handleInputChange}
                  handleGoogleLogin={handleGoogleLogin}
                  handleSubmit={handleSubmit}
                />
              </div>
              <div className="form-container sign-in">
                <LogInForm
                  formData={formData}
                  handleInputChange={handleInputChange}
                  handleGoogleLogin={handleGoogleLogin}
                  handleSubmit={handleSubmit}
                />
              </div>
            </Col>
            <Col md={6}>
              <TogglerContainer signin={signin} ToggleSign={ToggleSign} />
            </Col>
          </Row>
          <Row>
            <div className="OverlayAnimation">
              {signin ? (
                <div className="togglebtnlogin">
                  <button className="hidden" onClick={ToggleSign}>
                    Sign In
                  </button>
                  <span>Already Have an Account?</span>
                </div>
              ) : (
                <div className="togglebtnlogin">
                  <span>Don't have an account? Create one</span>
                  <button className="hidden" onClick={ToggleSign}>
                    Sign Up
                  </button>
                </div>
              )}
            </div>
          </Row>
        </Container>
      </div>
    </>
  );
}

function TogglerContainer(props) {
  return (
    <>
      <div className="toggle-container">
        <div className="toggle">
          <div className="toggle-panel toggle-left">
            <h1>Welcome to Warranti</h1>
            <p>Already Have an Account?</p>
            <button className="hidden" onClick={props.ToggleSign}>
              Sign In
            </button>
          </div>
          <div className="toggle-panel toggle-right">
            <h1>Welcome to Warranti</h1>
            <p>Don't have an account? Create one</p>
            <button className="hidden" onClick={props.ToggleSign}>
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

function SignUpForm(props) {
  return (
    <>
      <form>
        <h1>Create Account</h1>
        <div className="Googlediv">
          <button className="GoogleBtn" onClick={props.handleGoogleLogin}>
            <FcGoogle className="icon" /> Sign up with Google
          </button>
        </div>
        <span>or use your email for registration</span>
        <input
          type="text"
          name="username"
          value={props.formData.username}
          onChange={props.handleInputChange}
          placeholder="Name"
          required
        />
        <input
          type="email"
          name="email"
          value={props.formData.email}
          onChange={props.handleInputChange}
          placeholder="Email"
          required
        />
        <input
          type="password"
          name="password"
          value={props.formData.password}
          onChange={props.handleInputChange}
          placeholder="Password"
          required
        />
        <button onClick={props.handleSubmit}>Sign Up</button>
      </form>
    </>
  );
}

function LogInForm(props) {
  return (
    <>
      <form>
        <h1>Log in</h1>
        <div>
          <button className="GoogleBtn" onClick={props.handleGoogleLogin}>
            <FcGoogle className="icon" /> Sign in with Google
          </button>
        </div>
        <span>or use your email password</span>
        <input
          type="email"
          name="email"
          value={props.formData.email}
          onChange={props.handleInputChange}
          placeholder="Email"
          required
        />
        <input
          type="password"
          name="password"
          value={props.formData.password}
          onChange={props.handleInputChange}
          placeholder="Password"
          required
        />
        <button onClick={props.handleSubmit}>Login</button>
      </form>
    </>
  );
}

export default AuthPage;