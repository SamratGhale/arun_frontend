import { createSlice } from "@reduxjs/toolkit"
import * as Service from './services'

export const usersSlice = createSlice({
    name: 'users',
    initialState: {
        user_info: {
            username:'',
            email: '',
            phone: ''
        },
        list: [],
        refresh: false,
    },
    reducers: {
        getAllUsers: (state, data) => {
            state.list = data.payload;
        },
        login: (state, data) => {
            state.user_info = data.payload;
        }
    }
})

export const loginAsync = (data) => async (dispatch) => {
    try {
        const res = await Service.login(data);
        console.log(res);
        dispatch(login(res.data.user))
        return res;
    }
    catch (err) {
        throw err;
    }
}

export const getALlusersAsync = () => async (dispatch) => {
    try {
        const res = await Service.getAllUsers();
        console.log(res);
        dispatch(getAllUsers(res.data))
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

export const updateUserAsync = (id, data) => async (dispatch) => {
    try {
        const res = await Service.updateUser(id, data);
        dispatch(refreshUserAsync());
        return res;
    }
    catch (err) {
        console.log(err)
        throw err;
    }
}

export const refreshUserAsync = () => async (dispatch) => {
    try {
        const res = await Service.refreshInfo();
        dispatch(login(res.data))
        return res;
    }
    catch (err) {
        throw err;
    }
}

export const changeProfileAsync= (data) => async (dispatch) => {
    try {
        const res = await Service.changeProfilePic(data);
        return res;
    }
    catch (err) { throw err;
    }
}

export const archiveUserAsync= (id) => async (dispatch) => {
    try {
        const res = await Service.archiveUser(id);
        dispatch(getALlusersAsync());
        return res;
    }
    catch (err) { throw err;
    }
}

export const registerUserAsync= (id) => async (dispatch) => {
    try {
        const res = await Service.registerUser(id);
        dispatch(getALlusersAsync());
        return res;
    }
    catch (err) { throw err;
    }
}

export const { login, getAllUsers } = usersSlice.actions;
export default usersSlice.reducer;

