import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useStore } from '../hooks/useStore';
import { backendApi } from '../utils/constants';
import "./LoginPage.css"; 

const LoginPage = () => {
  const setAuthData = useStore((state) => state.setAuthData);
  const handleGoogleAccountLogin = async (credentialResponse) => {
    console.log(credentialResponse);
    const { data } = await axios.post(
      `${backendApi}admin/login`,
      {
        // pass the token as part of the req body
        token: credentialResponse.credential,
      }
    );
    localStorage.setItem('AuthData', JSON.stringify(data));
    setAuthData(data);
  }
  return (
    <div className="container">
      <div className="row">
        <div className="col-6">
          <img
            src="https://cdn.dribbble.com/users/2921530/screenshots/15251901/media/4b19f7b45533ad7c4ea5cbe9f55257ca.jpg"
            alt="Login"
            className="img-fluid image"
          />
        </div>
        <div className="col-md-6 d-flex align-items-center justify-content-center google-login">
          <div>
            <div><h4>Welcome 👋</h4>Telegram Weather Bot</div>
            <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
              <GoogleLogin
              shape={"pill"}
              theme={"filled_blue"}
                useOneTap={true}
                onSuccess={handleGoogleAccountLogin}
                onError={() => {
                  alert('Login Failed');
                }}
              />
            </GoogleOAuthProvider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

