import React, { useState } from 'react'

import s from "./PostCreation.module.scss"
import Button from '../../components/Button'
import Input from '../../components/Input/Input'

function PostCreation() {
    const [image, setImage] = useState("")
    const [title, setTitle] = useState("")
    const [text, setText] = useState("")

    const onImageChange = (event) => {
        setImage(event.target.value)
    }

    const onTitleChange = (event) => {
        setTitle(event.target.value)
    }

    const onTextChange = (event) => {
        setText(event.target.value)
    }

    return (
    <div className={s.postCreation}>      
        <div className={s.pageName}>Post Creation</div>
        <Input 
            className={s.input}
            value={image}
            onChange={onImageChange}
            placeholder="Image URL" 
        />

        <Input 
            className={s.input}
            value={title}
            onChange={onTitleChange}
            placeholder="Post Title" 
        />

        <Input 
            className={s.input}
            value={text}
            onChange={onTextChange}
            placeholder="Post Text" 
        />
        
        <Button className={s.button}>Create</Button>
    </div>
    )
}

export default PostCreation