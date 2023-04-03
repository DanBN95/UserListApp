import { createSlice, PayloadAction, createAsyncThunk  } from "@reduxjs/toolkit";
import usersApi from "../app/usersApi";
import { usersSliceType } from "../types";
import { UserCardType } from "../types";



const initialState: usersSliceType = {
    users: [],
    status: 'idle',
    error: null,
}

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    const response = await usersApi.get('/', {
        params: {
            results: 10,
        }
    });
    return response?.data?.results;
    
})

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        addUser: (state, action: PayloadAction<UserCardType>) => {
            state.users.push(action.payload);
        },
        deleteUserByIndex: (state, action: PayloadAction<number>) => {
            state.users.splice(action.payload, 1);
        },
        editUserAtIndex: (state, action: PayloadAction) => {
            const { userIndex, user } = action.payload;
            state.users[userIndex] = user;
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const allUsers = action.payload.map((user: any): UserCardType => ({
                    id: user.login.uuid,
                    name: user.name,
                    location: user.location,
                    picture: user.picture,
                    email: user.email
                }))
                state.users = allUsers;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    },
})

export const selectAllUsers = (state) => state.users.users;
export const getUsersStatus = (state) => state.users.status;
export const getUsersError = (state) => state.users.error;

export const { addUser, deleteUserByIndex, editUserAtIndex } = userSlice.actions;

export default userSlice.reducer;