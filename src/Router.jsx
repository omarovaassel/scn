import React from 'react'
import { useSelector } from "react-redux"
import { BrowserRouter, Routes, Route } from "react-router-dom"

import AuthorizationPage from './pages/AuthorizationPage'
import FeedPage from "./pages/FeedPage"
import MainLayout from './layout'
import PostPage from './pages/PostPage'
import PostCreation from './pages/PostCreation/PostCreation'

function Router() {  
    const { user } = useSelector(state => state.user)

    const { posts } = useSelector(state => state.posts)

    return(
        <BrowserRouter>
            <Routes>
                {!user && (
                    <>
                        <Route path="/*" element={<AuthorizationPage />} />
                        <Route
                            path="/registration" 
                            element={<AuthorizationPage variant="registration" />} 
                        />
                    </>
                )}
                {user && (
                    <Route path="/*" element={<MainLayout />}>
                        <Route index element={<FeedPage />} />
                    </Route>                    
                )}


                <Route path="/posts" element={<MainLayout />}>
                    <Route path="/posts/:postId" element={<PostPage />} />
                </Route>

                <Route path="/posts" element={<MainLayout />}>
                    <Route path="/posts/create" element={<PostCreation />} />
                </Route>

            </Routes>
        </BrowserRouter>
    )  
}


export default Router
