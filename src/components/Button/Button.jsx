import React from 'react';

import s from "./Button.module.scss";

function Button({ 
    className, 
    children, 
    type = "button",
    variant = "default",  //передаем люой другой цвет вместо default
    onClick =() => {},
    ...props
}) {
  return (
    <button 
        className={`${s.btn} ${className} ${s[variant]}`} 
        onClick={onClick}
        type={type}
        {...props}
    >
        {children}
        {/* это название кнопки, текст кнопки, передаем его в Authorization */}
    </button>
  )
}

export default Button;