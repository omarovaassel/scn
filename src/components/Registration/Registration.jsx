import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";

import s from "./Registration.module.scss";

// import LogoStar from "../../images/logo-star.png";
import Input from "../Input/Input";
import Button from "../Button/Button";
import { regUser, dismissError } from "../../store/userSlice";

function Registration() {
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    const { error } = useSelector(state => state.user)

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [avatar, setAvatar] = useState("");

    const onEmailChange = (event) => {
        setEmail(event.target.value)
    }
    const onPasswordChange = (event) => {
        setPassword(event.target.value)
    }
    const onAvatarChange = (event) => {
        setAvatar(event.target.value)
    }

    useEffect(() => {
        if(error){
            enqueueSnackbar({message: error, variant: "error"})
            dispatch(dismissError())
        }
    }, [])

    const onSubmit = async (event) => {
        event.preventDefault()

        if(!email){
            enqueueSnackbar({message: "There's no E-mail", variant: "error"})
            return
        }
        if(!password){
            enqueueSnackbar({message: "There's no Password", variant: "error"})
            return
        }
        if(!avatar){
            enqueueSnackbar({message: "There's no Avatar image URL", variant: "error"})
            return
        }
        // if(password != confirm){
        //     enqueueSnackbar({message: "Confirm password is not correct", variant: "error"})
        //     return
        // }

        dispatch(regUser({login: email, password, avatar}))
    }

    return (
        <form onSubmit={onSubmit} className={s.form}>
            <div className={s.inputs}>
                <Input value={email} 
                    onChange={onEmailChange} 
                    placeholder="Your E-mail" 
                    label="Email Address"
                />

                <Input value={password} 
                    onChange={onPasswordChange} 
                    placeholder="Your Password" 
                    label="Password"
                />

                <Input value={avatar} 
                    onChange={onAvatarChange} 
                    placeholder="Avatar image URL" 
                    label="Avatar image URL"
                /> 
            </div>

            <Button type="submit">Sign In</Button>
        </form>
    )
}

export default Registration;