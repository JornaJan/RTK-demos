import { createSlice }from '@reduxjs/toolkit'

const initialState = [
    { id: '0', name: 'Due Laeb' },
    { id: '1', name: 'Meil Young' },
    { id: '2', name: 'Dave Gray Ben' },
]

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
    }
})


const selectAllUsers = (state) => state.users

const usersReducer  = usersSlice.reducer

export {
    selectAllUsers,
    usersReducer
}
