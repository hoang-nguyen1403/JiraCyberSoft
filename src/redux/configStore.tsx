import { configureStore, PayloadAction } from "@reduxjs/toolkit";
import userReducer from "./reducer/userReducer";

export const store = configureStore({
    reducer: {
        numberReducer: (state, action:PayloadAction<number>)=>{
            return 1;
        }, 
        userReducer: userReducer
    }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
