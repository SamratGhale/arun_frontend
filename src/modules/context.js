import { configureStore } from "@reduxjs/toolkit";
import userReducer from './users/context'

export default configureStore({
    reducer: {
        user: userReducer,
    },
})