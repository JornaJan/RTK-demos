const { createSlice } = require("@reduxjs/toolkit")

const initialState = [
    {
        id: '1',
        title: 'Learning Redux Toolkit',
        content: "I've heard good thing.",
    },
    {
        id: '2',
        title: 'Sliece...',
        content: "The more I say slice, the more I want pizza.",
    }    
]

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        postAdded: (state, action) => {
            state.push(action.payload)
        }
    }
})

export const { postAdded } = postsSlice.actions

export const selectAllPosts = (state) => state.posts

export const postsReducer = postsSlice.reducer
