import React from "react";

import s from "./Input.module.scss";

// в пропсе могут быть еще какие то свойства, которые мы можем также передать в компоненту инпут

function Input({value, onChange, label = "", placeholder = "", ...props}) {
    return (
        <label className={s.label}>
            {label}
            <input 
                type="text" 
                placeholder={placeholder}
                className={s.input}
                value={value}
                onChange={onChange}
                {...props}
            />
        </label>
    )
}

export default Input;