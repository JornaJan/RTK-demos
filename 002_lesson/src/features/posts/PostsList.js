import React from "react"
import { useSelector, useDispatch } from 'react-redux'
import { selectAllPosts } from "./postsSlice"

const PostsList = () => {
    const posts = useSelector(selectAllPosts)

    const renderedPosts = posts.map((post) => (
        <article>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
        </article>
    ))
    return (
        <div>
            <h1>PostList Component</h1>
            {renderedPosts}
        </div>
    )
}

export default PostsList
