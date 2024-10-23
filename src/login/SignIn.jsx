import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'; // Import Axios



const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();



  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error state
    setLoading(true); // Start loading state
  
    // Regex to validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    // Check if the entered email is valid
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      setLoading(false); // Stop loading state
      return; // Exit function early
    }
  
    // Log the credentials for debugging
    console.log("Email:", email);
    console.log("Password:", password);
  
    try {
      // Using Axios to make a POST request with the user object
      const response = await axios.post("/login/users/sign_in", {
        user: {
          email,
          password,
        },
      }, {
        headers: {
          'Content-Type': 'application/json', // Set the content type
        },
      });
  
      // Check for the response status first
      if (response.data.code === 401) {
        // Handle 401 error specifically
        setError("Email / Mobile or Password not valid");
        return; // Exit the function early
      }
  
      // Log the entire response for debugging
      console.log("API Response:", response.data);
  
      // Destructure the response data
      const { spree_api_key, mobile, email: responseEmail, firstname } = response.data;
  
      // Store all relevant data in session storage
      sessionStorage.setItem("spree_api_key", spree_api_key);
      sessionStorage.setItem("mobile", mobile);
      sessionStorage.setItem("email", responseEmail);
      sessionStorage.setItem("firstname", firstname);
  
      // Navigate to the home page after successful login
      navigate("/"); 
    } catch (err) {
      // Log error for debugging
      console.error("Error occurred:", err);
  
      // Handle errors outside of the response
      if (err.response) {
        // Handle 401 error specifically
        if (err.response.status === 401) {
          setError("Email / Mobile or Password not valid");
        } else {
          const errorMessage = err.response.data?.error || err.message || "An unexpected error occurred. Please try again later.";
          setError(errorMessage);
        }
      } else {
        // Fallback for network errors or other issues
        setError("An unexpected error occurred. Please try again later.");
      }
    } finally {
      // Always stop loading state
      setLoading(false);
    }
  };
  

  
  
  
  
  
<style></style>
  return (
    <>
      <style>
        {`

   .logo {
    margin-bottom: 20px;
} .logo img {
    width: 100px;
    height: auto;
}
        .login-container {

          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background-image: url('https://snagging.lockated.com/assets/real-estate-bg.jpg'); /* Replace with your image URL */
          background-size: cover;
          background-position: center;
              z-index: 1;
                  position: relative;


          
        }
.login-container::before {
    content: "";
    display: block;
    position: absolute;
    z-index: -1;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: rgba(255, 255, 255, 0.6);
}
      


 .login-box:before {
    content: "";
    display: block;
    position: absolute;
    z-index: -1;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: rgba(54, 84, 99, .7);
}
        .login-box {

        width: 100%;
    margin: 0px auto;
    max-width: 470px;
    min-height: 470px;
    position: relative;
    color: #fff;
        
        }
    .login-box form{
    background: rgba(40, 57, 101, .7);
    width: 100%;
    height: 100%;
    position: absolute;
    padding: 40px 80px 50px 80px;
    border-radius: 10px !important;
   
    }
        .login-box h2 {
          text-align: center;
          margin-bottom: 20px;
        }

        .login-box label {
          display: block;
          margin-bottom: 5px;
        }

        .login-box input {
          width: 100%;
          padding: 10px;
          border-radius: 4px;
          border: 1px solid #ccc;
          margin-bottom: 15px;
        }

        .form-control {
    display: block;
    width: 100%;
    height: 34px;
    padding: 4px 0px 4px 7px;
    font-size: 13px;
    line-height: 1.42857143;
    color: #555;
    background-color: #fff;
    background-image: none;
    border: 1px solid #ccc;
    border-radius: 4px;
    -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
    -webkit-transition: border-color ease-in-out .15s, -webkit-box-shadow ease-in-out .15s;
    -o-transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
    transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
}
input {
    border-radius: 30px!important;
    padding: 20px 25px!important;
}
        .login-box button:disabled {
          background-color: #6c757d;
        }

        .error-text {
          color: red;
          text-align: center;
          margin-top: 10px;
        }
          h5 {
    font-size: 13px;
    font-weight: 500;
    margin-bottom: 10px;
    color: #fff;
    line-height: 18px;
}a {
    color: #fff;
    font-size: 13px;
    text-align: center;
    font-weight: 600;
    margin-top: 10px;
    display: inline-block;
}
    
.btn-success {
    background: #f1b80e;
    border: none;
    border-radius: 30px;
    padding: 10px 0px !important;
    margin-top: 20px;
    text-transform: uppercase;
    width: 65%;
} strong {
    font-weight: 600;
    color: #b5c8f1;
}input {
    border-radius: 30px;
    padding: 20px 25px;
}
        `}
      </style>
   <div className="login-container">
    
      <div className="login-box text-center">
        <form onSubmit={handleSubmit}>
        <div className="logo">
  <img src="https://snagging.lockated.com/assets/logo-87235e425cea36e6c4c9386959ec756051a0331c3a77aa6826425c1d9fabf82e.png" />
</div>

          <div className="form-group">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required className="form-control"
              placeholder="Email "
            />
          </div>
          <div  className="form-group">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required className="form-control"placeholder="Password"
            />
          </div>
          <h5>
  By clicking Log in you are accepting our{" "}
  <a href="https://www.lockated.com/cms/privacy_policy.html">
    <strong>Privacy Policy</strong>
  </a>{" "}
  &amp; agree to the{" "}
  <a href="https://www.lockated.com/cms/terms.html">
    <strong>Terms &amp; Conditions.</strong>
  </a>
</h5>

          <button type="submit" className="btn-success" disabled={loading}>
            {loading ? "Signing In..." : "Sign In"}
          </button>
          {error && <p className="error-text">{error}</p>}
        </form>
      </div>
    </div>
    </>
  
  );
};

export default SignIn;
