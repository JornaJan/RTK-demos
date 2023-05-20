import { useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { postAdded } from './postsSlice'
import { selectAllUsers } from "../users/usersSlice"

const AddPostForm = () => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [usersId, setUsersId] = useState('')

    const users = useSelector(selectAllUsers)

    const onTitleChange = (e) => setTitle(e.target.value)
    const onContentChange = (e) => setContent(e.target.value)
    const onAuthorChange = (e) => setUsersId(e.target.value)


    const dispatch = useDispatch()
    const onSavePostClicked = () => {
        if (title && content) {
            dispatch(
                postAdded(title, content, usersId)
            )

            setTitle('')
            setContent('')
        }
    }

    const canSave  = Boolean(title) && Boolean(content) && Boolean(usersId)

    const usersOptions = users.map((user) => (
        <option key={user.id} value={user.id}>{user.name}</option> 
    ))

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
                <label htmlFor="postAuthor">Author</label>
                <select id="postAuthor" value={usersId} onChange={onAuthorChange}>
                    <option value=""></option>
                    {usersOptions}
                </select>
                <label htmlFor="postContent">Post Content:</label>
                <input 
                    type="text"
                    id="postContent"
                    name="postContent"
                    value={content}
                    onChange={onContentChange}
                />
                <button disabled={!canSave} onClick={onSavePostClicked} type="button">Save Post</button>
            </form>
        </div>
    )
}

export default AddPostForm
