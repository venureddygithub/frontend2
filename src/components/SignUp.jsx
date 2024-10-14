import { Outlet, Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const SignUp = () => {
  const Navigate = useNavigate();
  const [signUpData, setSignUpData] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleClick = (e) => {
    const { name, value } = e.target;
    setSignUpData({ ...signUpData, [name]: value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !signUpData.name ||
      !signUpData.phoneNumber ||
      !signUpData.email ||
      !signUpData.password
    ) {
      setError("All fileds are required");
      return;
    }
    if (!signUpData.email.includes("@")) {
      setError("Valid email required");
      return;
    }
    if (signUpData.password.length <= 4) {
      setError("Password should greater than 4");
      return;
    }
    //
    try {
      const response = await fetch(
        "https://backend-1-u87e.onrender.com/signupDetails",
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(signUpData),
        }
      );
      const data = await response.json();

      if (data.message === "User successfully inserted into the DB") {
        Navigate("/signin"); // Navigate to sign-in page after success
      } else {
        setError(data.message);
      }
    } catch (e) {
      console.log(e);
      setError("An error occurred during sign-up");
    }
  };
  return (
    <div className="sign-up-main-container">
      <form className="sign-up-container" onSubmit={handleSubmit}>
        <div>
          <h1 style={{ color: "balck", fontFamily: "Rockwell" }}>Sign Up :)</h1>
        </div>
        <div className="sign-up-deatils-container">
          <label className="sign-up-label-name">Name</label>
          <input
            type="text"
            placeholder="Name..."
            name="name"
            className="sign-up-input"
            onChange={handleClick}
          />
        </div>
        <div className="sign-up-deatils-container">
          <label className="sign-up-label-phone">Phone Number</label>
          <input
            type="text"
            placeholder="Phone number..."
            name="phoneNumber"
            className="sign-up-input"
            onChange={handleClick}
          />
        </div>
        <div className="sign-up-deatils-container">
          <label className="sign-up-label-email">Email</label>
          <input
            type="text"
            placeholder="Email..."
            name="email"
            className="sign-up-input"
            onChange={handleClick}
          />
        </div>
        <div className="sign-up-deatils-container">
          <label className="sign-up-label-password">Password</label>
          <input
            type="text"
            placeholder="Password..."
            name="password"
            className="sign-up-input"
            onChange={handleClick}
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <div className="sign-up-button-container">
          <Link to="/signin">
            <button className="sign-up-button">Sign In</button>
          </Link>
          <button className="sign-up-button" type="submit">
            Sign Up
          </button>
        </div>
      </form>
      <Outlet />
    </div>
  );
};
export default SignUp;
