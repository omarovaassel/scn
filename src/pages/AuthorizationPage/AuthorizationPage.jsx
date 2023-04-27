import React from 'react'

import s from "./AuthorizationPage.module.scss";

import LogoStar from "../../images/logo-star.png";
import Authorization from '../../components/Authorization';
import Registration from '../../components/Registration';
import { Link } from 'react-router-dom';

function AuthorizationPage( {variant = "authorization"} ) {
  return (    
    <div className={s.wrapper}>
      <div className={s.container}>
        <img src={LogoStar} alt="logo" style={{width: "100px"}} />

        <div className={s.switch}>
            <Link to="/" className={`${s.switcher} ${variant === "authorization" ? s.active : ""}`}>
              Sign up
            </Link>

            <Link to="/registration" className={`${s.switcher} ${variant === "registration" ? s.active : ""}`}>
              Register
            </Link>              
        </div>

        {(variant === "authorization") ? <Authorization /> : <Registration />}
      </div>
    </div>
  )
}

export default AuthorizationPage