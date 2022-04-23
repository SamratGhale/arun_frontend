import { configureStore } from "@reduxjs/toolkit";
import userReducer from './users/context'
import roomReducer from './rooms/context'

export default configureStore({
    reducer: {
        user: userReducer,
        room: roomReducer
    },
})