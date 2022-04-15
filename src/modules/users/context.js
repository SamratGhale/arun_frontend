import { createSlice } from "@reduxjs/toolkit"
import * as Service from './services'

export const usersSlice = createSlice({
    name: 'users',
    initialState: {
        user_info: {},
        list: [],
        refresh: false,
    },
    reducers: {
        getAllUsers: (state) => {
        },
        login: (state, data) => {
            state.user_info = data;
        }
    }
})

export const loginAsync = (data) => async (dispatch) => {
    try {
        const res = await Service.login(data);
        dispatch(login(res.data.user))
        return res;
    }
    catch (err) {
        throw err;
    }
}
export const signupAsync = (data) => async (dispatch) => {
    try {
        const res = await Service.signup(data);
        return res;
    }
    catch (err) {
        throw err;
    }
}

export const { login, getAllUsers } = usersSlice.actions;
export default usersSlice.reducer;

