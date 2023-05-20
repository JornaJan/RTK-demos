import React, { useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { 
    selectAllPosts,
    getPostsStatus,
    getPostsError,
    fetchPosts 
} from "./postsSlice"

import PostsExcerpt from "./PostsExcerpt"
import { nanoid } from "@reduxjs/toolkit"


const PostsList = () => {
    const dispatch = useDispatch()
    const posts = useSelector(selectAllPosts)
    const postsStatus = useSelector(getPostsStatus)
    const error = useSelector(getPostsError)

    useEffect(() => {
        if (postsStatus === 'idle') {
            dispatch(fetchPosts())
        }
    }, [postsStatus, dispatch])


    let content
    if (postsStatus === 'loading') {
        content = <p>"Loading..."</p>
    } else if (postsStatus === 'successed') {

        const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))
        console.log(orderedPosts)
        content = orderedPosts.map((post) => <PostsExcerpt key={nanoid()} post={post} />) // 这里的key 使用post.id作为key 会报错 只能先暂时使用自带的 nanoid来使用
    } else if (postsStatus === 'failed') {
        content = <p>{error}</p>
    }

    return (
        <div>
            <h1>PostList Component Demo</h1>
            {content}
        </div>
    )
}

export default PostsList
