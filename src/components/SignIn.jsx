import { Outlet, Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const SignIn = () => {
  const Navigate = useNavigate();
  const [signInData, setSignInData] = useState({
    email: "",
    password: "",
  });
  const handleSignInData = (e) => {
    const { name, value } = e.target;
    setSignInData({ ...signInData, [name]: value });
    setSignInError("");
  };
  const [signInError, setSignInError] = useState("");

  const handleOnSubmitSignInData = async (e) => {
    e.preventDefault();
    if (!signInData.email || !signInData.password) {
      setSignInError("All fileds are required");
      return;
    }

    if (!signInData.email.includes("@")) {
      setSignInError("valid email required");
      return;
    }
    if (signInData.password.length <= 4) {
      setSignInError("password require greater than 4");
      return;
    }
    // try{
    //   const response= await fetch("http://localhost:3820/signinDetails",{
    //     method:"POST",
    //     headers:{
    //       "content-type":"application/json"
    //     },
    //     body:JSON.stringify(signInData)
    //   })
    //   const data=await response.json()

    //   console.log(data)

    // }catch(e){
    //   console.log(e)

    // }
    try {
      const response = await fetch(
        "https://backend-1-u87e.onrender.com/signinDetails",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(signInData),
        }
      );
      const data = await response.json();

      if (data.token) {
        // Save token to localStorage or cookies
        localStorage.setItem("token", data.token);
        Navigate("/home"); // Navigate to Home page after successful login
      } else {
        setSignInError(data.message);
      }
    } catch (error) {
      console.log(error);
      setSignInError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="sign-in-main-container">
      <form className="sign-in-container" onSubmit={handleOnSubmitSignInData}>
        <div>
          <h1 style={{ color: "balck", fontFamily: "Rockwell" }}>Sign In :)</h1>
        </div>

        <div className="sign-in-deatils-container">
          <label className="sign-in-label-email">Email</label>
          <input
            type="text"
            placeholder="Email..."
            name="email"
            className="sign-in-input"
            onChange={handleSignInData}
          />
        </div>
        <div className="sign-in-deatils-container">
          <label className="sign-in-label-password">Password</label>
          <input
            type="text"
            placeholder="Password..."
            name="password"
            className="sign-in-input"
            onChange={handleSignInData}
          />
        </div>
        {signInError && <p style={{ color: "red" }}>{signInError}</p>}
        <div className="sign-in-button-container">
          <Link to="/signup">
            <button className="sign-in-button">Sign Up</button>
          </Link>
          <button className="sign-in-button" type="submit">
            Sign In
          </button>
        </div>
      </form>
      <Outlet />
    </div>
  );
};
export default SignIn;
