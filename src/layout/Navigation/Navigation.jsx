import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import s from "./Navigation.module.scss"

import { logOut } from "../../store/userSlice"

function Navigation() {
    const { user } = useSelector( state => state.user)

    const dispatch = useDispatch()

    const onLogOut = () => {
        dispatch(logOut())
    }

    return (
        <div className={s.navigation}>
            <div className={s.userName}>{user.login}</div>
            <img className={s.userAvatar} src={user.avatar} alt="" />
            <button className={s.button} onClick={onLogOut}>LogOut</button>
        </div>
    );
}

export default Navigation