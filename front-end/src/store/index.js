import { configureStore } from "@reduxjs/toolkit"

const initialState = {
    token: null,
    userInfo: null,
    error: null
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_TOKEN":
            return { ...state, token: action.payload };
        case "SET_USER_INFO":
            return { ...state, userInfo: action.payload };
        case "SET_ERROR":
            return { ...state, error: action.payload };
        default:
            return state;
    }
}

const store = configureStore({
    reducer: {
        auth: authReducer
    }
})

export default store;