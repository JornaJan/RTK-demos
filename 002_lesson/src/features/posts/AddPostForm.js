import { useState } from "react"
import { useDispatch } from 'react-redux'
import { nanoid } from '@reduxjs/toolkit'
import { postAdded } from './postsSlice'

const AddPostForm = () => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')

    const onTitleChange = (e) => setTitle(e.target.value)
    const onContentChange = (e) => setContent(e.target.value)


    const dispatch = useDispatch()
    const onSavePostClicked = () => {
        if (title && content) {
            dispatch(
                postAdded({
                    id: nanoid(),
                    title,
                    content
                })
            )

            setTitle('')
            setContent('')
        }
    }

    return (
        <div>
            <h1>Add Post Form</h1>
            <form>
                <label htmlFor="postTitle">Post Title:</label>
                <input 
                    type="text"
                    id="postTitle"
                    name="postTitle"
                    value={title}
                    onChange={onTitleChange}
                />
                <label htmlFor="postContent">Post Content:</label>
                <input 
                    type="text"
                    id="postContent"
                    name="postContent"
                    value={content}
                    onChange={onContentChange}
                />
                <button onClick={onSavePostClicked} type="button">Save Post</button>
            </form>
        </div>
    )
}

export default AddPostForm
