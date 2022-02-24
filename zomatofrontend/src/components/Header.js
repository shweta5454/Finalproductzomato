import React, { useState } from "react";
import "../styles/Header.css";
import Modal from "react-modal/lib/components/Modal";
import FacebookLogin from "react-facebook-login";
import GoogleLogin from "react-google-login";
const modalStyle = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    width: "600px",
    // marginRight: "-50%",
    transform: "translate(-50%,-50%)",
  },
};

Modal.setAppElement("#root");
export default function Header() {
  const [IsLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [IsAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const facebookLogin = (response) => {
    console.log(response);
  };
  const googleLogin = (response) => {
    console.log(response);
  };
   

  //usestate for signup
  const [userRegisteration, setUserRegistration] = useState({
    email: "",
    password: "",
    FirstName: "",
    LastName: "",
  });

  //handling Signup input
  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    console.log(name, value);
    setUserRegistration({ ...userRegisteration, [name]: value });
  };

  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userRegisteration),
  };


  //calling signup API
  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await fetch(
      "http://localhost:8080/edumato/userSignUp",
      requestOptions
    );

    const data = await result.json();

    console.log(data);
    if(data.status==400||!data){
      window.alert(data.message);
      console.log("invalid registration")
    }else{
      window.alert(data.message);
      console.log(" Successfull Registration");
    }
  };

  //usestate for userlogin 
  const [userLogin, setUserLogin] = useState({
    email: "",
    password: "",
  });

    //handling Login input
    const handleLoginInput = (e) => {
      const name = e.target.name;
      const value = e.target.value;
      console.log(name, value);
      setUserLogin({ ...userLogin, [name]: value });
    };

    const request= {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userLogin),
    };
    
    //calling Login API
    const handleLogin = async (e) => {
      e.preventDefault();
  
      const result = await fetch(
        "http://localhost:8080/edumato/userlogin",
        request
      );
  
      const data = await result.json();
  
      console.log(data);
      if(data.status==400||!data){
        window.alert(data.message);
        console.log("Invalid User ,Please Sign Up for Login")
      }else{
        window.alert(data.message);
        console.log("User Login Successfull");
      }
    };
    

    return (
    <div>
      <header className="header">
        <span className="span">e!</span>
        <div className="headbtn">
          <button className="lbtn" onClick={() => setIsLoginModalOpen(true)}>
            Login
          </button>
          <button className="cbtn" onClick={() => setIsAccountModalOpen(true)}>
            Create an account
          </button>
        </div>
        <Modal isOpen={IsLoginModalOpen} style={modalStyle} >
          <h2 className="text-center">
            {" "}
            Login
            <button
              onClick={() => setIsLoginModalOpen(false)}
              className="BTN btn-outline-danger float-right"
            >
              {" "}
              X
            </button>
          </h2>
          <form method="POST" onSubmit={handleLogin} className="text-center">
            <div>
              <input
                type="email"
                name="email"
                value={userLogin.email}
                onChange={handleLoginInput}
                placeholder="Email"
                className="form-control mt-3"
              />
              <input
                type="password"
                name="password"
                value={userLogin.password}
                onChange={handleLoginInput}
                placeholder="Password"
                className="form-control mt-3"
              />
            </div>
              <button type="submit" className="btn-danger mt-2 px-3 py-2">Login</button>

            <div className="mt-4 text-center">
              <FacebookLogin
                appId="1797176330471294"
                autoLoad={false}
                textButton="Continue with Facebook"
                fields="name,email,picture"
                callback={facebookLogin()}
                className=""
                icon="fa-facebook"
              />
            </div>
            <div className="mt-4 text-center">
              <GoogleLogin
                clientId="899176143197-30k4f0jmmfvpsnbsfulino49b5stit85.apps.googleusercontent.com"
                buttonText="Continue with Google"
                onSuccess={googleLogin()}
                onFailure={googleLogin()}
                cookiePolicy={"single_host_origin"}
                className=" "
              /></div>
            
          
          </form>
          
        </Modal>

        {/* Create Account Modal */}
        <Modal isOpen={IsAccountModalOpen} style={modalStyle}>
          <h2 className="text-center text-danger">
            {" "}
            Sign-Up
            <button
              onClick={() => setIsAccountModalOpen(false)}
              className="btn-danger float-right"
            >
              {" "}
              X
            </button>
          </h2>
          <form method="POST" className="text-center ">
            <div>
              <input
                type="text"
                name="FirstName"
                value={userRegisteration.FirstName}
                onChange={handleInput}
                placeholder="First Name"
                className="form-control"
              />
            </div>

            <div className="mt-3">
              <input
                type="text"
                name="LastName"
                value={userRegisteration.LastName}
                onChange={handleInput}
                placeholder="Last Name"
                className="form-control"
              />
            </div>

            <div className="mt-3">
              <input
                type="email"
                name="email"
                value={userRegisteration.email}
                onChange={handleInput}
                placeholder="Email"
                className="form-control"
              />
            </div>

            <div className="mt-3">
              <input
                type="password"
                name="password"
                value={userRegisteration.password}
                onChange={handleInput}
                placeholder="Password"
                className="form-control"
              />
            </div>

            <button
              type="submit"
              className="mt-4 px-5 btn-danger"
              onClick={handleSubmit}
            >
              Register
            </button>
          </form>
        </Modal>
      </header>
    </div>
  );
}
