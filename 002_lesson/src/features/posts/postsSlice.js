import  { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit'
import { sub } from 'date-fns'
import axios from 'axios'

const initialState = {
    posts: [],
    status: 'idle', // 'idle' | 'loading' | 'successed' | 'failed'
    error: null
}

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts'


export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async () => {
    try {
        const response = await axios.get(POSTS_URL)
        return [...response.data]
    } catch(err) {
        return err.message
    }
  }
)

export const addNewPost = createAsyncThunk('posts/addNewPost', async (initialPost) => {
    try {
        console.log(initialPost)
        const response = await axios.post(POSTS_URL, initialPost)
        return [...response.data]
    } catch(err) {
        return err.message
    }
})

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        postAdded: {
            reducer: (state, action) => {
                state.push(action.payload)
            },
            prepare: (title, content, userId) => {
                return {
                    payload: {
                        id: nanoid(),
                        title,
                        content,
                        date: new Date().toISOString(),
                        userId,
                        reactions: {
                            thumbsUp: 0,
                            wow: 0,
                            heart: 0,
                            rocket: 0,
                            coffee: 0
                        }
                    }
                }
            }
        },
        reactionAdded: (state, action) => {
            const { postId, reaction } = action.payload
            const existingPost = state.find(post => post.id === postId)
            if (existingPost) {
                existingPost.reactions[reaction]++
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPosts.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.status = 'successed'
                
                let min = 1
                const loadedPosts = action.payload.map((post) => {
                    post.date = sub(new Date(), { minutes: min++ }).toISOString()
                    post.reactions = {
                        thumbsUp: 0,
                        hooray: 0,
                        heart: 0,
                        rocket: 0, 
                        eyes: 0
                    }
                    return post
                })
                state.posts = state.posts.concat(loadedPosts)
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(addNewPost.fulfilled, (state, action) => {
                console.log(action.meta.arg)
                action.meta.arg.userId = Number(action.meta.arg.userId)
                action.meta.arg.date = new Date().toISOString()
                action.meta.arg.reactions = {
                        thumbsUp: 0,
                        hooray: 0,
                        heart: 0,
                        rocket: 0, 
                        eyes: 0
                }
                state.posts.push(action.meta.arg)
            })

    }
})

export const { postAdded, reactionAdded } = postsSlice.actions

export const selectAllPosts = (state) => state.posts.posts
export const getPostsStatus = (state) => state.posts.status
export const getPostsError = (state) => state.posts.error

export const postsReducer = postsSlice.reducer
