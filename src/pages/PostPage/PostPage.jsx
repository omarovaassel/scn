import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Button from '../../components/Button';

import s from "./PostPage.module.scss";

const endpoint = process.env.REACT_APP_ENDPOINT || "";

function PostPage() {
  const [post, setPost] = useState({});
  const { postId } = useParams();
  //достаем айди поста
  console.log(postId);

  useEffect(() => {
    const getData = async () => {
        const response = await fetch(`${endpoint}/posts/${postId}`);
        const data = await response.json();
        setPost(data);
        console.log(data);
    }
    getData()
  }, [])


  return (
    <div className={s.onePost}>
      <div className={s.middleBlock}>
          <div>
              <div className={s.postBlock}>
                  {post?.image && <img className={s.image} src={post.image} alt="" />}
                  {post?.text && <div src={post.text} className={s.text}>{post.text}</div>}
              </div> 

              {post?.postId && <div className={s.userName}>{post.postId}</div>}
          </div>
      </div>

      <div className={s.buttons}>
        <Button className={s.button}>Delete</Button>
        <Button className={s.button}>Edit</Button>
      </div>            
    </div>
  )
}

export default PostPage