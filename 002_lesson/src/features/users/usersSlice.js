import { createSlice, createAsyncThunk }from '@reduxjs/toolkit'
import axios from 'axios'

const USERS_URL = 'https://jsonplaceholder.typicode.com/users'

const initialState = []


export const fetchUsers = createAsyncThunk('users/fetchUser', async () => {
    try {
        const response = await axios.get(USERS_URL)
        return [...response.data]
    } catch(err) {
        return err.message
    }
})


const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.fulfilled, (state, action) => {
                return action.payload
            })
    }
})


const selectAllUsers = (state) => state.users

const usersReducer  = usersSlice.reducer

export {
    selectAllUsers,
    usersReducer
}
