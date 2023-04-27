import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { getPosts } from '../../store/postsSlice';
import Button from '../../components/Button';

import s from "./FeedPage.module.scss";
import PostPage from '../PostPage';

function FeedPage() {
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);

  const {posts} = useSelector((state) => state.posts)

  // console.log(posts);

  //пагинация
  useEffect(() => {
    dispatch(getPosts({limit: 9, page: page}))
  }, [page]);

  const onPrev = () => {
    if(page === 1) return
    setPage(prev => prev - 1)
  }
  const onNext = () => {
    setPage(prev => prev + 1)
  }

  return (
    <div className={s.feedPage}>      
        <div className={s.pageName}>Recent posts</div>

        <div className={s.addPost}>
          <Button className={s.button}>New post</Button>
        </div>

        <div className={s.middleBlock}>
          {posts.map(post => (
            <Link to={`posts/${post.id}`} element={<PostPage />} className={s.postBlock} key={post.id} >
              
              {/* <div className={s.text}>
                <div>{post.text}</div>
                {post.user && <div>{post.user.login}</div>}
              </div> */}              
              
              {post.image && <img className={s.image} src={post.image} alt="" key={post.image} />}
            </Link>
          ))}
        </div>

        <div className={s.buttons}>
          <Button className={s.button} onClick={onPrev}>Prev</Button>
          <Button className={s.button} onClick={onNext}>Next</Button>
        </div>            
    </div>
  )
}

export default FeedPage