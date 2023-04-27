import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

import s from "./Authorization.module.scss";

// import LogoStar from "../../images/logo-star.png";
import Input from "../Input/Input";
import Button from "../Button/Button";
import { authUser, dismissError } from "../../store/userSlice";

// const endpoint = "https://jsonplaceholder.typicode.com";

function Authorization() {
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    const { error, isLoading } = useSelector(state => state.user)

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // const [isFetching, setIsFetching] = useState(false);

    const onEmailChange = (event) => {
        setEmail(event.target.value)
    }

    const onPasswordChange = (event) => {
        setPassword(event.target.value)
    }

    // useEffect(() => {
    //     if(error){
    //         enqueueSnackbar({message: error, variant: "error"});
    //         dispatch(dismissError());
    //     }
    // }, [error]);

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

        dispatch(authUser({login: email, password})).then(() => {
            navigate("/")
            enqueueSnackbar({ message: "Great! You've authorized!", variant: "success"})
        })
    }

    // const onSubmit = async (event) => {
    //     event.preventDefault()
    //     try{
    //         setIsFetching(true)

    //         const response = await fetch(`${endpoint}/users`, {
    //             method: "POST",
    //             body: JSON.stringify({
    //                 email,
    //                 password
    //             }),
    //             headers: {
    //                 "content-Type": "application/json"
    //             },
    //         });

    //         if(!response.ok){
    //             throw new Error("Server error:")
    //         }
            
    //         const data = await response.json()
    //         console.log(data);
    //     } catch (error) {
    //         console.log("error:", error)
    //     } finally {
    //         setIsFetching(false)
    //     }
    // }

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
            </div>

            <Button type="submit" disabled={isLoading}>
                {isLoading ? "Loading" : "Sign In"}
            </Button>
                
            {/* <button
                className={s.submit} 
                type="submit"
                disabled={isFetching}>
                    {isFetching ? "Loading..." : "Sign in"}
            </button> */}
        </form>
    )
}

export default Authorization;